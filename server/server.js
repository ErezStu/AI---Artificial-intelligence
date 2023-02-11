import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from the server." });
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      //   temperature: 0.7,
      max_tokens: 3000,
      //   max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      //   stop: ['"""'],
    });
    res.status(200).send({ bot: response.data.choices[0].text });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});

app.listen(5000, () => console.log("all set in url: http://localhost:5000"));
