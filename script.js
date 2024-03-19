////////      DISPLAYING RANDOM QUOTES      ///////
// Function to fetch a random quote from the API
async function fetchRandomQuote() {
  const category = "inspirational";
  const apiKey = "9HTztQuea4RBF5CGmEQsgA==SQd98jraGXW9GbQl";
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const quotes = await response.json();
    return quotes;
  } catch (error) {
    throw error;
  }
}

// Function to display the random quote
async function displayRandomQuote() {
  const quoteBox = document.querySelector(".quote-box");
  try {
    const quotes = await fetchRandomQuote();
    if (quotes && quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex].quote;
      const randomAuthor = quotes[randomIndex].author;

      // Update the text and author in the HTML
      const textElement = quoteBox.querySelector(".text");
      const authorElement = quoteBox.querySelector(".author");
      textElement.textContent = `"${randomQuote}"`;
      authorElement.textContent = randomAuthor;
    } else {
      quoteBox.textContent = "No quotes available...";
    }
  } catch (error) {
    console.error("Error displaying quote:", error);
    quoteBox.textContent = "Failed to fetch quotes!";
  }
}
const newQuoteButton = document.querySelector(".new-quote");
newQuoteButton.addEventListener("click", () => {
  displayRandomQuote();
});

displayRandomQuote();

///////////////////          navigation menu           /////////////////////////
const hamburgerButton = document.querySelector(".toggle-menu");
const navbar = document.querySelector(".navbar");
hamburgerButton.addEventListener("click", toggleNav);

function toggleNav() {
  hamburgerButton.classList.toggle("active");
  navbar.classList.toggle("active");
}

// /////////////// Step 1: References to the necessary elements from the DOM ////////////////
// const taskInput = document.querySelector('input[name="task"]');
// const dateInput = document.querySelector("input[name='datetask']");
// const priorityInput = document.querySelector("select[name='priority']");
// const tasksList = document.querySelector(".tasks-list");
// const taskItemTemplate = document.querySelector("#task-item-template");
// const currentDate = new Date();
// const today = currentDate.toISOString().split("T")[0]; // Remove time portion for accurate comparison

// ///////////////     function to create an item    //////////////

// function createTaskItem(taskName, taskObject) {
//   // Create a new task item for each task in local storage
//   const taskItem = document.createElement("div");
//   taskItem.className = "line task-item";

//   // Create a checkbox and set its state based on the task's completion status
//   const taskCheckbox = document.createElement("input");
//   taskCheckbox.type = "checkbox";
//   taskCheckbox.className = "task-checkbox";
//   taskCheckbox.name = "state-checkbox";
//   taskCheckbox.checked = taskObject.state;
//   taskCheckbox.addEventListener("change", function () {
//     updateTaskState(taskItem);
//   });
//   taskItem.appendChild(taskCheckbox);

//   // Create a span to display the task name
//   const taskNameElement = document.createElement("span");
//   taskNameElement.textContent = taskName;
//   taskNameElement.className = "task-name";
//   taskItem.appendChild(taskNameElement);

//   // Create a span to display the task date
//   const taskDateElement = document.createElement("span");
//   taskDateElement.textContent = new Date(taskObject.date).toLocaleDateString(
//     "en-GB"
//   );
//   taskDateElement.className = "task-date";
//   taskItem.appendChild(taskDateElement);

//   // Create a span to display the task priority
//   const taskPriorityElement = document.createElement("span");
//   taskPriorityElement.textContent = taskObject.priority;
//   taskPriorityElement.className = "task-priority";
//   taskItem.appendChild(taskPriorityElement);

//   // Create a button to delete the task
//   const deleteButton = document.createElement("button");
//   deleteButton.className = "delete-button";
//   deleteButton.addEventListener("click", function () {
//     deleteTask(taskItem);
//   });
//   taskItem.appendChild(deleteButton);

//   // Add the 'completed' class to the task item if it is completed
//   if (taskObject.state) {
//     taskItem.classList.add("completed");
//   }

//   // Add priority level to the task
//   if (taskObject.priority === "1") {
//     taskPriorityElement.textContent = "High-Priority";
//   } else if (taskObject.priority === "0") {
//     taskPriorityElement.textContent = "Low-Priority";
//   } else {
//     taskPriorityElement.textContent = ""; // Clear the text if no priority selected
//   }

//   // Add the task item to the list
//   tasksList.appendChild(taskItem);
// }

// ///////////     function to save the tasks in local storage     /////////////
// function saveTaskState(taskName, taskObject) {
//   localStorage.setItem(taskName, JSON.stringify(taskObject));
// }
// /////////////// Step 2: Define the function to add a new task /////////////
// function addTask() {
//   // Show an alert if the input is empty
//   if (taskInput.value === "") {
//     alert("You must write something!");
//   } else if (dateInput.value === "") {
//     alert("You must select a date!");
//   } else {
//     // Get the task name and date from the input field
//     const taskName = taskInput.value;
//     const taskDate = dateInput.value;
//     const taskPriority = priorityInput.value;
//     let taskState = false;
//     const taskObject = {
//       date: taskDate,
//       state: taskState,
//       priority: taskPriority,
//     };
//     console.log(taskObject);
//     // use the function to create items
//     createTaskItem(taskName, taskObject);

//     // save the tasks in local storage
//     saveTaskState(taskName, JSON.stringify(taskObject));

//     // Clear the input field for the next task
//     taskInput.value = "";
//     dateInput.value = "";
//     // Reset the select input to "Select Your Priority"
//     priorityInput.selectedIndex = 0;
//   }
// }
// ///////////////// Step 3: Function to update the state of a task (completed or not) ///////////////
// function updateTaskState(taskItem) {
//   taskItem.classList.toggle("completed");
//   const taskName = taskItem.querySelector(".task-name").textContent;
//   const isChecked = taskItem.classList.contains("completed");
//   const taskObject = getObjectValueFromTask(taskName);
//   taskObject.state = isChecked;
//   saveTaskState(taskName, JSON.stringify(taskObject));
// }

// ///////////////// Step 4: Function to delete a task ///////////////////
// function deleteTask(taskItem) {
//   taskItem.remove();
//   const taskName = taskItem.querySelector(".task-name").textContent;
//   removeTaskState(taskName);
// }

// ///////////////// Step 5: Recover the task value from local storage ///////////////
// function getTaskValue(taskName) {
//   return localStorage.getItem(taskName); // Get the task value
// }

// ///////////////// Step 6: Functions to save and remove task states from local storage ///////////////
// function saveTaskState(taskName, isChecked) {
//   localStorage.setItem(taskName, isChecked);
// }
// function removeTaskState(taskName) {
//   localStorage.removeItem(taskName); // Remove the task state from local storage
// }
// function getObjectValueFromTask(taskName) {
//   const taskValueStringJson = getTaskValue(taskName);
//   return JSON.parse(taskValueStringJson);
// }

// ///////////////// Step 7: Function to display tasks from local storage when the page (re)loads ///////////////
// function showTasks() {
//   let hasTasksForToday = false; // check if there are tasks for today
//   for (let i = 0; i < localStorage.length; i++) {
//     const taskName = localStorage.key(i); // Get the task name from local storage
//     const taskObject = getObjectValueFromTask(taskName); // Get the task name from local storage
//     const taskDate = taskObject.date;
//     const isChecked = taskObject.state; // Check if the task is completed

//     createTaskItem(taskName, taskObject);

//     if (taskDate === today) {
//       hasTasksForToday = true;
//     }
//   }

//   // Show a reminder pop-up if there are tasks for today
//   if (hasTasksForToday) {
//     alert("You have tasks to do today!");
//     // find a way to display the tasks in a big pop up if possible???????
//   }
// }

// ////////////    Step 8: Display tasks from local storage when the page loads   ///////////////
// showTasks();

// ////////////      step 9: show tasks by dates      ///////////
// function showTasksByDate(dateAttribute) {
//   // Clear the tasks list before displaying filtered tasks
//   tasksList.innerHTML = "";

//   for (let i = 0; i < localStorage.length; i++) {
//     const taskName = localStorage.key(i); // Get the task name from local storage
//     const taskObject = getObjectValueFromTask(taskName); // Get the task object from local storage
//     const taskDate = taskObject.date;
//     const isChecked = taskObject.state; // Check if the task is completed

//     if (
//       // Show all tasks regardless of date
//       dateAttribute === "all" ||
//       // Show tasks with the same date as today
//       (dateAttribute === "today" && taskDate === today) ||
//       // Show tasks with dates in the future (upcoming)
//       (dateAttribute === "upcoming" && taskDate > today)
//     ) {
//       createTaskItem(taskName, taskObject);
//     }
//   }
//   // if I am on mobile, simulate a click on the cross
//   if (visualViewport.width < 751) {
//     document.querySelector(".toggle-menu").click();
//   }
// }
// // Call the showTasksByDate function with "all" as the default option when the page loads
// showTasksByDate("all");

// /////////////  step 10:   filtering functionality   /////////////

// // filter by completion (if task done or not)

// function showTasksByCompletion(stateAttribute) {
//   tasksList.innerHTML = "";

//   for (let i = 0; i < localStorage.length; i++) {
//     const taskName = localStorage.key(i);
//     const taskObject = getObjectValueFromTask(taskName);
//     const isChecked = taskObject.state;

//     if (
//       (stateAttribute === "completed" && isChecked === true) ||
//       (stateAttribute === "to do" && isChecked === false)
//     )
//       createTaskItem(taskName, taskObject);
//   }

//   // // if I am on mobile, simulate a click on the cross
//   if (visualViewport.width < 751) {
//     document.querySelector(".toggle-menu").click();
//   }
// }

// // filter by priority

// function showTasksByPriority(priorityAttribute) {
//   tasksList.innerHTML = "";

//   // Create an array to store the tasks
//   const tasks = [];

//   for (let i = 0; i < localStorage.length; i++) {
//     const taskName = localStorage.key(i);
//     const taskObject = getObjectValueFromTask(taskName);
//     tasks.push({ name: taskName, taskObject: taskObject });
//   }

//   // Sort the tasks based on priority (High-Priority first)
//   tasks.sort((a, b) => b.taskObject.priority - a.taskObject.priority);

//   // Create and display the task items based on the sorted array
//   for (const task of tasks) {
//     createTaskItem(task.name, task.taskObject);
//   }

//   // if I am on mobile, simulate a click on the cross
//   if (visualViewport.width < 751) {
//     document.querySelector(".toggle-menu").click();
//   }
// }
// // display all tasks by default
// showTasksByDate("all");

// at the end change local storage by using an API storage

// can I refactor the if visualviewport...???

//////////////////         test with api storage           /////////////////////

// Define constants for DOM elements
const taskInput = document.querySelector('input[name="task"]');
const dateInput = document.querySelector("input[name='datetask']");
const priorityInput = document.querySelector("select[name='priority']");
const tasksList = document.querySelector(".tasks-list");
const currentDate = new Date();
const today = currentDate.toISOString().split("T")[0]; // Remove time portion for accurate comparison

const apiBaseUrl = `http://localhost:5500`;

// Function to create a task item
function createTaskItem(taskName, taskObject) {
  // Create a new task item for each task in the database
  const taskItem = document.createElement("div");
  taskItem.className = "line task-item";

  // Create a checkbox and set its state based on the task's completion status
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.className = "task-checkbox";
  taskCheckbox.name = "state-checkbox";
  taskCheckbox.checked = taskObject.state;
  taskCheckbox.addEventListener("change", function () {
    updateTaskState(taskObject._id, taskCheckbox.checked);
  });
  taskItem.appendChild(taskCheckbox);

  // Create a span to display the task name
  const taskNameElement = document.createElement("span");
  taskNameElement.textContent = taskName;
  taskNameElement.className = "task-name";
  taskItem.appendChild(taskNameElement);

  // Create a span to display the task date
  const taskDateElement = document.createElement("span");
  taskDateElement.textContent = new Date(taskObject.date).toLocaleDateString(
    "en-GB"
  );
  taskDateElement.className = "task-date";
  taskItem.appendChild(taskDateElement);

  // Create a span to display the task priority
  const taskPriorityElement = document.createElement("span");
  taskPriorityElement.textContent = taskObject.priority;
  taskPriorityElement.className = "task-priority";
  taskItem.appendChild(taskPriorityElement);

  // Create a button to delete the task
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", function () {
    deleteTask(taskObject._id);
  });
  taskItem.appendChild(deleteButton);

  // Add the 'completed' class to the task item if it is completed
  if (taskObject.state) {
    taskItem.classList.add("completed");
  }

  // Add priority level to the task
  if (taskObject.priority === "1") {
    taskPriorityElement.textContent = "High-Priority";
  } else if (taskObject.priority === "0") {
    taskPriorityElement.textContent = "Low-Priority";
  } else {
    taskPriorityElement.textContent = ""; // Clear the text if no priority selected
  }

  // Add the task item to the list
  tasksList.appendChild(taskItem);
}

// Function to add a new task
async function addTask() {
  if (taskInput.value === "") {
    alert("You must write something!");
  } else if (dateInput.value === "") {
    alert("You must select a date!");
  } else {
    const taskName = taskInput.value;
    const taskDate = dateInput.value;
    const taskPriority = priorityInput.value;
    const taskState = false;

    const taskObject = {
      name: taskName,
      date: taskDate,
      priority: taskPriority,
      state: taskState,
    };

    console.log("Sending taskObject to server:", taskObject);

    try {
      const response = await fetch(`${apiBaseUrl}/new-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObject),
      });

      console.log("Server response:", response);

      if (response.status === 201) {
        const newTask = await response.json();
        createTaskItem(newTask.name, newTask);
      } else {
        alert("Failed to create a task.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    taskInput.value = "";
    dateInput.value = "";
    priorityInput.selectedIndex = 0;
  }
}

// Function to update the state of a task (completed or not)
async function updateTaskState(taskId, newState) {
  try {
    const response = await fetch(`${apiBaseUrl}/update-task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: newState }),
    });

    if (response.status === 200) {
      // Update the task state in the DOM
      const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskItem) {
        taskItem.querySelector(".task-checkbox").checked = newState;
        if (newState) {
          taskItem.classList.add("completed");
        } else {
          taskItem.classList.remove("completed");
        }
      }
    } else {
      alert("Failed to update task state.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to delete a task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${apiBaseUrl}/delete-task/${taskId}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      // Remove the task item from the DOM
      const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskItem) {
        taskItem.remove();
      }
    } else {
      alert("Failed to delete the task.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to filter tasks by date
function showTasksByDate(dateFilter) {
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((taskItem) => {
    const taskDate = taskItem.querySelector(".task-date").textContent;
    if (dateFilter === "all" || taskDate === dateFilter) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}

// Function to filter tasks by completion (completed or to do)
function showTasksByCompletion(completionFilter) {
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((taskItem) => {
    const isCompleted = taskItem.classList.contains("completed");
    if (
      (completionFilter === "completed" && isCompleted) ||
      (completionFilter === "to do" && !isCompleted)
    ) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}

// Function to filter tasks by priority
function showTasksByPriority() {
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((taskItem) => {
    const taskPriority = taskItem.querySelector(".task-priority").textContent;
    if (taskPriority === "High-Priority") {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}

// Function to display tasks from the API when the page (re)loads
async function showTasks() {
  tasksList.innerHTML = "";

  try {
    const response = await fetch(`${apiBaseUrl}/all-tasks`);

    if (response.status === 200) {
      const tasks = await response.json();
      let hasTasksForToday = false;

      for (const task of tasks) {
        createTaskItem(task.name, task); // Pass the task name and object

        if (task.date === today) {
          hasTasksForToday = true;
        }
      }

      if (hasTasksForToday) {
        alert("You have tasks to do today!");
      }
    } else {
      alert("Failed to retrieve tasks.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initialize the page by displaying all tasks
showTasks();
