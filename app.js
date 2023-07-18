// DOM elements
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("text-body");
const notesList = document.querySelector(".notes");

// Form submission event listener
subjectInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = subjectInput.value;
  const taskMessage = messageInput.value;
  console.log(taskTitle);
  console.log(taskMessage);
});

// Submit button click event listener
const submitButton = document.querySelector("button[type='submit']");
const priorityCheckboxes = document.querySelectorAll("input[type='checkbox']");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Get input values
  const title = subjectInput.value;
  const message = messageInput.value;
  const priority =
    Array.from(priorityCheckboxes).find((checkbox) => checkbox.checked)
      ?.nextElementSibling.textContent || "No Priority";

  // Validate inputs
  if (!title.trim() || !message.trim()) {
    alert("Please enter both title and task message!");
    return;
  }

  // Create a new task object
  const task = {
    title: title,
    message: message,
    priority: priority,
  };

  // Retrieve tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task to the tasks array
  tasks.push(task);

  // Save the updated tasks back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display tasks on the page
  displayTasks();

  // Reset the form inputs
  resetForm();
});

// Function to create task elements and display them
function createTaskElement(task, index) {
  const listItem = document.createElement("li");
  listItem.classList.add("tasks");
  listItem.innerHTML = `
      <div class="msg-title">
        <h3>${task.title}-</h3>
        <p>${task.message}</p>
      </div>
      <div class="buttons-check">
        <button onclick="editTask(${index})">Edit</button>
        <input type="checkbox" onchange="deleteTask(${index})" />
      </div>
  `;

  // Set the background color based on the priority level
  switch (task.priority.toLowerCase()) {
    case "urgent priority":
      listItem.classList.add("task-urgent");
      break;
    case "high priority":
      listItem.classList.add("task-high");
      break;
    case "medium priority":
      listItem.classList.add("task-medium");
      break;
    case "low priority":
      listItem.classList.add("task-low");
      break;
    case "optional priority":
      listItem.classList.add("task-optional");
      break;
    default:
      listItem.classList.add("task-default");
  }

  notesList.appendChild(listItem);
}

// Function to display tasks on the page
function displayTasks() {
  notesList.innerHTML = "";

  // Retrieve tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Loop through tasks and create task elements
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
}

// Function to reset form inputs
function resetForm() {
  subjectInput.value = "";
  messageInput.value = "";
  priorityCheckboxes.forEach((checkbox) => (checkbox.checked = false));
}

// Function to delete a task
function deleteTask(index) {
  // Retrieve tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the task at the given index from the tasks array
  tasks.splice(index, 1);

  // Save the updated tasks back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display updated tasks on the page
  displayTasks();
}

// Function to edit a task
function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load the task details into the input fields
  subjectInput.value = tasks[index].title;
  messageInput.value = tasks[index].message;
  Array.from(priorityCheckboxes).forEach(
    (checkbox) => (checkbox.checked = checkbox.value === tasks[index].priority)
  );

  // Remove the edited task from the tasks array
  tasks.splice(index, 1);

  // Save the updated tasks back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display updated tasks on the page
  displayTasks();
}

// Display tasks when the page loads
displayTasks();
