//Selectors
const formEl = document.querySelector("form");
const taskEl = document.querySelector(".task");
const containerEl = document.querySelector(".container");
const totalEl = document.querySelector(".total");

//get all task from localStorage

const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks.length);
  totalEl.innerHTML = tasks.length;
  return tasks;
};

// 1 create task
const addTask = (task) => {
  //check if task is empty
  if (taskEl.value === "") {
    alert("Please add a task");
    return;
  }
  console.log(getTasks());

  //create task object
  const taskObj = {
    task: task,
    id: new Date().getTime(),
  };

  //get all task from localStorage
  const allTasks = getTasks();

  allTasks.push(taskObj);

  //push to local storage
  localStorage.setItem("tasks", JSON.stringify(allTasks));

  //display tasks
  displayTask(allTasks);
  //reset fotm
  formEl.reset();
};

// 2 display all task
const displayTask = (tasks) => {
  let output = "";
  tasks.forEach((task) => {
    output += `
    <li>
        <p>${task.task}</p>
        <button onclick='deleteTask(${task.id})'>
        <i class="fas fa-trash-alt">
        </i></button>
    </li>
    `;
  });

  containerEl.innerHTML = output;
  getTasks();
};
// 3 delete task

const deleteTask = (id) => {
  let tasks = getTasks();
  tasks = tasks.filter((task) => {
    //Busca exactamente task por id, al encontrarlo lo elemina
    return task.id !== id;
  });

  //save back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask(getTasks());
  getTasks();
};

// 4 total

//submit event
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //create task fn
  addTask(taskEl.value);
});

displayTask(getTasks());
