const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", (req, res) => {
  const { text, mode } = req.body;

  let reply = "";

  if (mode === "child") {
    reply = "That's a great question! Let me explain it simply. " +
            "Always keep learning and asking questions.";
  } else {
    reply = "Thank you for asking. I will explain this calmly and clearly. " +
            "Please let me know if you need more help.";
  }

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("VoiceBuddy AI running at http://localhost:3000");
});
