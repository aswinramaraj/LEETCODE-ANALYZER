const express = require('express');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// Sample controller for Analyzer
const AnalyzerController = async (req, res) => {
    // Logic for analyzing data would go here
  const code = req.body.code;
  console.log("Received code for analysis:", code);
    if (!code) {
        return res.status(400).json({ error: 'Code input is required' });
    }

     try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"  });

const prompt = `
You are an expert-level AI code analyzer.

Your task is to analyze the following JavaScript code and return only a **strictly structured JSON object** with the fields defined below. Do not include any explanation or text outside the JSON. No markdown formatting, no code block wrappers — just the raw JSON.

Analyze the code and return the following fields:

1. time_complexity: Overall time complexity in Big O notation (e.g., "O(n)", "O(n log n)", "O(n²)").
2. space_complexity: Overall space complexity in Big O notation (e.g., "O(1)", "O(n)").
3. best_case: Best case time complexity (e.g., "O(n)").
4. worst_case: Worst case time complexity (e.g., "O(n²)").
5. explanation: {
    time: "<Short explanation of how time complexity was determined>",
    space: "<Short explanation of how space complexity was determined>",
    overall: "<Brief summary of how the code works and its performance characteristics>"
}
6. approach: {
    used: {
      name: "<Name of the approach used, e.g., 'Sliding Window', 'Two Pointers'>",
      explanation: "<One or two-line description of how this approach is used in the code>",
      complexity: "<Time complexity of the approach used>"
    },
    suggested: {
      name: "<Name of a more optimal or alternative approach (if applicable)>",
      explanation: "<Brief explanation of why it might be better or when to use it>",
      complexity: "<Time complexity of suggested approach>"
    }
}
7. suggestions: [
    "<Short AI-generated suggestions to improve readability or performance>",
    "<Another suggestion if needed>"
]
8. optimized_code: "<A full JavaScript code string — clean, efficient, and logically equivalent to the original. Must be escaped properly.>"
9. steps: [
    {
      label: "<Step description, e.g., 'Initialize left and right pointers'>",
      nodes: [
        { id: "1", label: "<Label to show in node>", active: true },
        ...
      ],
      links: [
        { source: "1", target: "2", active: true },
        ...
      ]
    },
    ...
  ]

Instructions:
- Output must be a valid JSON object.
- Escape quotes in "optimized_code" and any labels that contain special characters.
- "steps" must represent the logic or iteration flow of the code — each step describes one logical or looped phase.

Analyze this code:
${code}
`;





    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log("Gemini API response:", response);
    res.status(200).json({ analysis: response });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Internal server error while analyzing code" });
  }




}

module.exports = AnalyzerController;