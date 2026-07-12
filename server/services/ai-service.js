const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeResume(resumeText) {
const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer.

Analyze the following resume like a real ATS used by top companies.

Instructions:
1. Give an ATS score as an INTEGER between 0 and 100.
2. Base the ATS score on:
   - Skills (30%)
   - Projects (20%)
   - Experience (20%)
   - Education (10%)
   - Resume Formatting & Readability (10%)
   - Grammar & Writing Quality (10%)
3. Never return a score less than 40 unless the resume is extremely poor.
4. Return ONLY valid JSON.
5. Do not include markdown or code blocks.

Return JSON in this format:

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
    const result = JSON.parse(cleanedResponse);

    // Ensure ATS score is a number between 0 and 100
    result.atsScore = Math.max(
      0,
      Math.min(100, Number(result.atsScore) || 0)
    );

return result;
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