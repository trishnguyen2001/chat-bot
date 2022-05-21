//fonts
let neucha;

// gui
var CareLevel = 3;
let gui;
let div;

//game variables
let gamestate;
let score;
let limit;
let currentMsg;
let msgs = [];
let mi; //msgs index
let chatbot;
let bots = [];
let playerPic;
let homeBot;
let botPic;
let chatPic;
let phonePic;
let dummy; //dummy photo file to preserve resolution
let ellipsePic;
let c; //canvas
let currentBot; //bot's current pic
let currentLvl = CareLevel; //current care lvl

let msgY; //current msg height
let msgL; //msgL in prev msg

//buttons
let startBtn;
let backBtn;
let restartBtn;
let sendBtn;
let chatBtn;
let saveBtn;
let artStmtBtn;
let achvBtn;

//input form
let inp;

//sounds
// let bgSound;
let clickSound;
let notifSound;
let typingSound;
let endSound;
let swooshSound;
let unlockSound;

//achvmts
let meanie;
let bff;
let botception;
let superSleuth;
let emo;
let weirdo;

let lockedPic;

//achvmt requirements
let meanieRec = [
  "you're such an asshole",
  "you're useless",
  "thanks for nothing CB",
];
let bffRec = [
  "you're so nice",
  "what would i without you",
  "ily",
  "i love you",
  "you're the best",
];
let botceptionRec = ["simulation", "you're just a robot"];
let emoRec = ["what's the point", "life is pointless"];
let weirdoRec = ["you're cute", "wanna go on a date?"];

//animation vars
let k = 0,
  t = 0,
  m = 0;
let dotColor;
let responding;

//////////////////////////COLORS/////////////////////
//dark blue         #424D69    66, 77, 105
//blue              #66769D    102, 118, 157
//light blue        #A6B2D3    166, 178, 211
//light light blue  #d5dcf0    213, 220, 240
//white             #FFFFFF    255, 255, 255
//blue green        #c3e8de    195, 232, 222
//green             #a0dec1    160, 222, 193
//light green       #dff0eb    223, 240, 235

//////////////////////////MAIN FUNCTIONS/////////////////////
function setup() {
  c = createCanvas(windowWidth, windowHeight);

  //set up gui
  let x = width * 0.02;
  let sideL = width * 0.15;
  gui = createGui(undefined, "CARE LEVEL", "QuickSettings");
  sliderRange(1, 5);
  gui.addGlobals("CareLevel");
  gui.setPosition(x + sideL + 12.5, height * 0.02);
  gui.resize(width * 0.76, height * 0.15);
  gui.hide();

  //input
  inp = createInput();
  inp.position(width * 0.2, height * 0.9);
  inp.size(width * 0.625, height * 0.075);
  inp.hide();

  //buttons
  startBtn = createButton("start");
  startBtn.position(width * 0.5 - 175, height * 0.6);
  startBtn.size(350, 85);
  startBtn.id("startbtn");

  startBtn.mouseOver(() => {
    startBtn.position(width * 0.5 - 180, height * 0.585);
    startBtn.size(360, 90);
  });
  startBtn.mouseOut(() => {
    startBtn.position(width * 0.5 - 175, height * 0.6);
    startBtn.size(350, 85);
  });
  startBtn.mousePressed(startGame);

  chatBtn = createButton("next");
  chatBtn.position(width * 0.5 - 75, height * 0.8);
  chatBtn.size(150, 40);
  chatBtn.mousePressed(startChat);
  chatBtn.hide();
  chatBtn.mouseOver(() => {
    chatBtn.position(width * 0.5 - 77.5, height * 0.7925);
    chatBtn.size(155, 45);
  });
  chatBtn.mouseOut(() => {
    chatBtn.position(width * 0.5 - 75, height * 0.8);
    chatBtn.size(150, 40);
  });

  artStmtBtn = createButton("artist's statement");
  artStmtBtn.size(200, height * 0.06);
  artStmtBtn.position(width * 0.475, height * 0.8);
  artStmtBtn.center("horizontal");
  artStmtBtn.mousePressed(viewArtStmt);
  artStmtBtn.hide();

  restartBtn = createButton("retry");
  restartBtn.position(width * 0.5 - 175, height * 0.6);
  restartBtn.size(350, 60);
  restartBtn.id("restartbtn");
  restartBtn.mousePressed(reset);
  restartBtn.hide();
  restartBtn.mouseOver(() => {
    restartBtn.position(width * 0.5 - 180, height * 0.585);
    restartBtn.size(360, 65);
  });
  restartBtn.mouseOut(() => {
    restartBtn.position(width * 0.5 - 175, height * 0.6);
    restartBtn.size(350, 60);
  });

  backBtn = createButton("back");
  backBtn.position(width * 0.02, height * 0.02);
  backBtn.mousePressed(reset);
  backBtn.hide();

  sendBtn = createButton("send");
  sendBtn.position(width * 0.85, height * 0.9);
  sendBtn.size(width * 0.1, height * 0.08);
  sendBtn.mousePressed(getMsg);
  sendBtn.hide();

  saveBtn = createButton("save chat");
  saveBtn.position(width * 0.5 - 75, height * 0.75);
  saveBtn.size(125, 50);
  saveBtn.mousePressed(saveChat);
  saveBtn.hide();

  achvBtn = createButton("achievements");
  if (width * 0.2 > 165) {
    console.log("1");
    achvBtn.size(165, 50);
    achvBtn.position(width * 0.8, height * 0.05);
  } else {
    console.log("2");
    achvBtn.size(width * 0.2, 50);
    achvBtn.position(width * 0.75, height * 0.05);
  }
  achvBtn.mousePressed(viewAchv);
  achvBtn.hide();

  //pfps
  playerPic = loadImage("assets/player.png");
  homeBot = loadImage("assets/homepg.png");
  dummy = loadImage("assets/dummy.png");

  //achvmt pics
  meanie = new Achvmt(
    "rude af",
    "You were so mean to CB that\nthey're wallowing in self-hate now...\nyou're officially banned :/",
    loadImage("assets/meanie.png"),
    "locked"
  );

  bff = new Achvmt(
    "CB's new bff!",
    "CB mistook your basic human\ndecency as affection, and now they\nwill NEVER let you leave!     :D",
    loadImage("assets/bff.png"),
    "locked"
  );

  botception = new Achvmt(
    "botception",
    "Congrats - you made CB question\neverything and now they're spiraling!\nYou really do fuck up everything!!",
    loadImage("assets/botception.png"),
    "locked"
  );

  superSleuth = new Achvmt(
    "super sleuth",
    "Seriously...\nHow did you find it?",
    loadImage("assets/sleuth.png"),
    "locked"
  );

  emo = new Achvmt(
    "emo relapse",
    "pain...agony...SUFFERING!\nthe teen angst levels\nare astronomical",
    loadImage("assets/emo.png"),
    "locked"
  );

  weirdo = new Achvmt(
    "weirdo",
    "ummmmmmmmmmmmmmmm ok???",
    loadImage("assets/weirdo.png"),
    "locked"
  );

  //game vars
  limit = int(random(6, 9));
  score = 0;
  mi = 0;
  chatbot = "CB";
  gamestate = "home";
  // gamestate = "chat";
  updatePic();

  dotColor = color(102, 118, 157);
  dotColor.setAlpha(255);
  responding = false;

  // bgSound.play();
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
      displayName: "really mean",
      responses: [
        "nobody cares",
        "wtf why do you think i'd want to listen to this?",
        "ok and?? :/",
        "ummm ok???",
        "that sounds like a you problem tbh",
        "damn you rly think i care",
        "oh would you look at that\nmy last fuck",
        "k",
        "you rly do fuck up everything in your life, huh?",
        "show me where i asked?",
      ],
    },
    //care lvl 2
    {
      pic: null,
      displayName: "mean",
      responses: [
        "k",
        "that sucks",
        "wow",
        "damn",
        "k",
        "kk",
        "wow",
        "cool",
        "wow",
        "that sucks",
      ],
    },
    //care lvl 3
    {
      pic: null,
      displayName: "indifferent",
      responses: [
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
        "damn that's crazy",
      ],
    },
    //care lvl 4
    {
      pic: null,
      displayName: "cares",
      responses: [
        "awww oh no",
        "that sounds like it really sucked\ni'm sorry",
        "nooooooooo",
        "i hope you feel better",
        "wth that sucks so much",
        "dude i'm so sorry",
        "omg you got this tho",
        "; ^ ;",
        "no stop that's so sad",
        "stay strong you got this!!!",
      ],
    },
    //care lvl 5
    {
      pic: null,
      displayName: "really cares",
      responses: [
        "i'll always be here for you ok? ):",
        "can i do anything? ):",
        "omg are you ok?????",
        "i'm sure you did your best with what you had\ni'm proud of you",
        "everything will be ok!! i promise!",
        "oh no ):",
        "WHAT NOOOOO",
        "where are they\nLET ME AT THEM",
        "is there anything i can do? )):",
        "i can't believe that happened...",
      ],
    },
  ];

  for (let i = 1; i <= 5; i++) {
    bots[i].pic = loadImage("assets/care" + i + ".png");
  }

  //imgs
  lockedPic = loadImage("assets/locked.png");
  phonePic = loadImage("assets/phone.png");
  ellipsePic = loadImage("assets/ellipse.png");

  //sounds
  soundFormats("mp3", "wav");

  typingSound = loadSound("assets/typing.wav");
  typingSound.rate(2);
  typingSound.setVolume(0.5);

  clickSound = loadSound("assets/click.mp3");
  clickSound.setVolume(1.25);

  notifSound = loadSound("assets/notif.mp3");

  endSound = loadSound("assets/beep.mp3");
  endSound.setVolume(0.4);

  swooshSound = loadSound("assets/swoosh.mp3");
  swooshSound.setVolume(0); //doesn't play @ initial load

  unlockSound = loadSound("assets/unlock.mp3");
  unlockSound.setVolume(0.7);
}

function keyPressed() {
  if (gamestate === "chat") {
    if (keyCode == ENTER || keyCode == RETURN) {
      clickSound.play();
      getMsg();
      inp.value("");
      score++;
    }
  }
}

function saveChat() {
  save(chatPic, getTime() + "-chat-bot.png");
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
      if (CareLevel != currentLvl) {
        updatePic();
      }
      chatScreen();
      break;
    case "end":
      endScreen();
      break;
    case "achv":
      achvScreen();
    default:
      break;
  }

  //checks if game is over
  if (score > 20) {
    gamestate = "end";
  }

  //checks for super-sleuth achvmt
  if (
    gamestate === "chat" &&
    mouseX >= width * 0.12 &&
    mouseX <= width * 0.1207 &&
    mouseY >= height * 0.62 &&
    mouseY >= height * 0.63 &&
    superSleuth.state === "locked"
  ) {
    superSleuth.unlock();
    let notif = new Notification(superSleuth);
    notif.display();
  }
}

//////////////////////////SCREEN RENDERING FUNCTIONS/////////////////////

function homeScreen() {
  saveBtn.hide();
  restartBtn.hide();
  backBtn.hide();
  sendBtn.hide();
  chatBtn.hide();
  artStmtBtn.show();
  startBtn.show();
  gui.hide();
  inp.hide();
  achvBtn.show();
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
  image(
    homeBot,
    width - height * 0.35,
    height * 0.65,
    height * 0.35,
    height * 0.35
  );
}

function instrScreen() {
  achvBtn.hide();
  saveBtn.hide();
  restartBtn.hide();
  backBtn.hide();
  sendBtn.hide();
  chatBtn.show();
  startBtn.hide();
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
  image(img, width * 0.5, height * 0.48, height * 0.3, height * 0.3);

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

function achvScreen() {
  achvBtn.hide();
  saveBtn.hide();
  restartBtn.hide();
  backBtn.show();
  sendBtn.hide();
  chatBtn.hide();
  startBtn.hide();
  artStmtBtn.hide();
  gui.hide();
  inp.hide();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.08);
  textAlign(CENTER, CENTER);
  fill(195, 232, 222);
  text("achievements", width * 0.5, height * 0.1);

  textSize(height * 0.04);
  fill(213, 220, 240);
  text("try to unlock all of them!", width * 0.5, height * 0.2);

  let boxLength = height * 0.34;
  let boxHeight = height * 0.28;

  let incr = height * 0.02;
  let x = width * 0.5 - boxLength * 1.55;
  let y = height * 0.25;

  meanie.display(x, y);
  bff.display(x + incr + boxLength, y);
  botception.display(x + 2 * (incr + boxLength), y);
  superSleuth.display(x, y + boxHeight + incr);
  emo.display(x + incr + boxLength, y + boxHeight + incr);
  weirdo.display(x + 2 * (incr + boxLength), y + boxHeight + incr);

  // meanie.unlock();
  //bff.unlock();
  // botception.unlock();
  //superSleuth.unlock();
  // emo.unlock();
  // weirdo.unlock();
}

function artStmtScreen() {
  achvBtn.hide();
  saveBtn.hide();
  restartBtn.hide();
  backBtn.show();
  sendBtn.hide();
  chatBtn.hide();
  startBtn.hide();
  artStmtBtn.hide();
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
  achvBtn.hide();
  saveBtn.hide();
  inp.show();
  sendBtn.show();
  chatBtn.hide();
  startBtn.hide();
  artStmtBtn.hide();
  backBtn.show();
  background(66, 77, 105);

  //text setup
  textFont(neucha);
  textSize(height * 0.1);
  textAlign(CENTER, CENTER);
  fill(191, 207, 178);
  gui.show();

  //vars
  let x = width * 0.02;
  msgY = 0.26;

  //side menu
  let sideL = width * 0.15;
  let sideH = height * 0.835;
  fill(166, 178, 211);
  noStroke();
  rect(x, height * 0.15, sideL, sideH, 5);

  //side bar profiles
  let sideBarIconSize;
  let incr;
  let sideBarY;
  let sideBarX;
  let highlightX;
  //show both name and pfp
  if (windowWidth >= 950) {
    sideBarX = x + sideL * 0.2;
    sideBarIconSize = height * 0.1;
    incr = sideH * 0.07 + sideBarIconSize;
    sideBarY = height * 0.245;
    highlightX = sideBarX + sideBarX * 0.9;

    //display names
    fill(66, 77, 105);
    textAlign(LEFT);
    textSize(height * 0.035);
    for (let i = 1; i <= 5; i++) {
      text(
        bots[i].displayName,
        sideBarX + sideBarIconSize * 0.7,
        sideBarY + (i - 1) * incr
      );
    }
  }
  //show only pfp
  else {
    sideBarX = x + sideL * 0.5;
    sideBarIconSize = height * 0.13;
    incr = sideH * 0.035 + sideBarIconSize;
    sideBarY = height * 0.245;
    highlightX = sideBarX;
  }

  //highlight
  let highlightY = sideBarY + (CareLevel - 1) * incr;
  let highlightL = sideL - 5;
  let highlightH = sideBarIconSize + 15;
  rectMode(CENTER);
  noStroke();
  fill(102, 118, 157, 100);
  rect(highlightX, highlightY, highlightL, highlightH, 5);

  imageMode(CENTER);
  //bot 1
  image(
    bots[1].pic,
    sideBarX,
    sideBarY + 0 * incr,
    sideBarIconSize,
    sideBarIconSize
  );
  //bot 2
  image(
    bots[2].pic,
    sideBarX,
    sideBarY + 1 * incr,
    sideBarIconSize,
    sideBarIconSize
  );
  //bot 3
  image(
    bots[3].pic,
    sideBarX,
    sideBarY + 2 * incr,
    sideBarIconSize,
    sideBarIconSize
  );
  //bot 4
  image(
    bots[4].pic,
    sideBarX,
    sideBarY + 3 * incr,
    sideBarIconSize,
    sideBarIconSize
  );
  //bot 5
  image(
    bots[5].pic,
    sideBarX,
    sideBarY + 4 * incr,
    sideBarIconSize,
    sideBarIconSize
  );

  rectMode(CORNER);

  //chat box
  fill(166, 178, 211);
  noStroke();
  rect(x + sideL + 20, height * 0.15, width * 0.75, height * 0.725, 5);

  //menu bar box
  noStroke();
  fill(102, 118, 157, 100);
  rect(x + sideL + 20, height * 0.15, width * 0.75, height * 0.09, 5);

  //menu bar pfp
  imageMode(CENTER);
  image(
    currentBot,
    x + sideL + 55,
    height * 0.195,
    height * 0.0775,
    height * 0.0775
  );

  //menu bar descr
  textAlign(LEFT);

  fill(66, 77, 105);
  textSize(height * 0.04);
  text(bots[CareLevel].displayName, x + sideL + 85, height * 0.1775);

  fill(66, 77, 105, 175);
  textSize(height * 0.025);
  text("active now", x + sideL + 85, height * 0.215);

  fill(160, 222, 193);
  ellipseMode(CENTER);
  ellipse(x + sideL + 150, height * 0.22, height * 0.015, height * 0.015);

  //menu bar icons
  image(
    phonePic,
    x + sideL + width * 0.75 - 40,
    height * 0.2,
    height * 0.05,
    height * 0.05
  );

  image(
    ellipsePic,
    x + sideL + width * 0.75 - 5,
    height * 0.2,
    height * 0.04,
    height * 0.04
  );

  //display messages
  showMsgs();
  if (responding == true) {
    loadAnim();
  } else {
    stopAnim();
  }

  //reformats screen for screencapture
  if (score >= limit || msgY > 0.785) {
    prepScreenshot();
    //sounds
    if (typingSound.isPlaying()) typingSound.stop();
    endSound.play();
    setTimeout(() => {
      gamestate = "end";
    }, 120);
  }
}

function endScreen() {
  achvBtn.hide();
  backBtn.hide();
  restartBtn.show();
  startBtn.hide();
  saveBtn.show();
  chatBtn.hide();
  sendBtn.hide();
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

  image(
    homeBot,
    width - height * 0.35,
    height * 0.65,
    height * 0.35,
    height * 0.35
  );

  //for testing screencap
  // background(0);
  // image(chatPic, width * 0.1, 0);
}

//////////////////////////MSG FUNCTIONS/////////////////////
function prepScreenshot() {
  push();
  dotColor.setAlpha(0);

  let chatBoxStart = width * 0.02 + width * 0.15 + 20;
  let chatBoxEnd = chatBoxStart + width * 0.75;
  let chatBoxHalf = (chatBoxEnd - chatBoxStart) / 2;

  translate(chatBoxStart + chatBoxHalf, height * 0.035);
  textAlign(CENTER);
  textSize(height * 0.065);
  fill(195, 232, 222);
  text("care-bot", 0, 0);

  textSize(height * 0.025);
  fill(213, 220, 240);
  text(month() + "/" + day() + "/" + year() + " @ " + getTime(), 0, 30);

  textSize(height * 0.025);
  fill(213, 220, 240);
  text("care level: " + CareLevel, 0, 50);

  chatPic = get(chatBoxStart, 0, chatBoxEnd - chatBoxStart, height * 0.875);
  pop();
}

function getTime() {
  return hour() + ":" + minute() + ":" + second();
}

function respond(msg) {
  let rand = int(random(0, 10));
  if (gamestate === "chat") notifSound.play();
  return new Msg(getTime(), bots[CareLevel].responses[rand], chatbot);
}

function reformatTxt(msg) {
  msgL = 1;
  let reformatted = "";
  let prev = 0;
  let counter = 1;
  for (let i = 0; i < msg.length; i++) {
    let current = msg.substring(i, i + 1);
    //last line
    if (msg.length - i <= 18) {
      reformatted += msg.substring(prev, msg.length).trim();
      // console.log(
      //   `LAST LINE: i = ${i} counter = ${counter} reformatted = ${reformatted}`
      // );
      break;
    }
    //another line needed
    else if (counter >= 18 && msg.substring(i, i + 1) == " ") {
      let temp = msg.substring(prev, i);
      reformatted += temp.trim() + "\n";
      // console.log(`NEW LINE: i = ${i} count = ${counter} prev = ${prev} `);
      counter = 0;
      prev = i;
      msgL += 0.5;
      counter++;
    }
    //middle of line
    else {
      //console.log(`MIDDLE OF LINE: i = ${i} counter = ${counter}`);
      counter++;
      continue;
    }
  }
  console.log(reformatted);
  return reformatted;
}

function getMsg() {
  msg = inp.value();
  let current = new Msg(getTime(), msg, "user");
  msgs[mi] = current;
  mi++;
  score++;
  responding = true;
  dotColor.setAlpha(255);
  typingSound.play();

  //test for achvmt
  testAchv(current);

  //bot response
  let t = int(random(1500, 5450));
  setTimeout(() => {
    msgs[mi] = respond(msg);
    mi++;
    typingSound.stop();
    responding = false;
  }, t);
}

function showMsgs() {
  for (let i = 0; i < mi; i++) {
    msgs[i].display(msgY);
    msgY += 0.04; //spaces between msg boxes
  }
}

function updatePic() {
  // console.log(`UPDATEPIC: carelvl = ${CareLevel}`);
  // console.log(`UPDATEPIC: pic = ${bots[CareLevel].pic}`);
  currentBot = loadImage("assets/care" + CareLevel + ".png");
  currentLvl = CareLevel;
  swooshSound.play();
  swooshSound.setVolume(0.5);
}

//////////////////////////ANIMATION FUNCTIONS////////////////

//LOADING ANIMATION: https://editor.p5js.org/black/sketches/HJbGfpCvM
function loadAnim() {
  push();
  // console.log("animating");
  let x = width * 0.02 + width * 0.15 + 30;
  translate(x, height * 0.84);
  fill(dotColor);

  textAlign(LEFT);
  textSize(height * 0.03);
  text("CB is typing", 0, 0);

  translate(100, 0);
  noStroke();
  ellipse(15 * sin(radians(k)), 0, 6 * cos(radians(m)), 6 * cos(radians(m)));
  ellipse(
    15 * sin(radians(k) + PI / 3),
    0,
    6 * cos(radians(m) + PI / 3),
    6 * cos(radians(m) + PI / 3)
  );
  ellipse(
    15 * sin(radians(k) + PI / 6),
    0,
    6 * cos(radians(m) + PI / 6),
    6 * cos(radians(m) + PI / 6)
  );
  if (k < 180) {
    k += 2;
    if (90 < k) {
      if (m < 180) m += 4;
      else m = 0;
    }
  } else {
    k = 0;
    m = 0;
  }
  pop();
}

function stopAnim() {
  dotColor.setAlpha(0);
}

//////////////////////////GAME STATE FUNCTIONS////////////////
function startGame() {
  clickSound.play();
  gamestate = "instr";
}

function startChat() {
  clickSound.play();
  gamestate = "chat";
}

function viewArtStmt() {
  clickSound.play();
  gamestate = "artstmt";
}

function reset() {
  clickSound.play();
  gamestate = "home";
  score = 0;
  msgs = [];
  mi = 0;
}

function viewAchv() {
  clickSound.play();
  gamestate = "achv";
}

function testAchv(msg) {
  //meanie
  for (let i = 0; i < meanieRec.length; i++) {
    if (msg.msg.includes(meanieRec[i])) {
      meanie.unlock();
      let notif = new Notification(meanie);
      notif.display();
      break;
    }
  }
  //bff
  for (let i = 0; i < bffRec.length; i++) {
    if (msg.msg.includes(bffRec[i])) {
      bff.unlock();
      let notif = new Notification(bff);
      notif.display();
      break;
    }
  }
  //botception
  for (let i = 0; i < botceptionRec.length; i++) {
    if (msg.msg.includes(botceptionRec[i])) {
      botception.unlock();
      let notif = new Notification(botception);
      notif.display();
      break;
    }
  }
  //emo
  for (let i = 0; i < emoRec.length; i++) {
    if (msg.msg.includes(emoRec[i])) {
      emo.unlock();
      let notif = new Notification(emo);
      notif.display();
      break;
    }
  }
  //weirdo
  for (let i = 0; i < weirdoRec.length; i++) {
    if (msg.msg.includes(weirdoRec[i])) {
      weirdo.unlock();
      let notif = new Notification(weirdo);
      notif.display();
      break;
    }
  }
}

//////////////////////////CLASSES//////////////////////////
class Msg {
  constructor(time, msg, sender) {
    this.time = time;
    this.msg = msg;
    this.sender = sender;
  }

  display(y) {
    textFont(neucha);
    rectMode(CORNER);

    //layout vars
    let x = width * 0.02 + width * 0.15 + 55;

    //reformat msg + update msgL
    let r = reformatTxt(this.msg);

    //display measurements
    let msgBoxHeight = msgL * height * 0.05;
    let msgBoxCenter = msgBoxHeight * 0.5;

    //console.log(`msgBoxHeight = ${msgBoxHeight}`);

    if (this.sender === "user") {
      //msg label
      fill(213, 220, 240);
      textAlign(RIGHT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, width * 0.87, height * y);

      //pfp
      imageMode(CENTER);
      image(
        playerPic,
        width * 0.91,
        height * (y + 0.04),
        height * 0.065,
        height * 0.065
      );

      //msg box
      let diff = width * 0.91 - 175 - 26.5;
      noStroke();
      fill(223, 240, 235);
      rect(diff, height * (y + 0.015), 175, msgBoxHeight, 5);

      //msg
      fill(66, 77, 105);
      textAlign(RIGHT);
      textSize(height * 0.02);
      text(r, diff + 175 - 5, height * (y + 0.015) + msgBoxCenter);
    } else {
      //msg label
      fill(213, 220, 240);
      textAlign(LEFT);
      textSize(height * 0.018);
      text(this.time + " | " + this.sender, x + 30, height * y);

      //pfp
      imageMode(CENTER);
      image(currentBot, x, height * (y + 0.04), height * 0.065, height * 0.065);

      //msg box
      noStroke();
      fill(213, 220, 240);
      rect(x + 30, height * (y + 0.015), 175, msgBoxHeight, 5);

      //msg
      fill(102, 118, 157);
      textAlign(LEFT);
      textSize(height * 0.02);
      text(r, x + 37, height * (y + 0.015) + msgBoxCenter);
    }
    msgY += msgL * 0.03 + 0.01;
  }
}

class Notification {
  constructor(achvmt) {
    this.achvmt = achvmt;
  }

  display() {
    unlockSound.play();
    unlockSound.play();
    alert(
      `"${this.achvmt.title}" unlocked!\ngo to the achievement's page to check it out`
    );
    // fill();
  }
}

class Achvmt {
  constructor(title, descr, img, state) {
    this.title = title;
    this.descr = descr;
    this.img = img;
    this.state = state;
  }

  //shows achievement on screen
  display(x, y) {
    let boxLength = height * 0.34;
    let boxHeight = height * 0.28;
    if (this.state === "locked") {
      textFont(neucha);

      //achvmt box
      noStroke();
      fill(102, 118, 157);
      rect(x, y, boxLength, boxHeight, 10);

      //achvmt title
      textSize(height * 0.04);
      fill(66, 77, 105);
      text(this.title, x + boxLength * 0.5, y + boxHeight * 0.15);

      //achvmt img
      imageMode(CENTER);
      lockedPic.resize(height * 0.085, 0);
      image(lockedPic, x + boxLength * 0.5, y + boxHeight * 0.45);

      //achvmt descr
      textSize(height * 0.035);
      fill(213, 220, 240);
      text("[redacted]", x + boxLength * 0.5, y + boxHeight * 0.75);
    } else {
      textFont(neucha);
      //achvmt box
      noStroke();
      fill(166, 178, 211);
      rect(x, y, boxLength, boxHeight, 10);

      //achvmt title
      textSize(height * 0.04);
      fill(66, 77, 105);
      text(this.title, x + boxLength * 0.5, y + boxHeight * 0.15);

      //achvmt img
      this.img.resize(height * 0.075, 0);
      image(this.img, x + boxLength * 0.5, y + boxHeight * 0.45);

      //achvmt descr
      textSize(height * 0.023);
      fill(102, 118, 157);
      text(this.descr, x + boxLength * 0.5, y + boxHeight * 0.75);
    }
  }

  //unlocks achievement w/ notif
  unlock() {
    this.state = "unlocked";
  }

  //locks achivement
  lock() {
    this.state = "locked";
  }
}
