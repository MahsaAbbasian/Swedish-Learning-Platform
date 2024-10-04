import { db } from "./firebase-init.js"; // Firebase initialization file
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"; // Firestore import

const flashcardCollection = collection(db, "flashcards");

// Correct answers for the quiz
const correctAnswers = {
  q1: "c",
  q2: "c",
  q3: "a",
  q4: "b",
  q5: "b",
  q6: "a",
  q7: "c",
  q8: "b",
  q9: "b",
  q10: "b",
  q11: "b",
  q12: "c"
};

// Handle Flashcard Flipping and Saving to Firestore
const flashcards = document.querySelectorAll(".flashcard");

console.log("Flashcards found: ", flashcards.length); // Log number of flashcards

flashcards.forEach(card => {
  console.log("Attaching listener to:", card); // Log each flashcard found
  card.addEventListener("click", async function() {
    // Toggle flip state
    card.classList.toggle("flip");

    try {
      // Add flashcard flip state to Firestore
      await addDoc(flashcardCollection, {
        word: card.getAttribute("data-word"), // Assuming flashcards have data-word attributes
        flipped: card.classList.contains("flip") // true if flipped, false otherwise
      });
      console.log("Flashcard state saved!");
    } catch (e) {
      console.error("Error saving flashcard state: ", e);
    }
  });
});

// Retrieve saved flashcard data on page load
async function getFlashcards() {
  try {
    const querySnapshot = await getDocs(flashcardCollection);
    querySnapshot.forEach(doc => {
      let flashcard = document.querySelector(
        `[data-word="${doc.data().word}"]`
      );
      if (doc.data().flipped) {
        flashcard.classList.add("flip");
      }
    });
    console.log("Flashcards loaded!");
  } catch (e) {
    console.error("Error loading flashcards: ", e);
  }
}

// Call getFlashcards on page load
window.onload = getFlashcards;

// Function to handle quiz submission
async function submitQuiz() {
  // <---- Add async here
  let totalQuestions = 12; // Update this with the number of quiz questions
  let correctCount = 0; // Track the number of correct answers
  let answeredCount = 0; // Track the number of answered questions

  // Loop through the user's answers
  for (let i = 1; i <= totalQuestions; i++) {
    let questionName = "q" + i;
    let selectedAnswer = document.querySelector(
      `input[name="${questionName}"]:checked`
    );

    // Check if the question has been answered
    if (selectedAnswer) {
      answeredCount++; // Increment answered questions count

      // Compare the selected answer with the correct answer
      if (selectedAnswer.value === correctAnswers[questionName]) {
        correctCount++; // Increment correct answers count
      }
    }
  }

  // Calculate result percentage
  const resultPercentage = correctCount / totalQuestions * 100;

  // Display messages based on performance
  if (answeredCount > totalQuestions / 2 && resultPercentage >= 80) {
    displayMessage(
      "Great job! You've answered over 80% of the questions correctly! 🎉"
    );
  } else if (answeredCount > totalQuestions / 2) {
    displayMessage(
      "Nice effort! You answered more than half the questions correctly. 👍"
    );
  } else {
    displayMessage(
      "It seems like you didn't answer enough questions correctly. Try again! 💪"
    );
  }

  // Save the quiz results to Firestore
  try {
    await addDoc(collection(db, "quizResults"), {
      // <--- Add await here
      userId: "exampleUserId", // Replace with actual user ID or handle anonymously
      correctAnswers: correctCount,
      totalQuestions: totalQuestions,
      resultPercentage: resultPercentage,
      timestamp: new Date() // Save the timestamp of quiz submission
    });
    console.log("Quiz results saved!");
  } catch (e) {
    console.error("Error saving quiz results:", e);
  }
}

// Helper function to display the quiz results
function displayMessage(message) {
  document.getElementById("quizResults").innerHTML = `<p>${message}</p>`;
}

// Call the submitQuiz function when the user submits the quiz
document
  .getElementById("submitQuizButton")
  .addEventListener("click", submitQuiz);
