const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4001;
const API_KEY = process.env.OPENAI_API_KEY;

const { Configuration, OpenAIApi } = require("openai");

app.use(express.json());
app.use(cors());

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use("/ai", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const maxTokens = req.body.maxTokens ?? 256;
    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send(
      JSON.stringify({
        text: response.data.choices[0].text,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500, error.message);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build"));
});
// }

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
