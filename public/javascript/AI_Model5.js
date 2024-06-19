export const funcall = async (base64_String) => {
    const apiKey = "AIzaSyCDb2rdAf_CSha2-eACf4P-sQqSDbspwPU";
    const endpoint = "https://generativeai.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey;

    const requestBody = {
        prompt: "What numbers and alphabet do you see? Merge them in a string. Output the merged string only.",
        image: {
            inlineData: {
                data: base64_String,
                mimeType: "image/png",
            },
        },
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.response.text;
    } catch (error) {
        console.error("Error during prediction:", error);
        throw error;
    }
};
