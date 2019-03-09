const canvas = document.getElementById("main canvas");
const ctx = canvas.getContext("2d");
const backCanvas = document.getElementById("back canvas")
const Bctx = backCanvas.getContext("2d");

const music = document.getElementById("myAudio");
const startMusic = document.getElementById("start music");
const endMusic = document.getElementById("end music");

ctx.fillstyle = '#000000';

// the amount in pixels it moves every time you click it
let speed = 15;

//num of px(on screen) in a px(on game)
const pxNum = 5;

const BGsizex = 1200;
const BGsizey = 750;

const centerX = BGsizex / 2;
const centerY = BGsizey / 2;

// which frame it's on
let frameNum = 0;

let swordFrame = -1;
//images

//'game' = moving backgound and stuff
//'loading' = what do u think
//'start?' = titleScreen shown, if start(unicode 13) is pressed,
//  then go to game
let BGstats = 'loading';

//moves
const linkUp = document.getElementById("playerUp");
const linkDown = document.getElementById("playerDown");
const linkLeft = document.getElementById("playerLeft");
const linkRight = document.getElementById("playerRight");

//sheilds
const shield = document.getElementById("shield");

//swords
const swordUp = document.getElementById("sword up");
const swordDown = document.getElementById("sword down");
const swordLeft = document.getElementById("sword left");
const swordRight = document.getElementById("sword right");

//BG
const bounderies = document.getElementById("bounderies");
const background = document.getElementById("background");
const titleScreen = document.getElementById("title screen");

//swordswing
const swordswingDown = document.getElementById("swordswing down");
const swordswingLeft = document.getElementById("swordswing left");
const swordswingRight = document.getElementById("swordswing right");
const swordswingUp = document.getElementById("swordswing up");
//letter
var letterList = {
	'a': document.getElementById('letterA'),
	'b': document.getElementById('letterB'),
	'c': document.getElementById('letterC'),
	'd': document.getElementById('letterD'),
	'e': document.getElementById('letterE'),
	'f': document.getElementById('letterF'),
	'g': document.getElementById('letterG'),
	'h': document.getElementById('letterH'),
	'i': document.getElementById('letterI'),
	'j': document.getElementById('letterJ'),
	'k': document.getElementById('letterK'),
	'l': document.getElementById('letterL'),
	'm': document.getElementById('letterM'),
	'n': document.getElementById('letterN'),
	'o': document.getElementById('letterO'),
	'p': document.getElementById('letterP'),
	'q': document.getElementById('letterQ'),
	'r': document.getElementById('letterR'),
	's': document.getElementById('letterS'),
	't': document.getElementById('letterT'),
	'u': document.getElementById('letterU'),
	'v': document.getElementById('letterV'),
	'w': document.getElementById('letterW'),
	'x': document.getElementById('letterX'),
	'y': document.getElementById('letterY'),
	'z': document.getElementById('letterZ'),
}

// make sure to -1 while using because the print pos
// is top left
// this times the size of each section = bottom right
// corner of the section.
const spawnPointx = -833;
const spawnPointy = -1150;

//player postion
let playerX = 0;
let playerY = 0;

let direct = 0;

// the letters to be printed
var letterPrint = [];

// 1 = on 0 = not on 2 = was the last to be pressed
var currentKey = {
	//start button
	// return
	'13': false,
	//move buttons
	'222': false,
	'76': false,
	'80': false,
	'186': false,
	//swordswing button
	// "s"
	'83': false,
	// select button (space)
	'32': false,
	//Y button, (w);
	'119': false,
	//A button, (w)
	'100': false,

};

// when button uo it resets the unicode number to Null.
const handleKeyUp = e => {
	if (currentKey[222] == 1) { currentKey[222] = 2 };
	if (currentKey[76] == 1) { currentKey[76] = 2 };
	if (currentKey[80] == 1) { currentKey[80] = 2 };
	if (currentKey[186] == 1) { currentKey[186] = 2 };

	if (currentKey[222] == 2) { currentKey[222] = 0 };
	if (currentKey[76] == 2) { currentKey[76] = 0 };
	if (currentKey[80] == 2) { currentKey[80] = 0 };
	if (currentKey[186] == 2) { currentKey[186] = 0 };

	currentKey[83] = 0;
	currentKey[13] = 0;
	frameNum = 0;
}

// when button down sets the unicode to the button pressed.
const handleKeyDown = e => {
	currentKey[e.keyCode] = 1;
	// up = p left = l right = ' down = ;'
	if (e.keyCode === 83)
		swordFrame = 0;

};

//draws the spawnPoint + the amount of buttons pressed
const drawBG = () => {

	if (BGstats === 'game') {
		imgx = spawnPointx * pxNum + playerX;
		imgy = spawnPointy * pxNum + playerY;


		//draw the bounderies skin first.
		Bctx.drawImage(bounderies, imgx, imgy,
			4109 * pxNum, 4110 * pxNum);

		ctx.drawImage(background, imgx, imgy,
			4109 * pxNum, 4110 * pxNum);
	} else {
		return;
	}
};

const startScreen = () => {
	ctx.drawImage(titleScreen, 0, 0, BGsizex, BGsizey);
	BGstats = 'start?';
};

//calls every 33 milliseconds 
//reacts to the buttons you are pressing.
const mainLoop = () => {
	console.log(BGstats)
	if (BGstats === 'game') {

		let lastPlayerX = playerX;
		let lastPlayerY = playerY;
		console.log(playerX);
		//left
		if (currentKey[76] === 1) {
			playerX += speed;
			direct = 3;
			frameNum += 1;
			if (frameNum > 9 - 1) { frameNum = 0 }
		}
		// right
		if (currentKey[222] === 1) {
			playerX -= speed;
			direct = 4;
			frameNum += 1;
			if (frameNum > 9 - 1) { frameNum = 0 }
		}
		//up
		if (currentKey[80] === 1) {
			playerY += speed;
			direct = 1;
			frameNum += 1;
			if (frameNum > 9 - 1) { frameNum = 0 }
		}
		// down
		if (currentKey[186] === 1) {
			playerY -= speed;
			direct = 2;
			frameNum += 1;
			if (frameNum > 9 - 1) { frameNum = 0 }
		}

		drawBG();
		if (boundCheck() == false) {
			playerX = lastPlayerX;
			playerY = lastPlayerY;
			drawBG();
		}

		drawPlayer();
		drawShield();
		drawSword();

	}

	//start
	if (BGstats === 'start?') {
		startScreen();
		if (currentKey[13] === 1) {
			BGstats = 'game';
		}
	}
	if (BGstats === 'loading') {
        writeWord('loading', 600, 600)
	}
}

const drawPlayer = () => {
	//left
	if (direct === 3) {
		// the - 17*pxNum/2 part is because the image
		// is being drawn on the top left coner
		imgx = centerX - 17 * pxNum / 2;
		imgy = centerY - 25 * pxNum / 2;
		// total - (size of each frame)*framenum
		if (swordFrame === -1) {
			ctx.drawImage(linkLeft, 160 - (17 + 1) * (frameNum + 1),
				1, 17, 25, imgx, imgy, 17 * pxNum, 25 * pxNum);
			return;
		}
		imgx = centerX - 23 * pxNum / 2;
		imgy = centerY - 23 * pxNum / 2;
		if (swordFrame < 5) {
			ctx.drawImage(swordswingLeft, 121 - (23 + 1) * (swordFrame + 1),
				1, 23, 23, imgx, imgy, 23 * pxNum, 23 * pxNum);
		} else {
			ctx.drawImage(swordswingLeft, 1, 1, 23, 23, imgx, imgy, 23 * pxNum, 23 * pxNum);
		}
	}
	// right
	if (direct === 4) {
		imgx = centerX - 17 * pxNum / 2;
		imgy = centerY - 25 * pxNum / 2;

		if (swordFrame === -1) {
			ctx.drawImage(linkRight, (17 * frameNum) + (1 * frameNum) + 1,
				1, 16, 25, imgx, imgy, 16 * pxNum, 25 * pxNum);
			return;
		} else if (swordFrame) {
			ctx.drawImage(swordswingRight, (23 * frameNum) + (1 * frameNum) + 1,
				1, 23, 23, imgx, imgy, 23 * pxNum, 23 * pxNum);
		} else {
			ctx.drawImage(swordswingRight, 97, 1, 23, 23, imgx, imgy,
				23 * pxNum, 23 * pxNum);
		}
	}
	//up
	if (direct === 1) {
		imgx = centerX - 16 * pxNum / 2;
		imgy = centerY - 26 * pxNum / 2;

		if (swordFrame === -1) {
			ctx.drawImage(linkUp, (16 * frameNum) + (1 * frameNum) + 1,
				1, 16, 26,
				imgx, imgy, 16 * pxNum, 26 * pxNum);
			return;
		} else if (swordFrame < 5) {
			ctx.drawImage(swordswingUp, (16 * swordFrame) + (1 * swordFrame) + 1,
				1, 16, 29, imgx, imgy, 16 * pxNum, 29 * pxNum);
		} else {
			ctx.drawImage(swordswingUp, 69, 1, 16, 29, imgx, imgy,
				16 * pxNum, 29 * pxNum);
		}
	}
	// down
	if (direct === 2) {
		imgx = centerX - 16 * pxNum / 2;
		imgy = centerY - 26 * pxNum / 2;
		//width * frame num + 1(gap between the frames) * 
		// frame num + 1 (becuase if the frame num = 0 it's
		// not going to add the 1
		if (swordFrame === -1) {
			ctx.drawImage(linkDown, (16 * frameNum) + (1 * frameNum) + 1,
				1, 16, 26, imgx, imgy, 16 * pxNum, 26 * pxNum);
		} else if (swordFrame > 5) {
			imgx = centerX - 16 * pxNum / 2;
			imgy = centerY - 24 * pxNum / 2;
			ctx.drawImage(swordswingDown, (16 * frameNum) + (1 * frameNum) + 1,
				1, 16, 24, imgx, imgy, 16 * pxNum, 24 * pxNum);
		} else {
			ctx.drawImage(swordswingDown, 69, 1, 16, 24,
				imgx, imgy, 16 * pxNum, 24 * pxNum);
		}

	}
}

//draws the sheild, called every time main loop is called
const drawShield = () => {
	switch (direct) {
		// 1 = up 2 = down 3 = left 4 = right
		case 1:
			if (swordFrame > -1) {
				imgx += 9 * pxNum;
				imgy += 5 * pxNum;
				ctx.drawImage(shield, 35, 1, 16, 16, imgx, imgy,
					16 * pxNum, 16 * pxNum);
			}
			break;
		case 2:
			if (swordFrame === -1) {
				imgx += -4 * pxNum;
				imgy += 10 * pxNum;
				ctx.drawImage(shield, 18, 1, 16, 16, imgx, imgy,
					16 * pxNum, 16 * pxNum);
			} else {
				imgx -= 10 * pxNum;
				imgy += 5 * pxNum;
				ctx.drawImage(shield, 1, 1, 16, 16, imgx, imgy,
					16 * pxNum, 16 * pxNum);
			}
			break;
		case 3:
			if (swordFrame === -1) {
				imgx -= 5 * pxNum;
				imgy += 5 * pxNum;
				ctx.drawImage(shield, 1, 1, 16, 16, imgx, imgy,
					16 * pxNum, 16 * pxNum);
			}
			break;

		case 4:
			if (swordFrame === -1) {
				imgx += 9 * pxNum;
				imgy += 5 * pxNum;
				ctx.drawImage(shield, 35, 1, 16, 16, imgx, imgy,
					16 * pxNum, 16 * pxNum);
			}
			break;
	}
}

//draws the sword when the "s" button is pressed
const drawSword = () => {

	if (swordFrame === -1)
		return;
	handleKeyUp();
	currentKey[83] = 1;
	switch (direct) {
		// 1 = up 2 = down 3 = left 4 = right
		case 1:
			imgx = centerX - 100;
			imgy = centerY - 60;
			ctx.drawImage(swordUp, 120 - (16 + 1) * (swordFrame + 1), 1, 16, 16, imgx, imgy,
				16 * pxNum, 16 * pxNum);
			swordFrame += 1;
			if (swordFrame > 7)
				swordFrame = -1;
			drawPlayer();
			break;
		case 2:
			//down
			imgx = centerX + 20;
			imgy = centerY + 10;
			ctx.drawImage(swordDown, (16 + 1) * (swordFrame + 1), 1, 16, 16, imgx, imgy,
				16 * pxNum, 16 * pxNum);
			swordFrame += 1;
			if (swordFrame > 7)
				swordFrame = -1;
			break;
		case 3:
			//left
			imgx = centerX - 100;
			imgy = centerY - 20;
			ctx.drawImage(swordLeft, 1, ((16 * swordFrame) + (1 * (swordFrame + 1))),
				16, 16, imgx, imgy, 16 * pxNum, 16 * pxNum);
			swordFrame += 1;
			if (swordFrame > 7)
				swordFrame = -1;
			break;
		case 4:
			//right
			imgx = centerX + 20;
			imgy = centerY + 20;
			ctx.drawImage(swordRight, 1, ((16 * swordFrame) + (1 * (swordFrame + 1))),
				16, 16, imgx, imgy, 16 * pxNum, 16 * pxNum);
			swordFrame += 1;
			if (swordFrame > 7)
				swordFrame = -1;
			break;
			drawBG();
	}
}

// called every time after main loop is called
// it will check the position of the player and if the position
// color is red, then it means that you can't cross that part
const boundCheck = () => {
	var imgData = Bctx.getImageData(centerX, centerY, 1, 1);

	if (imgData.data[0] == 255) {
		return false;
	}
	return true;
}

const writeWord = (words, posx, posy) => {
	for (i = 0; i < words.length; i++) {
		var letter = words.charAt(i);
		imgx = posx + (8 * i) * pxNum;
		imgy = posy;
		console.log(imgx);
		console.log(letterList[letter]);
		ctx.drawImage(letterList[letter], imgx, imgy, 8 * pxNum, 8 * pxNum);
	}
}

setTimeout(startScreen,10000)
// key down and keyup listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

var timer = setInterval(mainLoop, 33);
