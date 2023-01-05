"use strict";

const letterGrid = document.querySelector(".word-grid");
const letterBox = document.querySelectorAll(".letter-form");

let secretWord = "";
let currentWord = "";
let round = 1;
let letterPlace = 0;
let isValid = null; // CHANGE THIS FOR API

// function to use API to get the secret word of the day
async function getSecretWord() {
  const TODAY_WORD_URL = `https://words.dev-apis.com/word-of-the-day`;
  const promiseResponse = await fetch(TODAY_WORD_URL);
  const processedPromise = await promiseResponse.json();
  secretWord = processedPromise.word.toUpperCase();
  console.log(processedPromise);
}

// to check letter input
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// to validate if the current word is possible
async function validateWordAndAfter(requestedWord) {
  console.log(`lemme validate the wordo ${requestedWord}`);
  console.log(`valid: ${isValid}`);

  const VALIDATION_URL = `https://words.dev-apis.com/validate-word`;
  const promiseResponse = await fetch(VALIDATION_URL, {
    method: "POST",
    body: JSON.stringify({ word: `${requestedWord}` }),
  });
  const processedPromise = await promiseResponse.json();
  isValid = processedPromise.validWord;

  console.log(isValid);

  // handling word after validation
  if (isValid) {
    handleEvaluation(currentWord);
    round++;
    letterPlace = 0;
    currentWord = "";
  } else {
    alert(
      `Selected word: ${currentWord} is invalid, please input a valid word`
    );
  }
}

function handleWin() {
  for (let i = 0; i < secretWord.length; i++) {
    document.querySelector(`.box-${round}-${i + 1}`).style.backgroundColor =
      "#a1de85";
  }

  const winBox = document.createElement("img");
  winBox.src = `https://media.tenor.com/h2udEKVQhuIAAAAM/winning-win.gif`;
  winBox.className = `win-gif`;
  winBox.alt = `meme to show you win`;
  document.querySelector(".win-target").appendChild(winBox);
}

// to handle misplaced letters
function handleEvaluation(word) {
  console.log(`handling scrambled letters through my dyslexia on ${word}`);

  //for winining match situation
  if (word === secretWord) {
    handleWin();
  }

  //for not matching words
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < secretWord.length; j++) {
      // for all boxes
      document.querySelector(`.box-${round}-${i + 1}`).style.backgroundColor =
        "#dde1e4";

      // for wrong matches but existing ones
      if (word[i] === secretWord[j] && i !== j) {
        console.log(`letter match exist for ${word[i]}`);
        document.querySelector(`.box-${round}-${i + 1}`).style.backgroundColor =
          " #ebe495";
        break;
      }

      // for exact matches at exact place
      if (word[i] === secretWord[j] && i === j) {
        console.log(`letter match exist at exact place for ${word[i]}`);
        document.querySelector(`.box-${round}-${i + 1}`).style.backgroundColor =
          "#a1de85";
        break;
      }
    }
  }

  // for lose situation
  if (word !== secretWord && round === 6) {
    alert(`You lose ☔`);
    location.reload(true);
  }
}

// to handle letter input
function handleLetter(letter) {
  letter = letter.toUpperCase();

  if (currentWord.length < 5) {
    currentWord = currentWord + letter;
    letterPlace++;

    //Print the word to DOM
    document.querySelector(`.box-${round}-${letterPlace}`).textContent = letter;
  }
}

// to handle backspace input
function handleBackspace() {
  console.log(`backspace go brrr`);
  if (currentWord.length > 0) {
    currentWord = currentWord.substring(0, currentWord.length - 1);
    console.log(currentWord);
    document.querySelector(`.box-${round}-${letterPlace}`).textContent = "";
    letterPlace--;
  }
}

// to handle enter input
function handleEnter() {
  console.log(`Enter my world`);
  if (currentWord.length === 5) {
    //validation  of the entered word
    validateWordAndAfter(currentWord);
  }
}

function init() {
  getSecretWord();

  //click listening
  document.addEventListener("keydown", function handleKeypress(event) {
    if (isLetter(event.key)) {
      handleLetter(event.key);
    } else if (event.key === "Backspace") {
      handleBackspace();
    } else if (event.key === "Enter") {
      handleEnter();
    }
  });
}

init();

//get input
//get only letters
