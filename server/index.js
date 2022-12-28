const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT ?? 4001;
const API_KEY = process.env.OPENAI_API_KEY;

const { Configuration, OpenAIApi } = require("openai");

app.use(express.json());
app.use(cors());

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use("/ai", async (req, res) => {
  try {
    const prompt = req.body?.prompt;
    const isValidModel = /[texcod]{4}\-[a-z]+\-00\d/.test(req.body?.model);
    const model = isValidModel ? req.body.model : "text-davinci-001";
    const maxTokens = req.body?.maxTokens ?? 256;
    const temperature = req.body?.temperature ?? 0.7;
    const topP = req.body?.topP ?? 1;
    const frequencyPenalty = req.body?.frequencyPenalty ?? 0.49;
    const presencePenalty = req.body?.presencePenalty ?? 0;

    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
    });

    res.status(200).send(
      JSON.stringify({
        text: response?.data?.choices?.[0]?.text ?? "",
        tokensUsed: response?.data?.usage?.total_tokens ?? "error",
      })
    );
  } catch (error) {
    res.status(500, error?.message);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build"));
});
// }

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
