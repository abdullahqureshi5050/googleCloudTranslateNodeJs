// app.js
const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

// Parse incoming JSON data
app.use(express.json());

// POST route to handle translation requests
app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length < 1) {
      throw new Error("Text is required for translation");
    }
    const apiKey = process.env.APIKEY;
    const targetLanguage = "es";
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        q: req.body.text,
        target: targetLanguage,
      }
    );

    const translatedText = response.data.data.translations[0].translatedText;
    res.json({ translatedText });
  } catch (error) {
    console.error("Error translating text:", error.message);
    res.status(500).json({ error: String(error) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
