let b = new Bugout();
let SpeechRecognition = webkitSpeechRecognition;
const status = document.getElementById("status");
const elementText = document.getElementById('text');
const options = document.getElementById('options');

document.getElementById("url").textContent = `${window.location.protocol}//${window.location.host}/receiver.html#${b.address()}`

let receiverID;

b.on("seen", function (address) {
  receiverID = address;
  status.textContent = "Conexão feita com sucesso"
  options.style.display = "block";
  document.querySelectorAll(".inputs").forEach(input => input.addEventListener("change", e => {
    b.send(receiverID, {type: e.target.name, data: e.target.value})
  }));
  speechRecognition = new SpeechRecognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = 'pt-BR';
  speechRecognition.start();
  speechRecognition.onresult = function (event) {

    if (typeof (event.results) == 'undefined') {
      speechRecognition.stop();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        let speech_text = event.results[i][0].transcript
        console.log(speech_text)
        b.send(receiverID, {type: "speech", data: speech_text});
        elementText.textContent = speech_text;
        let sentenceSize = elementText.textContent.split(' ').length
        if (sentenceSize > 18) {
          elementText.textContent = ""
        }
      }
    }

  };
});

