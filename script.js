"use strict";

let secretWord = undefined;

// function to use API to get the secret word of the day
async function getSecretWord() {
  const TODAY_WORD_URL = `https://words.dev-apis.com/word-of-the-day`;
  const promiseResponse = await fetch(TODAY_WORD_URL);
  const processedPromise = await promiseResponse.json();
  secretWord = processedPromise.word.toUpperCase();
}

function init() {
  console.log("boo");
  getSecretWord();
}

init();
