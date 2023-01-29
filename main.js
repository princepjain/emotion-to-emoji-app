prediction1 = ""
prediction2 = ""



Webcam.set({
    width :350,
   height: 300,
   image_format: "png",
   png_quality:90
})


Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = "<img id='result_image' src ='"+ data_url +"'>"
    })
}

console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json", modelloaded)

function modelloaded(){
 console.log(("model has loaded"))
}

function speaking(){
    var synth = window.speechSynthesis
    speak_data1 = "The first prediction is " + prediction1
    speak_data2 = "And the second prediction is " + prediction2
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterthis)
}


function check(){
    img = document.getElementById("result_image")
    classifier.classify(img , gotresult)
}



function gotresult(error , result){

    if(error){
        console.log(error)
    }else{
        console.log(result)

        document.getElementById("result_emotion_name1").innerHTML = result[0].label
        document.getElementById("result_emotion_name2").innerHTML = result[1].label

         prediction1 = result[0].label
         prediction2 = result[1].label
   
         speaking()

         if(result[0].label == "happy"){
             document.getElementById("update_emoji1").innerHTML = "&#128512;"
         }  
         if(result[0].label == "sad"){
            document.getElementById("update_emoji1").innerHTML = "&#128532;"
        }  
        if(result[0].label == "angry"){
            document.getElementById("update_emoji1").innerHTML = "&#128545;"
        }  
        if(result[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;"
        }
        if(result[1].label == "sad"){
           document.getElementById("update_emoji2").innerHTML = "&#128532;"
       }  
       if(result[1].label == "angry"){
           document.getElementById("update_emoji2").innerHTML = "&#128545;"
       }  



    }
     

}






