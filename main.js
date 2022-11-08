prediction1 = "";

Webcam.set
({
    height:300,
    width:350,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vjn6KK5ii/model.json",modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) 
{
    if (error) 
    {
      console.error(error);
    } 
    else 
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "This is looking AMAZING!!!")
        {
          document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "ALL the BEST!!!")
        {
          document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "That was a marvelous VICTORY!!!")
        {
          document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
   }
}   

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
} 