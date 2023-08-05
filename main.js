prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
    });

}
console.log("ml5.version:", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PvlEHrvy3/model.json", model_loaded);
function model_loaded(){
console.log("model loaded!!!")
}

function speak(){
    var synth=window.speechSynthesis;
    speakData_1="The first prediction is" + prediction1;
    speakData_2=" and the second prediction is" + prediction2;
    var utter_this=new SpeechSynthesisUtterance(speakData_1+speakData_2);
    synth.speak(utter_this);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, got_result);
}
function got_result(error, results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("name1").innerHTML=results[0].label;
    document.getElementById("name2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;

    speak();

    if(results[0].label == "victory"){
        document.getElementById("emoji1").innerHTML="&#9996";
        
    }
    if(results[0].label == "thumbs up"){
        document.getElementById("emoji1").innerHTML="&#128077";
        
    }
    if(results[0].label == "amazing"){
        document.getElementById("emoji1").innerHTML="&#128076";
    }
    
    if(results[1].label == "victory"){
        document.getElementById("emoji2").innerHTML="&#9996";
        
    }
    if(results[1].label == "thumbs up"){
        document.getElementById("emoji2").innerHTML="&#128077";
        
    }
    if(results[1].label == "amazing"){
        document.getElementById("emoji2").innerHTML="&#128076";
    }
    
}
}