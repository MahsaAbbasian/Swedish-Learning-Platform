// Handle Flashcard Flipping
const flashcards = document.querySelectorAll(".flashcard");

flashcards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("flip");
  });
});
