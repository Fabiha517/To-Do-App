const themeToggle = document.querySelector(".themeImage");
const body = document.body;
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
function check() {
  const taskstatus = document.querySelectorAll(".taskstatus");
  const goals = document.querySelectorAll(".goal");
  taskstatus.forEach((task, index) => {
    task.addEventListener("click", () => {
      task.classList.toggle("checked");
      goals[index - 1].classList.toggle("checked");
    });
  });
}
check();
function clear() {
  const crosses = document.querySelectorAll(".cross");
  const task = document.querySelectorAll(".task");
  crosses.forEach((cross, index) => {
    cross.addEventListener("click", () => {
      task[index].style.display = "none";
    });
  });
}
clear();

function createNewToDo() {
  const addTask = document.querySelector(".addTask");
  const taskstatus = addTask.querySelector(".taskstatus");
  const taskList = document.querySelector(".tasklist");
  const newTaskInput = document.querySelector(".newTask");
  taskstatus.addEventListener("click", () => {
    const newTask = document.createElement("div");
    newTask.className = "task";

    const left = document.createElement("div");
    left.className = "left";

    const taskstatus = document.createElement("button");
    taskstatus.className = "taskstatus";

    taskstatus.addEventListener("click", () => {
      taskstatus.classList.toggle("checked");
      goal.classList.toggle("checked");
    });

    const goal = document.createElement("span");
    goal.className = "goal";

    goal.textContent = newTaskInput.value;

    left.appendChild(taskstatus);
    left.appendChild(goal);
    newTask.appendChild(left);
    taskList.appendChild(newTask);
    newTaskInput.value = "";
  });
}
createNewToDo();
