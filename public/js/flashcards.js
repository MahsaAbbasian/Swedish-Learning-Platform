// 1. Handle Flashcard Flipping
// This function allows the user to click on a flashcard and flip it to reveal the back (translations).
const flashcards = document.querySelectorAll(".flashcard");
flashcards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("flip");
  });
});

// 2. Handle Marking Words as Pass/Fail
// This function is used to mark a word as "pass" or "fail" based on which button is clicked.
function markWord(word, status) {
  const wordObj = { word: word, status: status };

  // Get the existing failed words from localStorage (if any), or initialize an empty array.
  let failedWords = JSON.parse(localStorage.getItem("failedWords")) || [];

  if (status === "fail") {
    // If the word is marked as "fail", check if it already exists in the failed words list.
    if (!failedWords.some((item) => item.word === word)) {
      // If the word is not already in the failed list, add it.
      failedWords.push(wordObj);
      localStorage.setItem("failedWords", JSON.stringify(failedWords));
      alert(word + " has been added to vocabulary practice.");
    }
  } else if (status === "pass") {
    // If the word is marked as "pass", remove it from the failed words list (if it exists there).
    failedWords = failedWords.filter((item) => item.word !== word);
    localStorage.setItem("failedWords", JSON.stringify(failedWords));
    alert(word + " is marked as learned.");
  }
}

// 3. Display Failed Words in vocabularyPractice.html
// This function loads the failed words from localStorage and displays them in vocabularyPractice.html.
document.addEventListener("DOMContentLoaded", function () {
  const failedWords = JSON.parse(localStorage.getItem("failedWords")) || [];
  const list = document.getElementById("failedWordsList");

  if (failedWords.length > 0) {
    // If there are failed words, display them in the list.
    failedWords.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.word;
      list.appendChild(li);
    });
  } else {
    // If there are no failed words, show a message indicating the list is empty.
    list.textContent = "No words to practice yet.";
  }
});
