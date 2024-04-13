// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
      }
      let gameType = this.getAttribute("data-type");
      runGame(gameType);
    });
  }

  document
    .getElementById("answer-box")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the users answer has been processed
 */

const runGame = (gameType) => {
  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").focus();

  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  let num3, num4;

  do {
    num3 = Math.floor(Math.random() * 25) + 1;
    num4 = Math.floor(Math.random() * 10) + 1;
  } while (num3 % num4 !== 0 || num3 === num4 || num3 < num4);

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivisionQuestion(num3, num4);
  } else {
    alert(`Unknown Game Type: ${gameType}`);
    throw `Unknown Game Type: ${gameType}, Aborting!`;
  }
};

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */

const checkAnswer = () => {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];
  if (isCorrect) {
    alert("Hey! You got it right! :D");
    incrementScore();
  } else {
    alert(
      `Awww... you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}! `
    );
    incrementWrongAnswer();
  }
  runGame(calculatedAnswer[1]);
};

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
 */
const calculateCorrectAnswer = () => {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } else if (operator === "-") {
    return [operand1 - operand2, "subtract"];
  } else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  } else if (operator === "/") {
    return [Math.floor(operand1 / operand2), "division"];
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting! `;
  }
};

/**
 * Gets the current score from the DOM and increments it by 1
 */

const incrementScore = () => {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
};

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */

const incrementWrongAnswer = () => {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
};

const displayAdditionQuestion = (operand1, operand2) => {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
};

const displaySubtractQuestion = (operand1, operand2) => {
  document.getElementById("operand1").textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
};

const displayMultiplyQuestion = (operand1, operand2) => {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
};

const displayDivisionQuestion = (operand1, operand2) => {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "/";
};
