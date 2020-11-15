const speechConfig = SpeechSDK.SpeechConfig.fromSubscription("e7868a10ab944f1f9ca2edf5737c2c95", "westus");
speechConfig.speechRecognitionLanguage = "ja-JP";
speechConfig.speechSynthesisLanguage = "ja-JP";

var toggle = 0;

function fromMic() {
    let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    
    console.log('Speak into your microphone.');
    recognizer.recognizeOnceAsync(result => {
        console.log(`RECOGNIZED: Text=${result.text}`);
        synthesizeSpeech(result.text);
        // Create message instance (with interactions)
    });
}

function synthesizeSpeech(input) {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();

    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
        input,
        result => {
            if (result) {
                console.log(JSON.stringify(result));
            }
            synthesizer.close();
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

// Translation

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function azureTranslate(input, index) {

    var subscriptionKey = "4a6a592e8aae48b5988a1de2f5ff433a";
    var endpoint = "https://api.cognitive.microsofttranslator.com/";

    // Add your location, also known as region. The default is global.
    // This is required if using a Cognitive Services resource.
    var location = "global";

    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4()
        },
        params: {
            'api-version': '3.0',
            'from': 'ja',
            'to': 'en'
        },
        data: [{
            'text': input
        }],
        responseType: 'json'
    }).then(function(response){
        translationReceived(input, response.data[0].translations[0].text, index);
    })
}