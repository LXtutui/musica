var canvas, video, posenet, musica;
var musica1="";
var musica2="";
var musica1status="";
var musica2status="";
var pontuacaoPulsoD=0;
var pontuacaoPulsoE=0;
var pulsoEsquerdoX=0;
var pulsoEsquerdoY=0;
var pulsoDireitoX=0;
var pulsoDireitoY=0;

function preLoad(){
    musica1=loadSound("music.mp3");
    musica2=loadSound("music2.mp3");
}

function setUp(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=crateCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("modelo carregado");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        pontuacaoPulsoD=results[0].pose.keypoints[10].score;
        pontuacaoPulsoE=results[0].pose.keypoints[9].score;
        pulsoDireitoX=results[0].pose.rightWrist.x; 
        pulsoDireitoY=results[0].pose.rightWrist.y; 
        pulsoEsquerdoX=results[0].pose.leftWrist.x; 
        pulsoEsquerdoY=results[0].pose.leftWrist.y; 
    }
}

function play(){
    musica.play();
    musica.setVolume(1);
    musica.rate(1);
}

function draw(){
    image(video, 0, 0, 600, 500);
    musica1status=musica1.isPlaying();
    musica2status=musica2.isPlaying();
    fill("red");
    stroke("red");
    if(pontuacaoPulsoD>0.2){
        circle(pulsoDireitoX, pulsoDireitoY, 20);
        musica2.stop();
        if(musica1status=false){
            musica1.play();
            document.getElementById("song").innerHTML="Harry Potter";

        }
    }
    if(pontuacaoPulsoE>0.2){
        circle(pulsoEsquerdoX, pulsoEsquerdoY, 20);
        musica1.stop();
        if(musica2status=false){
            musica2.play();
            document.getElementById("song").innerHTML="Peter Pan";
            
        }
    }
}