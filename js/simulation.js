var simulation_started = 0; 
var simulation;
var simulation_iter = 0;
var simulation_messages = 
        [
            {name: "Jacob", role: "participant", content: "こんにちは、マキシム先生。"},
            {name: "Oliver", role: "participant", content: "こんにちは。"},
            {name: "Maxime", role: "host", content: "お元気ですか？"},
            {name: "Jacob", role: "participant", content: "元気です！"},
            {name: "Maxime", role: "host", content: "オリバーさん、大丈夫ですか？"},
            {name: "Oliver", role: "participant", content: "まあまあ…"},
            {name: "Maxime", role: "host", content: "そうですか？　何かあったんですか？"},
            {name: "Oliver", role: "participant", content: "そうですね…　彼女と別れたんです。"},
            {name: "Jacob", role: "participant", content: "ええ！　本当ですか？　それはひどいですよ！"},
            {name: "Jacob", role: "participant", content: "心配しないでオリバーくん、クラスの後でクラブ行きましょうか？　この彼女をわすれたのほうがいいんだろう！"},
            {name: "Oliver", role: "participant", content: "はい！　ありがとう！"},
            {name: "Maxime", role: "host", content: "良かったですね！　じゃあ、クラス始めましょうか。"}
        ]

function simulate() {
    if (simulation_started == 0) {
        simulation_started = 1;

        simulation = window.setInterval( function() {
            if(simulation_iter >= simulation_messages.length) {
                stopSimulation();
            }
            else {
                // last_unique_id are a global var from meeting.html
                var message = {
                    unique_id: last_unique_id + 1,
                    name: simulation_messages[simulation_iter].name,
                    role: simulation_messages[simulation_iter].role,
                    content: simulation_messages[simulation_iter].content,
                    translation: "",
                    timestamp: new Date()
                }
                transcript_content.messages.push(message)
                last_unique_id++;
                simulation_iter++;
                showSpeechBubble(message);
				
				var transcriptText = document.getElementById('transcriptText')
				var dif = transcriptText.scrollHeight - transcriptText.scrollTop
				if(transcriptText.scrollHeight - transcriptText.scrollTop > transcriptText.clientHeight && document.hasFocus()) {
					document.getElementById('quick-scroll-btn').style.visibility = "visible"
				}
            }
        }, 3100);
    }
}

function stopSimulation() {clearInterval(simulation); console.log("Simulation completed.")}

function showSpeechBubble(message) {

    if(bubblesOn == 1) {
        var speechBubbleId = "#speech-bubble-" + message.name;
        var speechBubble = document.querySelector(speechBubbleId);

        speechBubble.innerHTML = message.content;
        speechBubble.style.display = "block";

        //put interval to hide after 2 seconds
        setTimeout(function () {document.querySelector(speechBubbleId).style.display='none'}, 3000);
    }
}