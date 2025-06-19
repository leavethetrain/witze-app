import "../styles/main.scss";
import { getAPI } from "./fetch";

const loadJokeBtn = document.querySelector(".current-joke__generate");
const currentJokeElement = document.querySelector(".current-joke__text");

async function loadNewJoke() {
  const joke = await getAPI();
  currentJokeElement.innerText = joke;
}

loadJokeBtn.addEventListener("click", loadNewJoke);
