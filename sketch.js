
let channelName = "welcomePage";

let nameInput

let redVal;
let greenVal;
let blueVal;

let you;

function setup() {

  createCanvas(windowWidth, windowHeight);

  nameInput = createInput();
  nameInput.style('font-size', '30px');
  nameInput.position(windowWidth / 3 + 100, 300 - 30);

  sliderRed = createSlider(0, 255, 255, 1);
  sliderRed.position(windowWidth / 3 + 150, 365);
  sliderRed.style('width', '80px');

  sliderBlue = createSlider(0, 255, 255, 1);
  sliderBlue.position(windowWidth / 3 + 300, 365);
  sliderBlue.style('width', '80px');

  sliderGreen = createSlider(0, 255, 255, 1);
  sliderGreen.position(windowWidth / 3 + 480, 365);
  sliderGreen.style('width', '80px');

  submitButton = createButton("OK");
  submitButton.position(windowWidth / 3 + 100, 450);
  submitButton.style('font-size', '30px');
  submitButton.style('background', '#25dc25');
  submitButton.style('width', '300px');

}

function draw() {
  background(redVal, greenVal, blueVal);

  textSize(60);
  textStyle(BOLD);
  textAlign(CENTER);

  text("Let's Meet Your Bubble!🐟 ", windowWidth / 2, 200);

  textSize(30);
  textAlign(LEFT);
  text("Name of Bubble:", windowWidth / 5, 300);


  text("Color of Bubble:", windowWidth / 5, 380);
  textSize(20);
  text("Red", windowWidth / 3 + 100, 380);
  text("Blue", windowWidth / 3 + 250, 380);
  text("Green", windowWidth / 3 + 400, 380);

  redVal = sliderRed.value();
  blueVal = sliderBlue.value();
  greenVal = sliderGreen.value();

  // on submit enter the information
  submitButton.mousePressed(sendTheMessage);

}

function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases

  // check to see if they enter their name
  if (nameInput.value() != "") {
    // if they did, save their name to the variable "you"
    you = nameInput.value();
    // load a new page when you press submit
    window.location.href = "https://yyan168.github.io/vpsc70-a2/index.html?you=" + you + "&r=" + redVal + "&g=" + greenVal + "&b=" + blueVal;

  } else {
    // if they have no entered their name, create an alert and ask them to enter their name
    window.alert("Oops! Missing your name!");
  }


}
