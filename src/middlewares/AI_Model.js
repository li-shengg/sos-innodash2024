const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai"); 

module.exports.funcall = async (req, res, next) => {
    const base64_String = req.body.base64_String

    if (!base64_String) {
        return res.status(400).json({ error: "Base64 String not found in request body" });
    }

    const genAI = new GoogleGenerativeAI("AIzaSyCDb2rdAf_CSha2-eACf4P-sQqSDbspwPU");

    
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

try{
    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());
    res.status(200).json(result.response.text())
}catch(error){
    console.error("Error during prediction:", error);
    return res.status(500).json({ error: "Error during prediction" });

}

   


};
