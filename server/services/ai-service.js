const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeResume(resumeText) {
  const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON in this format:

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "grammarSuggestions": [],
  "recommendedRoles": []
}

Resume:
${resumeText}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  // AI Response
  const rawResponse = response.choices[0].message.content;

  // Remove markdown code blocks if present
  const cleanedResponse = rawResponse
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return {
      atsScore: 0,
      summary: "Unable to analyze resume.",
      strengths: [],
      missingSkills: [],
      grammarSuggestions: [],
      recommendedRoles: [],
      rawResponse: cleanedResponse,
    };
  }
}

module.exports = {
  analyzeResume,
};