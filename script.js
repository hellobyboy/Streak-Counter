// Initialize a unique task count
let taskCount = 0;

// Load tasks from local storage when the page loads
window.onload = function() {
  loadTasksFromLocalStorage();
};

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('task-')) {
      const taskData = JSON.parse(localStorage.getItem(key));
      createTaskElement(taskData.id, taskData.name, taskData.streak);
      taskCount = Math.max(taskCount, taskData.id);
    }
  }
}

// Add a new task based on user input
function addNewTask() {
  const taskInput = document.getElementById('task-input');
  const taskNameValue = taskInput.value.trim();

  // Validate task name
  if (taskNameValue === '') {
    alert('Please enter a task name');
    return;
  }

  taskCount++; // Increment task counter for unique ID
  const taskId = taskCount;
  const initialStreak = 0;

  // Create task element in the DOM
  createTaskElement(taskId, taskNameValue, initialStreak);

  // Store the task in local storage
  saveTaskToLocalStorage(taskId, taskNameValue, initialStreak);

  // Clear the input field
  taskInput.value = '';
}

// Function to create a task element
function createTaskElement(taskId, taskName, streak) {
  const task = document.createElement('div');
  task.classList.add('task');
  task.id = `task-${taskId}`;

  const taskNameElement = document.createElement('span');
  taskNameElement.classList.add('task-name');
  taskNameElement.innerText = taskName;

  const streakElement = document.createElement('span');
  streakElement.classList.add('streak');
  streakElement.id = `streak-${taskId}`;
  streakElement.innerText = `${streak}🔥`;

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');

  // Increment button
  const incrementBtn = document.createElement('button');
  incrementBtn.innerText = '+';
  incrementBtn.onclick = () => incrementStreak(taskId);

  // Decrement button
  const decrementBtn = document.createElement('button');
  decrementBtn.innerText = '-';
  decrementBtn.onclick = () => decrementStreak(taskId);

  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.innerText = 'Reset';
  resetBtn.onclick = () => resetStreak(taskId);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => deleteTask(taskId);

  // Append buttons to the button group
  buttonGroup.appendChild(incrementBtn);
  buttonGroup.appendChild(decrementBtn);
  buttonGroup.appendChild(resetBtn);
  buttonGroup.appendChild(deleteBtn);

  // Append elements to the task
  task.appendChild(taskNameElement);
  task.appendChild(streakElement);
  task.appendChild(buttonGroup);

  // Append task to the task list in the DOM
  document.getElementById('task-list').appendChild(task);
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskId, taskName, streak) {
  const taskData = {
    id: taskId,
    name: taskName,
    streak: streak,
  };
  localStorage.setItem(`task-${taskId}`, JSON.stringify(taskData));
}

// Function to update a task's streak in local storage
function updateStreakInLocalStorage(taskId, streak) {
  const taskData = JSON.parse(localStorage.getItem(`task-${taskId}`));
  taskData.streak = streak;
  localStorage.setItem(`task-${taskId}`, JSON.stringify(taskData));
}

// Increment streak for a specific task
function incrementStreak(taskId) {
  let streak = getStreak(taskId) + 1;
  updateStreakDisplay(taskId, streak);
  updateStreakInLocalStorage(taskId, streak);
}

// Decrement streak for a specific task
function decrementStreak(taskId) {
  let streak = Math.max(0, getStreak(taskId) - 1);
  updateStreakDisplay(taskId, streak);
  updateStreakInLocalStorage(taskId, streak);
}

// Reset streak for a specific task
function resetStreak(taskId) {
  updateStreakDisplay(taskId, 0);
  updateStreakInLocalStorage(taskId, 0);
}

// Delete a task from the DOM and local storage
function deleteTask(taskId) {
  const taskElement = document.getElementById(`task-${taskId}`);
  if (taskElement) {
    taskElement.remove();
    localStorage.removeItem(`task-${taskId}`);
  }
}

// Helper function to get the current streak for a specific task
function getStreak(taskId) {
  const taskData = JSON.parse(localStorage.getItem(`task-${taskId}`));
  return taskData ? taskData.streak : 0;
}

// Helper function to update the streak display for a specific task
function updateStreakDisplay(taskId, streak) {
  document.getElementById(`streak-${taskId}`).innerText = `${streak}🔥`;
}
