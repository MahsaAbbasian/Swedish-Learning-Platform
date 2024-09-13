import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { db } from "./firebase-init"; // Import Firestore instance from firebase-init.js
import { auth } from "./firebase-init"; // Import Firebase Authentication

// 1. Handle Flashcard Flipping
// This function allows the user to click on a flashcard and flip it to reveal the back (translations).
const flashcards = document.querySelectorAll(".flashcard");
flashcards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("flip");
  });
});

// 2. Handle Marking Words as Pass/Fail (Using Firestore)
// This function is used to mark a word as "pass" or "fail" based on which button is clicked.
async function markWord(word, status) {
  const user = auth.currentUser; // Ensure the user is logged in
  if (!user) {
    alert("You need to be logged in to save progress.");
    return;
  }

  const wordDocRef = doc(db, "users", user.uid, "failedWords", word); // Reference to Firestore document

  if (status === "fail") {
    // If the word is marked as "fail", store it in Firestore
    try {
      await setDoc(wordDocRef, {
        word: word,
        status: status,
      });
      alert(word + " has been added to vocabulary practice.");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  } else if (status === "pass") {
    // If the word is marked as "pass", remove it from Firestore
    try {
      await deleteDoc(wordDocRef);
      alert(word + " is marked as learned.");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
}

// 3. Display Failed Words in vocabularyPractice.html (Using Firestore)
// This function loads the failed words from Firestore and displays them in vocabularyPractice.html.
document.addEventListener("DOMContentLoaded", async function () {
  const user = auth.currentUser;
  if (!user) {
    alert("You need to be logged in to view your vocabulary practice.");
    return;
  }

  const failedWordsList = document.getElementById("failedWordsList");
  failedWordsList.innerHTML = ""; // Clear any existing words

  try {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "failedWords")
    );

    if (querySnapshot.empty) {
      failedWordsList.textContent = "No words to practice yet.";
      return;
    }

    querySnapshot.forEach((doc) => {
      const wordData = doc.data();

      const li = document.createElement("li");
      li.textContent = wordData.word;
      failedWordsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});
