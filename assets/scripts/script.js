let computer = "O";
let currentPlayer = "X";
let playerAmount = "One Player";

let boxStatus = [null, null, null,
				 null, null, null,
				 null, null, null];

// HTML.
const gameboard = document.querySelector(".__gameboard");
const gameBox = Array.from(document.querySelectorAll("._box"));

const newGameButton = document.querySelector(".__buttons ._new-game");
const changePlayerAmountButton = document.querySelector(".__buttons ._player");

function boxClick() {
	const boxId = this.id;

	if (!boxStatus[boxId] && playerAmount == "One Player") {
		boxStatus[boxId] = currentPlayer;
		this.innerText = currentPlayer;

		// If you win.
		if (winCheck(currentPlayer) == true) {
			gameboard.style.pointerEvents = "none";
			return;
		} else {
			aiPlay();
			winCheck(computer);

			// If computer win.
			if (winCheck(computer) == true) {
				gameboard.style.pointerEvents = "none";
				return;
			};
		};
	} else if (!boxStatus[boxId] && playerAmount == "Two Player") {
		boxStatus[boxId] = currentPlayer;
		this.innerHTML = currentPlayer;

		// If one of the 2 player win.
		if (winCheck(currentPlayer)) {
			gameboard.style.pointerEvents = "none";
			return;
		};

		currentPlayer = currentPlayer === "X" ? "O" : "X";
	};

	this.classList.remove("hover-effect_"); // Mouse hover effect.
};

function aiPlay() {
	let randomNumber = Math.floor(Math.random() * 9);
	let hasNull = boxStatus.some(i => i === null);

	if (boxStatus[randomNumber] == null) {
		boxStatus[randomNumber] = computer;
		gameBox[randomNumber].innerText = computer;
	} else if (hasNull) {
		aiPlay();
	};
};

function winCheck(player) {
	const horizontalStrikeOut = `<span class="horizontal-strike-out_"></span>`;
	const verticalStrikeOut = `<span class="vertical-strike-out_"></span>`;
	const diagonalLeftStrikeOut = `<span class="diagonal-left-strike-out_"></span>`;
	const diagonalRightStrikeOut = `<span class="diagonal-right-strike-out_"></span>`;

	// All winning conditions.
	if (boxStatus[0] == player && boxStatus[1] == player && boxStatus[2] == player) {
		gameBox[1].innerHTML += horizontalStrikeOut;
		return true;
	} else if (boxStatus[0] == player && boxStatus[3] == player && boxStatus[6] == player) {
		gameBox[3].innerHTML += verticalStrikeOut;
		return true;
	} else if (boxStatus[0] == player && boxStatus[4] == player && boxStatus[8] == player) {
		gameBox[4].innerHTML += diagonalLeftStrikeOut;
		return true;
	} else if (boxStatus[8] == player && boxStatus[5] == player && boxStatus[2] == player) {
		gameBox[5].innerHTML += verticalStrikeOut;
		return true;
	} else if (boxStatus[8] == player && boxStatus[7] == player && boxStatus[6] == player) {
		gameBox[7].innerHTML += horizontalStrikeOut;
		return true;
	} else if (boxStatus[4] == player && boxStatus[1] == player && boxStatus[7] == player) {
		gameBox[4].innerHTML += verticalStrikeOut;
		return true;
	} else if (boxStatus[4] == player && boxStatus[3] == player && boxStatus[5] == player) {
		gameBox[4].innerHTML += horizontalStrikeOut;
		return true;
	} else if (boxStatus[4] == player && boxStatus[2] == player && boxStatus[6] == player) {
		gameBox[4].innerHTML += diagonalRightStrikeOut;
		return true;
	};

	// Check if tie.
	let hasNull = boxStatus.some(i => i === null);
	if (!hasNull) {
		return true;
	};
};

function changePlayerAmount() {
	if (playerAmount == "One Player") {
		playerAmount = "Two Player";
		changePlayerAmountButton.innerText = "One Player";
	} else if (playerAmount == "Two Player") {
		playerAmount = "One Player";
		changePlayerAmountButton.innerText = "Two Player";
	};

	newGame();
};

function newGame() {
	currentPlayer = "X";

	boxStatus = [null, null, null,
			   	 null, null, null,
			     null, null, null];

	gameBox.forEach(box => {	
		box.innerText = "";
		gameboard.style.pointerEvents = "auto";
	});
};

newGameButton.addEventListener("click", newGame);
changePlayerAmountButton.addEventListener("click", changePlayerAmount);
gameBox.forEach((box, index) => {
	box.addEventListener("click", boxClick);

	// Mouse hover effect.
	box.addEventListener("mouseover", () => {
		if (!boxStatus[index]) {
			const root = document.querySelector(":root");
			root.style.setProperty("--box-hover", `'${currentPlayer}'`);
			box.classList.add("hover-effect_");
		};
	});

	box.addEventListener("mouseout", () => box.classList.remove("hover-effect_"));
});