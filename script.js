/*-- CHROME --*/
// this variable gives each table cell an index
var id = 0;
function createTbl() {
	// get the reference to the table
	var tbl = document.getElementById("tbl");

	// nested loop starts
	// row
	for (var r = 0; r < 8; r++) {

		// we create the table rows
		var row = document.createElement("tr");

		// this loop handles the columns
		for(var c = 0; c < 8; c++) {
			// we create the table cells, with the td element
			var cell = document.createElement("td");
			// give the cells 20  pixels
			cell.width = "30px";
			cell.height = "30px";
			// set the cells index, increment the variable each turn in the loop
			cell.id = id++;
			// here is a thing you can do to color the cells, the black cells can for example be game object
			// we us the modulo operator
			// for every even index - color the cell black
			cell.style.backgroundColor = "#333333";
			cell.style.color = "white";
			// here we append the cell to the rows
			row.appendChild(cell);
			// set the index as the cells innerHTML
			cell.innerHTML = obstacles[id];
		}
		// appends the rows to the table
		tbl.appendChild(row);
	}
}

// Sort the obstacles array
var txt = ["P1", "P2", "S", "G"];

var obstacles = new Array(10);
for(var i = 0; i < 10; i++){
    obstacles[i] = Math.floor(Math.random() * 2);
    if(obstacles[i] === 1){
        obstacles[i] = 'W';
    }
    else{
        obstacles[i] = 'C';
    }
}
// Merge options & obstacles
Array.prototype.push.apply(obstacles, txt);
// var adventurer = 'A';
// obstacles.push(adventurer);

var space = new Array(50)
for(var i = 0; i <= 50; i++){
    space[i] = " ";
}
var index;
var newArray;
// Merge obstacles & spaces
Array.prototype.push.apply(obstacles, space);

// Randomly sort obstacles array
obstacles.sort(function(a, b){return 0.5 - Math.random()});

// Looks for "S" to start the game
function checkA(obstacles){
	return obstacles === "S";
}

function findA() {
	index = obstacles.findIndex(checkA);
	newArray = obstacles;
	// console.log("newArray: " + newArray);
	// console.log("index in new array:" + index);
}
    
/*-- Global variables --*/
findA();
var pos = index - 1;
var aPos = pos;
var left = aPos - 1;
var right = aPos + 1;
var up = aPos - 8;
var down = index + 7;

function updateLoc() {
	$(document).ready(function(){
		$("#location").text(aPos);
	});
}

function history() { 
	$(document).ready(function() {
		$("#history").text(mHistory);
	});
}

function action() {
	$(document).ready(function() {
		$("#action").text(mAction);
	});
}

function theQuest() {
	$(document).ready(function(){
		$("#quest").text(quest);
	});
}
multiboard();
var board;
function multiboard(){
	var counter = 0;
	board = new Array();
	var max = 8;
	console.log("Obstacles: " + obstacles);
	for(var i = 0; i < max; i++){
		board[i] = new Array();
		for(var j = 0; j < max; j++){
			board[i][j] = obstacles[counter];
			counter++;
		}
	}
	
}
console.log(board);


/*--- Buttons and jQuery----*/
var next = "'#" + aPos + "'";
console.log("next: " + next);
var text;

// When navigation buttons are clicked:
$(document).ready(function() {
	$("button").click(function(){
		text = $(this).text();
		position();
		$(moveCheck).css('background-color', '#FFFFFF');
		$(moveCheck).css('color', 'black');
	});
});
$(document).ready(function() {
	// $(moveCheck).css
});
/**-- Global variables --*/
var moveCheck;	// jquery to check td id
var currPos; // current position of the adventurer
var moves; // array where the history will be pushed	
updateLoc();
findA();
function position(){
	
	history();
	action();
	theQuest();
	switch(text.toUpperCase()){
		case "LEFT":
			if((aPos% 8 - 1) < 0){
				aPos = currPos;
			}
			else{
				left = aPos - 1;
				currPos = left;
				moveCheck = "#" + leftCheck();
				aPos = currPos;
				obs();
			}
			break;
		case 'RIGHT':
			if((aPos % 8) + 1 === 8){
				aPos = currPos;
			}
			else {
				right = aPos + 1;
				currPos = right;
				moveCheck = "#" + rightCheck();
				aPos = currPos;
				obs();
			}
			break;
		case 'UP':
			if((aPos - 8) < 0){
				aPos = currPos;
			}
			else{
				up = aPos - 8;
				currPos = up;
				moveCheck = "#" + upCheck();
				aPos = currPos;
				obs();
			}
			break;
		case "DOWN":
			if((aPos + 8) > 64){
				aPos = currPos;
			}
			else{
				down = aPos + 8; 
				currPos = down;
				moveCheck = "#" + downCheck();
				aPos = currPos;
				obs();
			}
			break;
		default:
			return confirm("ERROR! (l, r, d, u)");
			break;
	}
	
}

function leftCheck() {
	if((left < 0 || left === "undefined" || ((left % 8) + 1) > 7)){	// || left === "undefined" || ((left % 8) + 1) > 7
		console.log(left%8 - 1);
		console.log('ERROR');
		return text = "error";
	}
	// if(board[left%7][(left%8) -1] === "undefined"){
	// 	console.log("board: " + board[left%7][(left%8) -1]);
	// 	return aPos;
	// }
	else{
		console.log("Next left tile: " + left);
		return aPos = left;
	}
}

function rightCheck() {
	if((right % 8 + 1) === 0|| right === "undefined") {
		return text = "error";
	}
	else{
		console.log("right curr aPos: " + right);
		return aPos = right;
	}
}

function upCheck() {
	if(up < 0 || up === "undefined") {
		return text = "error";
	}
	else{
		console.log("up curr aPos: " + aPos);
		return aPos = up;
	}
}

function downCheck() {
	if(down > 64 || down === "undefined") {
		return text="error";
	}
	else{
		console.log("down currPos: " + down);
		return currPos = down;
	}
}

/*-- Global variables --*/
var mHistory = new Array();	// saves adventurer moves 
var mAction;	// updates action display on HTML
var isGameOver = false;
var quest = [];	// 
var loot = []

function obs(){
	switch($(moveCheck).text()){
		case "W":
			// $(moveCheck).css('color', 'black');
			mAction	= "You hit a wall!!";
			action();
			if(text.toUpperCase() === "RIGHT"){
				aPos = aPos - 1;
			}
			else if(text.toUpperCase() === "LEFT"){
				aPos = aPos + 1;
			}
			else if(text.toUpperCase() === "UP"){
				aPos = aPos + 8;
			}
			else{
				aPos = aPos - 8;
			}
			console.log("hit wall, go back to: " + aPos);
			mHistory.push(" "+aPos + " ");
			break;
		case "C":
			mAction	= "Monster Approaching!!"
			change();
			action();
			fightMonster();
			mHistory.push(" "+aPos + " ");
			break;
		case "P1":
			mAction = "Prize 1: Fruit of Origin obtained!";
			quest.push(mAction);
			change();
			gameOver();
			action();
			mHistory.push(" "+aPos + " ");
			break;
		case "P2":
			mAction = "Prize 2: Elixir obtained!";
			quest.push(mAction);
			gameOver();
			mHistory.push(" "+aPos + " ");
			break;
		case "G":
			gameOver();
			break;
		case " ":
			$(moveCheck).text("");
			mAction = "You moved to a space";
			mHistory.push(" "+aPos + " ");
			break;
		case "S":
			mAction = "This is the Starting point!";
			$(moveCheck).text(" ");
			mHistory.push(" "+aPos + " ");
			break;
		default:
			mAction = "You Reached the Border";
			break;
	}
}

function change(){
	if($(moveCheck).text() === "W"){
		$(document).ready(function() {
		$(moveCheck).css('background-color', 'white');
		$("#action").css('color', 'red');
	});
	}
	else{
		$(document).ready(function() {
		$(moveCheck).css('background-color', 'white');
		$(moveCheck).css('color', 'white');
	});
	}
	
}

/** Fight Monster*/
var monsters = [];
monsters[0] = {name: "Goblin", pts: 5, prize: "Leaf of Life"};
monsters[1] = {name: "Ogre", pts: 10, prize: "Small Mana Potion"};
monsters[2] = {name: "Dire Wolf", pts: 10, prize: "Fruit of Origin"};
monsters[3] = {name: "Rat-Man", pts: 15, prize: "Luck Potion"};
monsters[4] = {name: "Skeleton", pts: 20, prize: "8-Slot Bag"};

var random, pMonster;
function fightMonster(){
	random = Math.floor(Math.random() * 5);
	var getMonster = monsters[random];
	pMonster = monsters[random].prize;
	loot.push(pMonster);
	$(document).ready(function() {
		$("#name").text("Monster: " + getMonster.name);
		$("#mPts").text("Hit Points: " + getMonster.pts);
		$("#mPrize").text("Prize: " + getMonster.prize);
		$("#loot").text(loot);
	});
}

function gameOver() {
	if(quest.length === 2){
		isGameOver = true;
		mAction = "You Won!!";
	}
	else{
		!isGameOver;
		mAction = "Quest incomplete! try to obtain 2 prizes"
	}
}

/*-- CSS --*/
$(document).ready(function(){
	$('body').css('vertical-align', 'middle');
	$("#tbl").css('border-radius', 5);
	$("#tbl").css('text-align', "center");
	$("p").css('font-weight', 'bolder');
	$("span").css('color', '#353232');
	$("span").css('font-weight', 'normal');
	$("span").css('font-size', '1em');
});
