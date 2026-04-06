//hf
import axios from "axios";

const categoryMap = {
  business: "Business",
  recruit: "Recruitment",
  spam: "Spam",
  personal: "Personal",
};

function normalizeCategory(label) {
  if (!label) return "Other";  

  const l = label.toLowerCase();

  for (const key in categoryMap) {
    if (l.includes(key)) return categoryMap[key];
  }

  return "Other";
}

//LLM extraction using HuggingFace
const extractWithLLM = async (text, category) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        inputs: `Convert this email into structured JSON.

Category: ${category}

Output format:
{
  "category": "",
  "summary": "",
  "entities": []
}

Email:
${text}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let output = response.data;

    //Handle HF response formats
    if (Array.isArray(output)) {
      output = output[0]?.generated_text || "";
    } else if (output.generated_text) {
      output = output.generated_text;
    }

    //Clean formatting
    if (typeof output === "string") {
      output = output.replace(/```json|```/g, "").trim();
    }

    try {
  const parsed = JSON.parse(output);

  //FIX: if entities empty → fill them
  if (!parsed.entities || parsed.entities.length === 0) {
    parsed.entities = parsed.entities || [];
  }

  return parsed;

} catch {
  return {
    category,
    summary: text.slice(0, 100),
    entities: text
      .split(" ")
      .filter(word => word[0] === word[0]?.toUpperCase() && word.length > 3)
      .slice(0, 3)
    };
}

  } catch (err) {
    console.error("Extraction Error:", err.message);

    //fallback if API fails
    return {
      category,
      summary: text.slice(0, 100),
      entities: text
        .split(" ")
        .filter(word => word[0] === word[0]?.toUpperCase() && word.length > 3)
        .slice(0, 3)
    };
  }
};


//Main classification function
export const classifyWithLLM = async (text) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
      {
        inputs: text,
        parameters: {
          candidate_labels: [
            "Business",
            "Recruitment",
            "Spam",
            "Personal",
            "Other",
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("HF RAW:", response.data);

    let result = response.data;

    let category, confidence;

    //NEW FORMAT
    if (Array.isArray(result) && result[0].label) {
      category = normalizeCategory(result[0].label);
      confidence = result[0].score;
    }

    //OLD FORMAT
    else if (result.labels && result.scores) {
      category = normalizeCategory(result.labels[0]);
      confidence = result.scores[0];
    }

    else {
      category = "Other";
      confidence = 0.3;
    }


      const data = {
        category,
        summary: text.slice(0, 100),
        entities: text
          .split(" ")
          .filter(word => word[0] === word[0]?.toUpperCase())
          .slice(0, 3)
      };

    return {
      category,
      confidence,
      data,
    };

  } catch (error) {
    console.error("HF Error:", error.message);

    return {
      category: "Human Review Required",
      confidence: 0.5,
      data: {},
    };
  }
};