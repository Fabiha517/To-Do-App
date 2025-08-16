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
  const newTask = document.querySelector(".newTask");
  const addTask = document.querySelector(".addTask");
  const taskstatus = addTask.querySelector("taskstatus");
  const taskList = document.querySelector(".taskList");
  taskstatus.addEventListener("click", () => {
    taskList.appendChild(newTask);
  });
}
createNewToDo()
