"use strict";

const letterGrid = document.querySelector(".word-grid");
const letterBox = document.querySelectorAll(".letter-form");

let secretWord = "";
let currentWord = "";
let round = 1;
let letterPlace = 0;

// function to use API to get the secret word of the day
async function getSecretWord() {
  const TODAY_WORD_URL = `https://words.dev-apis.com/word-of-the-day`;
  const promiseResponse = await fetch(TODAY_WORD_URL);
  const processedPromise = await promiseResponse.json();
  secretWord = processedPromise.word.toUpperCase();
}

// to check letter input
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleLetter(letter) {
  letter = letter.toUpperCase();

  if (currentWord.length < 5) {
    currentWord = currentWord + letter;
    letterPlace += 1;

    //Print the word to DOM
    document.querySelector(`.box-${round}-${letterPlace}`).textContent = letter;
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
