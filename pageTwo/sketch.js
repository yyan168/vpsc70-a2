
var circles = [];

// variable used for incoming messages
var x;
var y;
var who;
var fish

let channelName = "fishGameChannel";

// variables from the previous page
var url = new URL(window.location.href);
var you = url.searchParams.get("you");
var redVal = url.searchParams.get("r");
var greenVal = url.searchParams.get("g");
var blueVal = url.searchParams.get("b");

// printing out the values so that we know what is going on. 
console.log(you);
console.log(redVal);
console.log(greenVal);
console.log(blueVal);

let intersect = false
let life = 7 * 30 // 7s
let speed = 6


createServer(you); // creating our pubnub server with our name.

function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  textAlign(CENTER, CENTER)

  // listen for messages coming through the subcription feed on this specific channel. 
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({ channels: [channelName] });

  frameRate(30)
  fish = {
    x: width * 0.65,
    y: height / 2,
    a: 0
  }
}


function keyPressed() {
  if (key != 'a') return

  for (let i = 0; i < circles.length; i++) {
    if (you == circles[i].who) {
      return
    }
  }

  if (circles.length == 0) {
    circles.push(new CircleShape(50, 50, redVal, greenVal, blueVal, you))
    x = 50
    y = 50
  } else {
    circles.push(new CircleShape(width - 50, height - 50, redVal, greenVal, blueVal, you))
    x = width - 50
    y = height - 50
  }
}

function draw() {
  background(40,180,220);

  sendTheMessage(); // send the message with the cursor location every 100ms.   

  if (intersect) {
    drawFish()
  } else {
    drawCircle()
  }
}


function drawFish() {
  if (life > 0) {

    push()
    noStroke()
    textSize(50)
    textStyle(BOLD)

    text('Memory⏰: ' + int(life / 30) + 's', width / 2, 150)
    pop()
    life--
  } else {
    return
  }

  stroke(0)
  strokeJoin(ROUND)
  strokeWeight(10)
  noFill()
  let { x, y, a } = fish
  triangle(x, y, x + 100, y - 80, x + 100, y + 80)

  let x1 = x + 100
  triangle(x1, y, x1 + 60, y - 40, x1 + 60, y + 40)

  strokeWeight(5)
  circle(x + 40, y, 22)
  fill(0)
  circle(x + 40, y, 5)

  fish.x -= speed
  fish.y += sin(a)
  fish.a += 1
}

function drawCircle() {
  for (let i = 0; i < circles.length; i++) { // loop through all the cursors and show them on the page
    noStroke(0);
    fill(circles[i].r, circles[i].g, circles[i].b)
    ellipse(circles[i].x, circles[i].y, 100, 100);
    textSize(20);
    textAlign(CENTER);
    fill(255 - circles[i].r, 255 - circles[i].g, 255 - circles[i].b); // make the text colour different
    text(circles[i].who, circles[i].x, circles[i].y + 5);
  }

  // check intersection
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (i != j) { // not check myself
        if (dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y) < 100) {
          intersect = true
        }
      }
    }
  }
}

// PubNub logic below
function sendTheMessage() {
  if (mouseIsPressed) {
    x = mouseX
    y = mouseY
  }

  if (!x || !y) return

  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: x,
      y: y,
      r: redVal,
      g: greenVal,
      b: blueVal,
    },
  });
}

function readIncoming(inMessage) {
  // when new data comes in it triggers this function,
  // we call this function in the setup

  /*since an App can have many channels, we ensure that we are listening
  to the correct channel */
  if (inMessage.channel == channelName) {

    let x = inMessage.message.x; // get the mouseX value from the other people
    let y = inMessage.message.y; // get the mouseY value from the other people
    let r = inMessage.message.r; // get the red value from the other people
    let g = inMessage.message.g; // get the green value from the other people
    let b = inMessage.message.b; // get the blue value from the other people
    let who = inMessage.publisher; // who sent the message

    // console.log(inMessage); //logging for information

    let newinput = true; // we are checking to see if this person who sent the message is already on the page. 

    for (let i = 0; i < circles.length; i++) { // loop through all the IDs that have sent us messages before
      if (who == circles[i].who) { // if who is already in our array, update the x & y values
        circles[i].x = x;
        circles[i].y = y;
        newinput = false;    // set the boolean to false since this is not a new user
      }
    }

    if (newinput) { // if this is a new user, create a new JSON object that we add to our array
      circles.push(new CircleShape(x, y, r, g, b, who));
    }
  }
}
function CircleShape(x, y, r, g, b, who) { // creates a new JSON object for us

  this.x = x; // this is shorthand for saying "this object"
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.who = who;

}