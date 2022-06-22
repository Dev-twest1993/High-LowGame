// DOM variables
let guess = document.getElementById("inputGuess");
let logic = document.getElementById("logic");
let range = document.getElementById("range");
let btnGuess = document.getElementById("btnGuess");
let card = document.querySelector('.card');

// Guesses array
let guesses = [];

// validate the prompt input
function get_Number(prompt) {
  let valid_input = false;
  let max_number, input;
  while (!valid_input) {
    input = window.prompt(prompt);
    max_number = Number(input);

    if (max_number != NaN && max_number > 0) {
      valid_input = true;
    } else if (max_number <= 0) {
      alert("Please guess a number greater than 0!");
    }
  }
  return max_number;
}

let inputMaxNumber = Math.round(get_Number("Enter the maximum number: "));
console.log(`The maximum number selected is ${inputMaxNumber}`);

let myNumber = Math.floor(Math.random() * inputMaxNumber) + 1;
console.log(`The random number generated is ${myNumber}`);

range.innerHTML = `Guess a number between 1 and ${inputMaxNumber}`;

function checkNumber() {
  if (isNaN(guess.value)) {
    logic.innerHTML = "Please enter a number!";
  }
}

// check if the guess is correct and display result showing the length of the array
// add the for loop to validate any duplicate guesses per Enhanaced instructions
function checkGuess() {
  for (let i = 0; i < guesses.length; i++) {
    if (guess.value == guesses[i]) {
      logic.innerHTML = "You already guessed that number!";
      return;
    }
  }
  if (guess.value == myNumber) {
    guesses.push(guess.value);
    logic.innerHTML = `You guessed the number! It took you ${guesses.length} guesses to guess the number. Your guesses: ${guesses}`;
    document.getElementById("card").style.boxShadow = "0 0 100px  rgb(44, 245, 4)";
  } else if (guess.value % 1 != 0) {
    logic.innerHTML = "Please enter a whole number!";
  } else if (guess.value < 1 || guess.value > inputMaxNumber) {
    logic.innerHTML = `Please enter a number between 1 and ${inputMaxNumber}!`;
  } else if (guess.value > myNumber) {
    guesses.push(guess.value);
    logic.innerHTML = `Your guess is too high! Guess a lower number.`;
  } else if (guess.value < myNumber) {
    guesses.push(guess.value);
    logic.innerHTML = "Your guess is too low! Guess a higher number!";
  }
}

// Guess button event listener
btnGuess.addEventListener("click", () => {
  checkNumber();
  checkGuess();
  console.log(guesses);
});

//when enter is clicked it will run my functions as if you clicked the guess button (found this feature on stackoverflow)
guess.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    checkNumber();
    checkGuess();
    console.log(guesses);
  }
});