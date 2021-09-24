leftWristx = 0
leftWristy = 0
rightWristx = 0
rightWristy = 0
song = ""
function preload() {
  song = loadSound("music.mp3")
}
function setup() {
  canvas = createCanvas(600, 500)
  canvas.center()

  video = createCapture(VIDEO)
  video.hide()

  poseNet = ml5.poseNet(video, model_loaded)

  poseNet.on('pose', got_poses)
}
function draw() {
  image(video, 0, 0, 600, 500)
  fill("#0f03fc")
  stroke("#fcfd00")
  circle(leftWristx, leftWristy, 20)
  InNumberLeftWristY = Number(leftWristy)
  remove_decimals = floor(InNumberLeftWristY)
  volume = remove_decimals / 500
//  document.getElementById("volume").innerHTML = volume
  song.setVolume(volume)

  fill('#0f03fc')
  stroke("#fcfd00")
  circle(rightWristx,rightWristy,20)

  if(rightWristy>0 && rightWristy<=100){
    document.getElementById("speed").innerHTML="Speed = 0.5X"
song.rate(0.5)
  }
  else if(rightWristy>100 && rightWristy<=200){
    document.getElementById("speed").innerHTML="Speed = 1.0x"
    song.rate(1.0)
  }
  else if(rightWristy>200 && rightWristy<=300){
    document.getElementById("speed").innerHTML="Speed = 1.5x"
    song.rate(1.5)
  }
  else if(rightWristy>300 && rightWristy<=400){
    document.getElementById("speed").innerHTML="Speed = 2.0x"
    song.rate(2.0)
  }
  else if(rightWristy>400 && rightWristy<=500){
    document.getElementById("speed").innerHTML="Speed = 2.5x"
    song.rate(2.5)
  }
}
function play() {
  song.play()
  song.rate(1)
  song.setVolume(1)
}
function model_loaded() {
  console.log("model loaded")
}
function got_poses(result) {
  if (result.length > 0) {
    console.log(result)
    leftWristx = result[0].pose.leftWrist.x
    leftWristy = result[0].pose.leftWrist.y
    rightWristx = result[0].pose.rightWrist.x
    rightWristy = result[0].pose.rightWrist.y
    console.log("left wrist x = " + leftWristx + " left wrist y = " + leftWristy)
    console.log('right wrist x = ' + rightWristx + " right wrist y = " + rightWristy)
  }
}