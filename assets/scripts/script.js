let boxStatus = [null, null, null,
				 null, null, null,
				 null, null, null];

const playerX = "X";
const playerO = "O";
const computer = playerO;
let currentPlayer = playerX;

let gameMode = "Multiplayer";

// HTML 1.
const winLose = document.querySelector(".__win-lose");

const gameboard = document.querySelector(".__gameboard");
const gameBox = Array.from(document.querySelectorAll("._box"));

const resetButton = document.querySelector(".__reset button");
const changeModeButton = document.querySelector(".__change-mode button");

// Function.
gameBox.forEach(box => {
	box.addEventListener("click", boxClick);

	// Mouse Hover Effect.
	box.addEventListener("mouseover", (e) => {
		const boxId = e.target.id;

		if (!boxStatus[boxId]) {
			const root = document.querySelector(":root");
			root.style.setProperty("--box-hover", `'${currentPlayer}'`);
			box.classList.add("hover-effect");
		};
	});
	box.addEventListener("mouseout", e => box.classList.remove("hover-effect"));
});

function boxClick(e) {
	const boxId = e.target.id;

	e.target.classList.remove("hover-effect"); // Mouse Hover Effect.

	if (!boxStatus[boxId] && gameMode == "Multiplayer") {
		boxStatus[boxId] = currentPlayer;
		e.target.innerHTML = currentPlayer;

		if (winCheck(currentPlayer)) {
			return;
		};

		winLose.innerText = currentPlayer === playerX ? "Player 2" : "Player 1";
		currentPlayer = currentPlayer === playerX ? playerO : playerX;

	} else if (!boxStatus[boxId] && gameMode == "Singleplayer") {
		boxStatus[boxId] = currentPlayer;
		e.target.innerHTML = currentPlayer;

		if (winCheck(currentPlayer) == true) {
			return;
		} else {
			aiPlay();
			winCheck(computer);
		};
	};
};

function winCheck(player) {
	let winner;

	if (gameMode == "Singleplayer") {
		winner = player === playerX ? "You" : "Computer";
	} else if (gameMode == "Multiplayer") {
		winner = player === playerX ? "Player 1" : "Player 2";
	};

	const horizontalStrikeOut = `<span class="horizontal-strike-out">&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
	const verticalStrikeOut = `<span class="vertical-strike-out">&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
	const diagonalLeftStrikeOut = `<span class="diagonal-left-strike-out">&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
	const diagonalRightStrikeOut = `<span class="diagonal-right-strike-out">&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;

	if (boxStatus[0] == player && boxStatus[1] == player && boxStatus[2] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[1].innerHTML += horizontalStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[0] == player && boxStatus[3] == player && boxStatus[6] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[3].innerHTML += verticalStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[0] == player && boxStatus[4] == player && boxStatus[8] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[4].innerHTML += diagonalLeftStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[8] == player && boxStatus[5] == player && boxStatus[2] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[5].innerHTML += verticalStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[8] == player && boxStatus[7] == player && boxStatus[6] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[7].innerHTML += horizontalStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[4] == player && boxStatus[1] == player && boxStatus[7] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[4].innerHTML += verticalStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[4] == player && boxStatus[3] == player && boxStatus[5] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[4].innerHTML += horizontalStrikeOut;
		scoreIncrease(winner);
		return true;
	} else if (boxStatus[4] == player && boxStatus[2] == player && boxStatus[6] == player) {
		winLose.innerText = `${winner} win`;
		gameboard.style.pointerEvents = "none";

		gameBox[4].innerHTML += diagonalRightStrikeOut;
		scoreIncrease(winner);
		return true;
	};

	// Check if tie.
	let hasNull = boxStatus.some(i => i === null);
	if (!hasNull) {
		winLose.innerText = `Tie`;
		gameboard.style.pointerEvents = "none";
		return true;
	};
};

function resetGame() {
	boxStatus = [null, null, null,
			   	 null, null, null,
			     null, null, null];

	currentPlayer = playerX;

	if (gameMode == "Singleplayer") {
		winLose.innerText = "You are X";
	} else if (gameMode == "Multiplayer") {
		winLose.innerText = "Player 1";
	};

	gameBox.forEach(box => {	
		box.innerText = "";
		gameboard.style.pointerEvents = "auto";
	});
};

resetButton.addEventListener("click", resetGame);

function changeMode() {
	if (gameMode == "Singleplayer") {
		gameMode = "Multiplayer";
		changeModeButton.innerText = "Singleplayer Mode";

		const notice =  document.querySelector(".__notice");
		notice.style.display = "none";

		scoreHeader.innerText = "Multiplayer Score";
		scoreLeft.innerText = "Player 1:";
		scoreRight.innerText = "Player 2:";

		leftNumber.innerText = score.multiplayer.player1;
		rightNumber.innerText = score.multiplayer.player2;
	} else if (gameMode == "Multiplayer") {
		gameMode = "Singleplayer";
		changeModeButton.innerText = "Multiplayer Mode";

		const notice =  document.querySelector(".__notice");
		notice.style.display = "block";

		scoreHeader.innerText = "Singleplayer Score";
		scoreLeft.innerText = "You:";
		scoreRight.innerText = "Computer:";

		leftNumber.innerText = score.singleplayer.you;
		rightNumber.innerText = score.singleplayer.computer;
	};

	resetGame();
};

changeModeButton.addEventListener("click", changeMode);

function aiPlay() {
	let randomNumber = Math.floor(Math.random() * 9);
	let hasNull = boxStatus.some(i => i === null);

	if (boxStatus[randomNumber] == null) {
		boxStatus[randomNumber] = computer;
		gameBox[randomNumber].innerHTML = computer;
	} else if (hasNull) {
		aiPlay();
	};
};



	// Score System & Local Storage. //

let score = {
	multiplayer: {
		player1: 0,
		player2: 0
	},
	singleplayer: {
		you: 0,
		computer: 0
	}
};

// HTML 2.
const scoreContainer = document.querySelector(".__score-system");
const scoreHeader = document.querySelector(".__score-system h1");

const scoreLeft = document.querySelector(".-left span");
const leftNumber = document.querySelectorAll(".number")[0];

const scoreRight = document.querySelector(".-right span");
const rightNumber = document.querySelectorAll(".number")[1];

const resetScoreButton = document.querySelector(".__reset-data button");

// Local Storage.

const storageKey = "Game_Score";

function saveScore() {
	const storageItem = JSON.stringify(score)
	localStorage.setItem(storageKey, storageItem);
};

function loadScore() {
	const storageGet = localStorage.getItem(storageKey);
	let storageParsed = JSON.parse(storageGet);

	if (storageGet != null) {
		score = storageParsed;
		leftNumber.innerText = score.multiplayer.player1;
		rightNumber.innerText = score.multiplayer.player2;
	};
};

function scoreIncrease(winner) {
	if (gameMode == "Multiplayer") {
		if (winner == "Player 1") {
			score.multiplayer.player1++;
			leftNumber.innerText = score.multiplayer.player1;
		} else if (winner == "Player 2") {
			score.multiplayer.player2++;
			rightNumber.innerText = score.multiplayer.player2;
		};
	} else {
		if (winner == "You") {
			score.singleplayer.you++;
			leftNumber.innerText = score.singleplayer.you;
		} else if (winner == "Computer"){
			score.singleplayer.computer++;
			rightNumber.innerText = score.singleplayer.computer;
		};
	};
		saveScore();
};

function resetScore() {
	if (gameMode == "Multiplayer") {
		score.multiplayer.player1 = 0;
		score.multiplayer.player2 = 0;

		leftNumber.innerText = score.multiplayer.player1;
		rightNumber.innerText = score.multiplayer.player2;
	} else {
		score.singleplayer.you = 0;
		score.singleplayer.computer = 0;

		leftNumber.innerText = score.singleplayer.you;
		rightNumber.innerText = score.singleplayer.computer;
	};
		saveScore();
};

resetScoreButton.addEventListener("click", resetScore);

document.addEventListener("DOMContentLoaded", () => {
	loadScore();
});