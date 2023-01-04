"use strict";

const letterGrid = document.querySelector(".word-grid");
const letterBox = document.querySelectorAll(".letter-form");

let secretWord = undefined;
let currentRound = 0;

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

function init() {
  getSecretWord();

  //click listening
  document.addEventListener("keydown", function handleKeypress(event) {
    if (isLetter(event.key)) {
      handleLetter();
    } else if (event.key === "Backspace") {
      console.log("backspace pressed");
    } else if (event.key === "Enter") {
      console.log("enter pressed");
    }
  });
}

init();

//get input
//get only letters
