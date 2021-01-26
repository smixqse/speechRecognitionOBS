let b = new Bugout(window.location.hash.slice(1));
let SpeechRecognition = webkitSpeechRecognition;
const status = document.getElementById("status");
const elementText = document.getElementById('text');

b.on("server", function (address) {
  console.log("connected")
  status.textContent = "";
  b.on("message", function (address, message) {
    console.log(message)
    if (message.type === "speech") elementText.textContent = message.data;
    if (message.type === "color") elementText.style.color = message.data;
    if (message.type === "size") elementText.style.fontSize = `${message.data}px`;
  });
});

