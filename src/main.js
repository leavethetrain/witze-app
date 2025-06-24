import "../styles/main.scss";
import { getAPI } from "./fetch";
import { getSavedJokes, removeJoke, saveJoke } from "./localstorage";

const loadJokeBtn = document.querySelector(".current-joke__generate");
const currentJokeElement = document.querySelector(".current-joke__text");
const saveJokeBtn = document.querySelector(".current-joke__save");
const savedJokesListEl = document.querySelector(".saved-jokes__list");
const selectEl = document.querySelector(".select-joke__select");
const darkModeBtn = document.querySelector(".light-mode");

darkModeBtn.addEventListener("click", darkMode);

let currentJoke = "";

selectEl.addEventListener("change", () => {
  const selectedCategory = selectEl.value;
  console.log(selectedCategory);
});

async function loadNewJoke() {
  const selectedCategory = selectEl.value;
  const joke = await getAPI(selectedCategory);

  if (!currentJoke) {
    saveJokeBtn.classList.remove("current-joke__save--disabled");
  }
  currentJoke = joke;
  currentJokeElement.innerText = joke;
}

function saveCurrentJoke() {
  if (currentJoke) {
    saveJoke(currentJoke);
  }
  renderJokes();
}

function deleteJoke(index) {
  removeJoke(index);
  renderJokes();
}

window.deleteJoke = deleteJoke;

function renderJokes() {
  const savedJokes = getSavedJokes();
  let html = "";

  savedJokes.forEach((joke, index) => {
    html += `
        <div class="saved-joke">
            <div class="saved-joke__text">
             ${joke}
            </div>
            <button class="saved-joke__remove saved-joke__remove--active" onclick="deleteJoke(${index})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="saved-joke__remove-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                />
              </svg>
            </button>
        </div>`;
  });

  if (!html) {
    html = "<em>Noch keine Witze gespeichert</em>";
  }

  savedJokesListEl.innerHTML = html;
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("light");
}

loadJokeBtn.addEventListener("click", loadNewJoke);
saveJokeBtn.addEventListener("click", saveCurrentJoke);

renderJokes();
