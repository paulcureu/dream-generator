import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dream.balkancode.ro/"],
  })
);
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

app.post("/dream", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (err) {
    console.error("Eroare generare imagine:", err);
    res.status(500).send({ error: "Nu s-a putut genera imaginea." });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server on ${port}`));
