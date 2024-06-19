const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai"); // Import necessary classes
// const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCDb2rdAf_CSha2-eACf4P-sQqSDbspwPU");

const funcall = async (base64_String) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
       
      });

const prompt = "What numbers and alphabet do you see? Merge them in a string.Output the merged string only.";
const image = {
  inlineData: {
    data: base64_String,
    mimeType: "image/png",
  },
};

const result = await model.generateContent([prompt, image]);
console.log(result.response.text());
}

console.log(base64_String)

// funcall(base64_String);

