var simulation_started = 0; 
var simulation;
var simulation_iter = 0;
var simulation_messages = 
        [
            {name: "Oliver", role: "participant", content: "こんにちは、しげる先生。"},
            {name: "Maxime", role: "participant", content: "こんにちは、先生！"},
            {name: "Jacob", role: "participant", content: "こんにちは。"},
            {name: "Shigeru", role: "host", content: "お元気ですか？"},
            {name: "Maxime", role: "participant", content: "元気です！"},
            {name: "Jacob", role: "participant", content: "僕も元気です！"},
            {name: "Shigeru", role: "host", content: "オリバーさん、大丈夫ですか？"},
            {name: "Oliver", role: "participant", content: "まあまあ…"},
            {name: "Shigeru", role: "host", content: "そうですか？　何かあったんですか？"},
            {name: "Oliver", role: "participant", content: "そうですね…　彼女と別れたんです。"},
            {name: "Maxime", role: "participant", content: "ええ！　本当ですか？　それはひどいですよ！"},
            {name: "Jacob", role: "participant", content: "心配しないでオリバーくん、クラスの後でクラブ行きましょうか？　この彼女をわすれたのほうがいいんだろう！"},
            {name: "Maxime", role: "participant", content: "そうですよ！クラブ一緒に行きましょう！"},
            {name: "Oliver", role: "participant", content: "はい！　みんなありがとう！"},
            {name: "Shigeru", role: "host", content: "良かったですね！　じゃあ、クラス始めましょうか。"},
            {name: "Narrator", role: "?", content: "To be continued..."}
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
                transcript_content.messages.push({
                    unique_id: last_unique_id + 1,
                    name: simulation_messages[simulation_iter].name,
                    role: simulation_messages[simulation_iter].role,
                    content: simulation_messages[simulation_iter].content,
                    translation: "",
                    timestamp: new Date()
                })
                last_unique_id++;
                simulation_iter++;
				
				var transcriptText = document.getElementById('transcriptText')
				var dif = transcriptText.scrollHeight - transcriptText.scrollTop
				if(transcriptText.scrollHeight - transcriptText.scrollTop > transcriptText.clientHeight && document.hasFocus()) {
					console.log("Focused");
					document.getElementById('quick-scroll-btn').style.visibility = "visible"
				}
				
				if(!document.hasFocus()) {
					console.log("Not focused");
				}
            }
        }, 2000);
    }
}

function stopSimulation() {clearInterval(simulation); console.log("Simulation completed.")}