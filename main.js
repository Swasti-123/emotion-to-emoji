

p1 =""
p2 =""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quailty:90 
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_image' src='" + data_uri +"'>";
    })
}

console.log("ml5.version :" + ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1UoNYftH-/model.json" , modelLoaded);

function  modelLoaded(){
    console.log("model_loaded")
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1= "The first prediction is " + p1;
    speak_data_2= "And second prediction is " + p2;
    utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function gotResult(error, results){
    if(error){
        console.error("error");
    }

    else{
        console.log(results);
        document.getElementById("emotion_1").innerHTML= results[0].label;
        document.getElementById("emotion_2").innerHTML= results[1].label;

        p1= results[0].label;
        p2= results[1].label;

        speak();

        if(p1=="Happy"){
            document.getElementById("emoji_1").innerHTML="&#128515;";
        }

        if(p1=="Sad"){
            document.getElementById("emoji_1").innerHTML="&#128550;";
        }

        if(p1=="Angry"){
            document.getElementById("emoji_1").innerHTML="&#128545;";
        }
        
        if(p1=="Shocked"){
            document.getElementById("emoji_1").innerHTML="&#128558;";
        }

        if(p1=="Expressionless"){
            document.getElementById("emoji_1").innerHTML="&#128528;";
        }



        if(p2=="Happy"){
            document.getElementById("emoji_2").innerHTML="&#128515;";
        }

        if(p2=="Sad"){
            document.getElementById("emoji_2").innerHTML="&#128550;";
        }

        if(p2=="Angry"){
            document.getElementById("emoji_2").innerHTML="&#128545;";
        }
        
        if(p2=="Shocked"){
            document.getElementById("emoji_2").innerHTML="&#128558;";
        }

        if(p2=="Expressionless"){
            document.getElementById("emoji_2").innerHTML="&#128528;";
        }
    }
}

