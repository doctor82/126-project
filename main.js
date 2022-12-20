song1="";

song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
song1=loadSound("song1.mp3");
song2=loadSound("song2.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);

}
function modelLoaded(){
console.log("Posenet Is Intitialised");
}
function draw(){
image(video,0,0,600,500);
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left Wrist: " + scoreLeftWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X  : " + leftWristX+", Left Wrist Y : "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X  : " + rightWristX+", Right Wrist Y : "+rightWristY);
  
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    song1_status=song1.isPlaying();
    song2_status=song2.isNotPlaying();
    fill("red");
    stroke("black");
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);  
    song2.stop();
    if(song1_status==false){
    song1.play();
    document.getElementById("song").innerHTML="Playing Alone"
    }
    }
    if (scoreLeftWrist>0.2) {
        circle(leftWristX, leftWristY, 20);        
        song1.stop();
        if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="Playing AloneFaded";
    }
}   
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}