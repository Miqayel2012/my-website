const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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
`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Դու Henakety AI-ն ես՝ օգնական։ Պատասխանիր նույն լեզվով, եղիր պարզ ու օգտակար։"
          },
          ...(history || []),
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});