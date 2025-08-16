const themeToggle = document.querySelector(".themeImage");
const body = document.body;
themeToggle.addEventListener("click", () => {
	body.classList.toggle("dark-mode");
});

document.querySelector(".ToDoList").addEventListener("click", (e) => {
	const taskstatus = e.target.closest(".taskstatus");
	if (taskstatus) {
		taskstatus.classList.toggle("checked");

		const goal = taskstatus.parentElement.querySelector(".goal");
		if (goal) {
			goal.classList.toggle("checked");
		}
		handleQuantity();
	}

	// Check if clicked element is a cross button or its child
	const cross = e.target.closest(".cross");
	if (cross) {
		const task = cross.closest(".task");
		if (task) {
			task.style.display = "none";
			handleQuantity();
		}
	}
});

function createNewToDo() {
	const addTask = document.querySelector(".addTask");
	const taskstatusBtn = addTask.querySelector(".taskstatus");
	const taskList = document.querySelector(".tasklist");
	const newTaskInput = document.querySelector(".newTask");
	taskstatusBtn.disabled = true;

	newTaskInput.addEventListener("input", () => {
		if (!newTaskInput.value.trim()) {
			taskstatusBtn.disabled = true;
		} else {
			taskstatusBtn.disabled = false;
		} // don't add empty tasks
	});
	taskstatusBtn.addEventListener("click", () => {
		if (taskstatusBtn.disabled) return;
		const newTask = document.createElement("div");
		newTask.className = "task";

		const left = document.createElement("div");
		left.className = "left";

		const right = document.createElement("div");
		right.className = "right";

		const cross = document.createElement("button");
		cross.className = "cross";

		const img = document.createElement("img");
		img.src = "images/icon-cross.svg";

		const taskstatus = document.createElement("button");
		taskstatus.className = "taskstatus";

		const goal = document.createElement("span");
		goal.className = "goal";

		goal.textContent = newTaskInput.value;

		left.appendChild(taskstatus);
		left.appendChild(goal);
		cross.appendChild(img);
		right.appendChild(cross);
		newTask.appendChild(left);
		newTask.appendChild(right);
		taskList.appendChild(newTask);
		newTaskInput.value = "";
		handleQuantity();

		setTimeout(() => {
			taskstatusBtn.classList.remove("checked");
			taskstatusBtn.disabled = true;
		}, 1000);
	});
}
createNewToDo();

function handleQuantity() {
	const tasklist = document.querySelector(".tasklist");
	const tasks = tasklist.querySelectorAll(".task");
	const itemsLeft = document.querySelector(".itemsLeft");
	let count = 0;
	tasks.forEach((task) => {
		if (task.style.display !== "none") {
			const taskstatus = task.querySelector(".taskstatus");
			if (!taskstatus.classList.contains("checked")) {
				count++;
			}
		}
	});
	itemsLeft.innerHTML = `${count} items left`;
}
handleQuantity();

function clearcompleted() {
	const clear = document.querySelector(".Clear");

	clear.addEventListener("click", () => {
		const tasks = document.querySelectorAll(" .tasklist .task");
		tasks.forEach((task) => {
			const taskstatus = task.querySelector(".taskstatus");

			if (taskstatus.classList.contains("checked")) {
				task.style.display = "none";
			}
		});
		handleQuantity();
	});
}
clearcompleted();
function HighlightFilter() {
	const tasklist = document.querySelector(".tasklist");
	const tasks = tasklist.querySelectorAll(".task");
	const taskstatus = tasklist.querySelector(".taskstatus");
	const active = document.querySelector(".active");
	const completed = document.querySelector(".completed");
	const all = document.querySelector(".all");
	all.classList.add("activeFilter");
	all.addEventListener("click", () => {
		all.classList.add("activeFilter");
		completed.classList.remove("activeFilter");
		active.classList.remove("activeFilter");

		tasks.forEach((task) => {
			task.style.display = "flex";
		});
	});
	completed.addEventListener("click", () => {
		completed.classList.add("activeFilter");
		all.classList.remove("activeFilter");
		active.classList.remove("activeFilter");
		tasks.forEach((task) => {
			const isChecked = task
				.querySelector(".taskstatus")
				.classList.contains("checked");
			task.style.display = isChecked ? "flex" : "none";
		});
	});
	active.addEventListener("click", () => {
		active.classList.add("activeFilter");
		all.classList.remove("activeFilter");
		completed.classList.remove("activeFilter");
		tasks.forEach((task) => {
			const isChecked = task
				.querySelector(".taskstatus")
				.classList.contains("checked");
			task.style.display = isChecked ? "none" : "flex";
		});
	});
}
HighlightFilter();
// Make tasks draggable and set up event listeners
function setupDragAndDrop() {
	const tasklist = document.querySelector(".tasklist");
	const tasks = tasklist.querySelectorAll(".task");

	tasks.forEach((task) => {
		task.draggable = true;

		// ----- Desktop -----
		task.addEventListener("dragstart", () => {
			task.classList.add("dragging");
		});

		task.addEventListener("dragend", () => {
			task.classList.remove("dragging");
		});

		// ----- Mobile -----
		task.addEventListener("touchstart", () => {
			task.classList.add("dragging");
		});

		task.addEventListener("touchend", () => {
			task.classList.remove("dragging");
		});

		task.addEventListener("touchmove", (e) => {
			e.preventDefault();
			const touch = e.touches[0];
			const afterElement = getDragAfterElement(tasklist, touch.clientY);
			const draggable = document.querySelector(".dragging");

			if (afterElement == null) {
				tasklist.appendChild(draggable);
			} else {
				tasklist.insertBefore(draggable, afterElement);
			}
		});
	});

	// Desktop container
	tasklist.addEventListener("dragover", (e) => {
		e.preventDefault();
		const draggable = document.querySelector(".dragging");
		const afterElement = getDragAfterElement(tasklist, e.clientY);

		if (afterElement == null) {
			tasklist.appendChild(draggable);
		} else {
			tasklist.insertBefore(draggable, afterElement);
		}
	});
}

// Helper function (same as before)
function getDragAfterElement(container, y) {
	const draggableElements = [
		...container.querySelectorAll(".task:not(.dragging)"),
	];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;

			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}

setupDragAndDrop();
