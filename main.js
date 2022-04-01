baby="";
status="";
objects=[];
confidence="";

function preload(){
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status detecting object";
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            if(objects[i].label=="person"){
                document.getElementById("spider_man").innerHTML="Baby detected";
            }
            else{
                document.getElementById("spider_man").innerHTML="Baby not detected";

            }
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="Object Detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" " +percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}


function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}
function gotResult(error,results){
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}