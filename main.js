var img = "";
var stats = "";
var objects = [];
function setup() {
    canvas = createCanvas(screen.width / 2, screen.height / 2);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(screen.width / 2, screen.height / 2);
    video.hide(); 
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}
function modelLoaded() {
console.log("Cocossd is loaded.");
stats = true;
objectDetector.detect(video,gotResult);
}
function gotResult(error,results) {
if(error) {
    console.error(error);
}
{
    console.log(results);
    objects = results;
}
}
function preload() {
    img = loadImage('dog_cat.jpg');    
}
function draw() {
    image(video,0,0,screen.width / 2, screen.height / 2);
    if (stats != "") {
for (i = 0; i < objects.length; i++) {

    if (objects.length == 0) {
        document.getElementById("status").innerHTML = "Status : No Objects Detected";
    } else {
        document.getElementById("status").innerHTML = "Status : " + "Object Detected <h3 class = 'btn btn-warning'>" + objects.length + " Objects Detected</h3>";
    }
fill("#FF0000");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x,objects[i].y);
noFill();
stroke("#FF0000");
strokeWeight(4);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
    }

}