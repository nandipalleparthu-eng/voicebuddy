const output = document.getElementById("output");

function startListening() {
  const mode = document.getElementById("mode").value;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.start();

  recognition.onresult = async function (event) {
    const userText = event.results[0][0].transcript;
    output.innerHTML = "🧑 You said: " + userText;

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText, mode: mode })
    });

    const data = await response.json();
    speak(data.reply);
  };
}

function speak(text) {
  output.innerHTML += "<br><br>🤖 VoiceBuddy: " + text;
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.9;
  window.speechSynthesis.speak(speech);
}
