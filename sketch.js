//fonts
let neucha;

// gui params
var CareLevel = 3;

// gui
let gui;
let div;

//scribble
let scrib;

//game variables
let gamestate;
let score;
let limit;
let currentMsg;
let msgs = [];
let mi;
let chatbot;
let y;
let lines;
let bots = [];
let playerPic;
let homeBot;
let botPic;
let chatPic;
let c;

//buttons
let startBtn;
let backBtn;
let restartBtn;
let sendBtn;
let chatBtn;
let saveBtn;
let backBtnA;
let artStmtBtn;

//input form
let inp;

//COLORS
//dark blue         #424D69    66, 77, 105
//blue              #66769D    102, 118, 157
//light blue        #A6B2D3    166, 178, 211
//light light blue  #d5dcf0    213, 220, 240
//white             #FFFFFF    255, 255, 255
//green             #c3e8de    195, 232, 222
//light green       #dff0eb    223, 240, 235

function setup() {
  c = createCanvas(windowWidth, windowHeight);

  //set up gui
  gui = createGui(undefined, "CARE LEVEL", "QuickSettings");
  sliderRange(1, 5);
  gui.addGlobals("CareLevel");
  gui.setPosition(width * 0.2, height * 0.02);
  gui.resize(width * 0.75, height * 0.15);
  gui.hide();

  //input
  inp = createInput();
  inp.position(width * 0.2, height * 0.9);
  inp.size(width * 0.625, height * 0.075);
  inp.hide();

  //buttons
  startBtn = createButton("start");
  startBtn.position(width * 0.5, height * 0.6);
  startBtn.size(width * 0.3, height * 0.1);
  startBtn.id("startbtn");
  startBtn.center("horizontal");
  startBtn.mousePressed(startGame);
  startBtn.hide();

  chatBtn = createButton("next");
  chatBtn.position(width * 0.475, height * 0.8);
  chatBtn.center("horizontal");
  chatBtn.mousePressed(startChat);
  chatBtn.hide();

  artStmtBtn = createButton("artist's statement");
  artStmtBtn.size(width * 0.2, height * 0.04);
  artStmtBtn.position(width * 0.475, height * 0.8);
  artStmtBtn.center("horizontal");
  artStmtBtn.mousePressed(viewArtStmt);
  artStmtBtn.hide();

  restartBtn = createButton("retry");
  restartBtn.position(width * 0.5, height * 0.6);
  restartBtn.size(width * 0.3, height * 0.1);
  restartBtn.center("horizontal");
  restartBtn.id("restartbtn");
  restartBtn.mousePressed(reset);
  restartBtn.hide();

  backBtn = createButton("back");
  backBtn.position(width * 0.01, height * 0.02);
  backBtn.mousePressed(reset);
  backBtn.hide();

  backBtnA = createButton("back");
  backBtnA.position(width * 0.01, height * 0.02);
  backBtnA.mousePressed(reset);
  backBtnA.hide();

  sendBtn = createButton("send");
  sendBtn.position(width * 0.85, height * 0.9);
  sendBtn.size(width * 0.1, height * 0.08);
  sendBtn.mousePressed(getMsg);
  sendBtn.hide();

  saveBtn = createButton("save chat");
  saveBtn.position(width * 0.5, height * 0.75);
  saveBtn.size(width * 0.175, height * 0.05);
  saveBtn.center("horizontal");
  saveBtn.mousePressed(saveChat);
  saveBtn.hide();

  //player pfp
  playerPic = loadImage("assets/player.png");

  //homescreen bot
  homeBot = loadImage("assets/homepg.png");

  //game vars
  limit = int(random(6, 9));
  score = 0;
  mi = 0;
  chatbot = "CB";
  gamestate = "home";
}

function preload() {
  neucha = loadFont("assets/Neucha-Regular.ttf");

  bots = [
    //bots[0] = null
    {
      pic: null,
      responses: null,
    },
    //care lvl 1
    {
      pic: null,
      responses: [
        "nobody fucking cares",
        "wtf why do you think i'd want to listen to this?",
        "ok and?? :/",
        "ummm ok???",
        "that sounds like a you problem tbh",
      ],
    },
    //care lvl 2
    {
      pic: null,
      responses: [
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
      ],
    },
    //care lvl 3
    {
      pic: null,
      responses: ["k", "that sucks", "wow", "damn", "rly?"],
    },
    //care lvl 4
    {
      pic: null,
      responses: [
        "oh no ):",
        "omg are you ok?",
        "no fucking way that happened",
        "is there anything i can do? )):",
        "i can't believe that happened",
      ],
    },
    //care lvl 5
    {
      pic: null,
      responses: [
        "i'll always be here for you ok?\n):",
        "can i do anything?",
        "omg are you ok?",
        "i'm sure you did your best with what you had i'm proud of you",
        "everything will be ok!!",
      ],
    },
  ];

  for (let i = 1; i <= 5; i++) {
    bots[i].pic = loadImage("assets/care" + i + ".png");
  }
}

function draw() {
  //game state
  switch (gamestate) {
    case "home":
      homeScreen();
      break;
    case "artstmt":
      artStmtScreen();
      break;
    case "instr":
      instrScreen();
      break;
    case "chat":
      chatScreen();
      break;
    case "end":
      endScreen();
      break;
    default:
      break;
  }

  //checks if game is over
  if (score > 20) {
    gamestate = "end";
  }
}

function homeScreen() {
  saveBtn.hide();
  restartBtn.hide();
  backBtn.hide();
  backBtnA.hide();
  sendBtn.hide();
  chatBtn.hide();
  artStmtBtn.show();
  gui.hide();
  inp.hide();
  startBtn.show();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textAlign(CENTER, CENTER);
  textSize(height * 0.1);
  fill(166, 178, 211);
  text("welcome to", width * 0.5, height * 0.3);
  textSize(height * 0.15);
  fill(195, 232, 222);
  text("care-bot", width * 0.5, height * 0.45);

  imageMode(CORNER);
  homeBot.resize(height * 0.35, 0);
  image(homeBot, width - height * 0.35, height * 0.72);
}

function instrScreen() {
  saveBtn.hide();
  restartBtn.hide();
  backBtn.hide();
  sendBtn.hide();
  chatBtn.show();
  startBtn.hide();
  backBtnA.hide();
  artStmtBtn.hide();
  gui.hide();
  inp.hide();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.08);
  textAlign(CENTER, CENTER);
  fill(195, 232, 222);
  text("instructions", width * 0.5, height * 0.1);

  textSize(height * 0.03);
  fill(213, 220, 240);
  text(
    "hello!!\n my name is CB, which is short for care-bot!",
    width * 0.5,
    height * 0.25
  );

  imageMode(CENTER);
  let img = bots[4].pic;
  img.resize(height * 0.3, 0);
  image(img, width * 0.5, height * 0.48);

  text(
    "feel free to rant, and i'll care as much as you want!",
    width * 0.5,
    height * 0.7
  );

  text(
    "but if i get too worn out, it's gameover...   :)",
    width * 0.5,
    height * 0.75
  );
}

function artStmtScreen() {
  saveBtn.hide();
  restartBtn.hide();
  backBtn.hide();
  sendBtn.hide();
  chatBtn.hide();
  startBtn.hide();
  artStmtBtn.hide();
  backBtnA.show();
  gui.hide();
  inp.hide();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.08);
  textAlign(CENTER, CENTER);
  fill(195, 232, 222);
  text("artist statement", width * 0.5, height * 0.1);

  textSize(height * 0.03);
  fill(213, 220, 240);
  text(
    "I often think about how much people place emphasis on seeming like they care \nand not on how much they actually care.\nIt is commonplace to put up a front of being interested when someone talks to you —\neven more so when people become vulnerable with you.\nI also find myself doing this.\nA lot of people do this from a place of not wanting to hurt others,\nbut I wonder why the care can’t come from a place of genuine concern more.\nI still don’t know if there’s an easy answer to this,\nbut I hope my project will help people become more aware of this.\n\nPlease use this platform to reflect or to simply get your feelings off your chest!\n\nThank you for your time :) \n\n- Trish Nguyen",
    width * 0.5,
    height * 0.5
  );
}

function chatScreen() {
  lines = 1;
  saveBtn.hide();
  inp.show();
  sendBtn.show();
  chatBtn.hide();
  startBtn.hide();
  backBtnA.hide();
  artStmtBtn.hide();
  backBtn.show();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.1);
  textAlign(CENTER, CENTER);
  fill(191, 207, 178);
  gui.show();

  //chat box
  fill(166, 178, 211);
  noStroke();
  rect(width * 0.2, height * 0.15, width * 0.75, height * 0.725, 5);

  showMsgs();

  if (score >= limit) {
    textAlign(CENTER);
    textSize(height * 0.065);
    fill(195, 232, 222);
    text("care-bot", width * 0.575, height * 0.035);

    textSize(height * 0.025);
    fill(213, 220, 240);
    text(
      month() + "/" + day() + "/" + year() + " @ " + getTime(),
      width * 0.575,
      height * 0.093
    );

    textSize(height * 0.025);
    fill(213, 220, 240);
    text("care level: " + CareLevel, width * 0.575, height * 0.12);

    chatPic = get(width * 0.2, 0, width * 0.75, height * 0.725);
    setTimeout(() => {
      gamestate = "end";
    }, 100);
  }
}

function endScreen() {
  backBtn.hide();
  restartBtn.show();
  saveBtn.show();
  chatBtn.hide();
  sendBtn.hide();
  backBtnA.hide();
  artStmtBtn.hide();
  inp.hide();
  gui.hide();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.13);
  textAlign(CENTER, CENTER);
  fill(195, 232, 222);
  text("game over", width * 0.5, height * 0.1);

  textSize(height * 0.055);
  fill(213, 220, 240);
  text(
    "sorry!!\na little robot like me can only take so much!\n\nyou can try again in a bit!",
    width * 0.5,
    height * 0.4
  );

  imageMode(CORNER);
  homeBot.resize(height * 0.35, 0);
  image(homeBot, width - height * 0.35, height * 0.72);
}

function keyPressed() {
  if (gamestate === "chat") {
    if (keyCode == ENTER || keyCode == RETURN) {
      getMsg();
      score++;
    }
  }
}

function saveChat() {
  save(chatPic, getTime() + "-chat-bot.png");
}

function getTime() {
  return hour() + ":" + minute() + ":" + second();
}

function respond(msg) {
  let rand = int(random(0, 5));
  console.log(`rand = ${rand}`);
  return new Msg(getTime(), bots[CareLevel].responses[rand], chatbot);
}

function startGame() {
  gamestate = "instr";
}

function startChat() {
  gamestate = "chat";
}

function viewArtStmt() {
  gamestate = "artstmt";
}

function reset() {
  gamestate = "home";
  score = 0;
  msgs = [];
  mi = 0;
  y = 0.33;
}

function reformatTxt(msg) {
  let l = 1;
  let reformatted = "";
  let prev = 0;
  let counter = 1;
  for (let i = 0; i < msg.length; i++) {
    if (msg.length - i <= 18) {
      reformatted += msg.substring(prev, msg.length);
      //console.log(
      //  `1: i = ${i} counter = ${counter} reformatted = ${reformatted}`
      //);
      break;
    } else if (counter >= 15) {
      reformatted += msg.substring(prev, i) + "\n";
      // console.log(
      //  `2: i = ${i} count = ${counter} prev = ${prev} reformatted = ${reformatted}`
      //);
      counter = 0;
      prev = i;
      l++;
      counter++;
    } else {
      // console.log(`3: i = ${i} counter = ${counter}`);
      counter++;
      continue;
    }
  }
  console.log(reformatted);
  lines = l;
  return reformatted;
}

function getMsg() {
  msg = inp.value();
  let current = new Msg(getTime(), msg, "user");
  msgs[mi] = current;
  console.log(msgs[mi].time + " > " + msgs[mi].sender + " : " + msgs[mi].msg);
  mi++;
  score++;
  inp.value("please wait for CB to respond!");

  //bot response
  let t = int(random(500, 2250));
  setTimeout(() => {
    msgs[mi] = respond(msg);
    mi++;
    inp.value("");
  }, t);

  // console.log(`mi = ${mi}`);
  // console.log(msgs);
}

function showMsgs() {
  y = 0.19;
  for (let i = 0; i < mi; i++) {
    //msgs[i].setY(y);
    msgs[i].display(y);
    y += 0.05 * lines;
  }
}

class Msg {
  constructor(time, msg, sender) {
    this.time = time;
    this.msg = msg;
    this.sender = sender;
  }

  display(y) {
    textFont(neucha);
    rectMode(CORNER);

    if (this.sender === "user") {
      //msg label
      fill(213, 220, 240);
      textAlign(RIGHT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.87, height * y);

      //pfp
      imageMode(CENTER);
      playerPic.resize(height * 0.065, 0);
      image(playerPic, width * 0.91, height * (y + 0.04));

      //msg box
      let msgBoxHeight;
      if (this.msg.length > 17) {
        lines = int(this.msg.length / 17);
        msgBoxHeight = height * 0.05 * lines;
        console.log(lines);
      } else {
        msgBoxHeight = height * 0.05;
      }
      noStroke();
      fill(223, 240, 235);
      rect(width * 0.624, height * (y + 0.015), width * 0.25, msgBoxHeight, 5);

      //msg
      let msgBoxCenter = msgBoxHeight * 0.5;
      fill(66, 77, 105);
      textAlign(RIGHT);
      textSize(height * 0.02);

      let r = reformatTxt(this.msg);

      text(r, width * 0.865, height * (y + 0.015) + msgBoxCenter);
    } else {
      //msg label
      fill(213, 220, 240);
      textAlign(LEFT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.29, height * y);

      //pfp
      imageMode(CENTER);
      bots[CareLevel].pic.resize(height * 0.065, 0);
      image(bots[CareLevel].pic, width * 0.24, height * (y + 0.04));

      //msg box
      let msgBoxHeight;
      if (this.msg.length > 17) {
        lines = int(this.msg.length / 17);
        msgBoxHeight = height * 0.1 * lines;
        console.log(lines);
      } else {
        msgBoxHeight = height * 0.05;
      }
      noStroke();
      fill(213, 220, 240);
      rect(width * 0.28, height * (y + 0.015), width * 0.25, msgBoxHeight, 5);

      //msg
      let msgBoxCenter = msgBoxHeight * 0.5;
      fill(102, 118, 157);
      textAlign(LEFT);
      textSize(height * 0.02);

      let r = reformatTxt(this.msg);

      text(r, width * 0.29, height * (y + 0.015) + msgBoxCenter);
    }
  }
}
