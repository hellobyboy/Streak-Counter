// script.js
let streakCount = localStorage.getItem('streak') ? parseInt(localStorage.getItem('streak')) : 0;

// Display the current streak count on page load
document.getElementById('streak').innerText = `${streakCount}🔥`;

function incrementStreak() {
  streakCount++;
  document.getElementById('streak').innerText = `${streakCount}🔥`;
  localStorage.setItem('streak', streakCount); // Store the updated streak count
}

function decrementStreak() {
  if (streakCount > 0) { // Prevents streak count from going below 0
    streakCount--;
    document.getElementById('streak').innerText = `${streakCount}🔥`;
    localStorage.setItem('streak', streakCount); // Store the updated streak count
  }
}

function resetStreak() {
  streakCount = 0;
  document.getElementById('streak').innerText = `${streakCount}🔥`;
  localStorage.setItem('streak', streakCount); // Reset the streak count in local storage
}
