let todoInsertTaskName; // text insert in ToDo container
let todoInsertTaskDate; // date insert in ToDo container
let todoAddBtn; // ADD button in ToDo container
let errorInfo; // p displaying errors that occur during adding tasks
let newTodoLi; // recently created todo-list li element
let newTodoLiText; // text div in recently created li
let newTodoLiTaskName; // task-name in recently created li
let newTodoLiTaskDate; // task-date in recently created li
let todoDiv; // todo-list div
let todoUlList; // ul inside todo-list div
let allTasks; // all li tasks inside ul todo-list

let taskToEdit; // currently edited task
let taskToEditName; // currently edited task task-name
let taskToEditDate; // currently edited task task-date
let taskToEditDateStr; // currently edited task task-date string
let tmpYyyy; // temporarily storing information about date year
let tmpMm; // temporarily storing information about date month
let tmpDd; // temporarily storing information about date day

let editPopup; // edit-task popup
let editPopupTaskName; // task-name input in edit-task popup
let editPopupTaskDate; // task-date input in edit-task popup
let editPopupTaskInfo; // task-date info text in edit-task popup
let editPopupApplyBtn; // btn-apply in edit-task popup
let editPopupCancelBtn; // btn-cancel in edit-task popup

let todayDate; // current date

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todayDate = new Date();

	todoInsertTaskName = document.querySelector(".todo-header__input-tname");
	todoInsertTaskDate = document.querySelector(".todo-header__input-tdate");
	todoAddBtn = document.querySelector(".btn-add");
	errorInfo = document.querySelector(".error-info");
	todoDiv = document.querySelector(".todo-list");
	todoUlList = document.querySelector(".todo-list__ul-7days-tasks");
	allTasks = document.querySelectorAll(".todo-list__task");

	editPopup = document.querySelector(".edit-task-mobile");
	// editPopup = document.querySelector(".edit-task-desktop");

	editPopupTaskName = editPopup.querySelector(".edit-task__input-tname");
	editPopupTaskDate = editPopup.querySelector(".edit-task__input-tdate");
	editPopupTaskInfo = editPopup.querySelector(".edit-task__info");
	editPopupApplyBtn = editPopup.querySelector(".edit-task__btn-apply");
	editPopupCancelBtn = editPopup.querySelector(".edit-task__btn-cancel");
};

const prepareDOMEvents = () => {
	todoAddBtn.addEventListener("click", addNewTodo);
	// todoUlList.addEventListener("click", checkClick);
	todoDiv.addEventListener("click", checkClick);
	// editPopupApplyBtn.addEventListener("click", changeTaskProperties);
	// editPopupCancelBtn.addEventListener("click", closeTaskEditor);
};

const setTodoUlListTimeRange = (e) => {
	let tmpDate = new Date(e);
	let dateDifferenceInTime = tmpDate.getTime() - todayDate.getTime();
	let dateDifferenceInDays = dateDifferenceInTime / (1000 * 3600 * 24);

	if (dateDifferenceInDays < -1) {
		todoUlList = document.querySelector(".todo-list__ul-past-tasks");
		// console.log("Past Tasks");
	} else if (dateDifferenceInDays >= -1 && dateDifferenceInDays <= 7) {
		todoUlList = document.querySelector(".todo-list__ul-7days-tasks");
		// console.log("DEADLINE: next 7 days");
	} else if (dateDifferenceInDays > 7 && dateDifferenceInDays <= 30) {
		todoUlList = document.querySelector(".todo-list__ul-30days-tasks");
		// console.log("DEADLINE: next 30 days");
	} else if (dateDifferenceInDays > 30) {
		todoUlList = document.querySelector(".todo-list__ul-later-30days-tasks");
		// console.log("DEADLINE: later than next 30 days");
	}
};

const addNewTodo = () => {
	if (todoInsertTaskName.value !== "" && todoInsertTaskDate.value !== "") {
		// setting which ul list should be used
		setTodoUlListTimeRange(todoInsertTaskDate.value);
		// creating elements
		newTodoLi = document.createElement("li");
		newTodoLiText = document.createElement("div");
		newTodoLiTaskName = document.createElement("p");
		newTodoLiTaskDate = document.createElement("p");
		// adding classes
		newTodoLi.classList.add("todo-list__task");
		newTodoLiText.classList.add("todo-list__task-text");
		newTodoLiTaskName.classList.add("todo-list__task-name");
		newTodoLiTaskDate.classList.add("todo-list__task-date");
		// setting text content for todo-task li
		newTodoLiTaskName.textContent = todoInsertTaskName.value;
		newTodoLiTaskDate.textContent = "[" + todoInsertTaskDate.value + "]";
		// append children
		todoUlList.append(newTodoLi);
		newTodoLi.append(newTodoLiText);
		newTodoLiText.append(newTodoLiTaskName, newTodoLiTaskDate);
		createTaskBtns();
		// clearing inputs and errors
		errorInfo.textContent = "";
		todoInsertTaskName.value = "";
		todoInsertTaskDate.value = "";
	} else {
		errorInfo.textContent = "Insert task name and task date to add new task!";
	}
};

const createTaskBtns = () => {
	// creating taskBtns for newTodoLi
	const taskBtns = document.createElement("div");
	taskBtns.classList.add("task-btns");

	const doneBtn = document.createElement("button");
	doneBtn.classList.add("btn", "task-btn", "btn-check");
	doneBtn.innerHTML = '<i class="fa-regular fa-circle"></i>';

	const editBtn = document.createElement("button");
	editBtn.classList.add("btn", "task-btn", "btn-edit");
	editBtn.textContent = "EDIT";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("btn", "task-btn", "btn-delete");
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

	taskBtns.append(doneBtn, editBtn, deleteBtn);
	newTodoLi.append(taskBtns);
};

const checkClick = (e) => {
	if (
		e.target.matches(".btn-check") ||
		e.target.matches(".fa-circle") ||
		e.target.matches(".fa-circle-check")
	) {
		completeTask(e);
		// console.log("complete");
	} else if (e.target.matches(".btn-edit")) {
		editTask(e);
	} else if (e.target.matches(".btn-delete") || e.target.matches(".fa-xmark")) {
		deleteTask(e);
		// console.log("delete");
	}
};

const completeTask = (e) => {
	// tmp variable for storing e.target if button clicked or e.target.parentElement if icon inside button clicked
	let tmpE;
	if (e.target.matches(".fa-circle") || e.target.matches(".fa-circle-check")) {
		tmpE = e.target.parentElement;
	} else {
		tmpE = e.target;
	}
	// adding styles for task-name and changing icon if task is completed or not
	let currentLi = tmpE.closest("li");
	let currentTaskName = currentLi.querySelector(".todo-list__task-name");
	if (currentTaskName.matches(".todo-list__task-name--completed")) {
		currentTaskName.classList.remove("todo-list__task-name--completed");
		tmpE.innerHTML = '<i class="fa-regular fa-circle"></i>';
	} else {
		currentTaskName.classList.add("todo-list__task-name--completed");
		tmpE.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
	}
};

const editTask = (e) => {
	editPopupTaskName.value = "";
	editPopupTaskDate.value = "";
	editPopupTaskInfo.textContent = "";
	editPopupApplyBtn = "";
	editPopupCancelBtn = "";

	if (window.innerWidth >= 768) {
		editPopup.classList.remove("edit-task-mobile--active");
		editPopup = document.querySelector(".edit-task-desktop");
		editPopup.classList.add("edit-task-desktop--active");
	} else {
		editPopup.classList.remove("edit-task-desktop--active");
		editPopup = document.querySelector(".edit-task-mobile");
		editPopup.classList.add("edit-task-mobile--active");
	}

	editPopupTaskName = editPopup.querySelector(".edit-task__input-tname");
	editPopupTaskDate = editPopup.querySelector(".edit-task__input-tdate");
	editPopupTaskInfo = editPopup.querySelector(".edit-task__info");
	editPopupApplyBtn = editPopup.querySelector(".edit-task__btn-apply");
	editPopupCancelBtn = editPopup.querySelector(".edit-task__btn-cancel");

	editPopupApplyBtn.addEventListener("click", changeTaskProperties);
	editPopupCancelBtn.addEventListener("click", closeTaskEditor);

	taskToEdit = e.target.closest("li");
	taskToEditName = taskToEdit.querySelector(".todo-list__task-name");
	taskToEditDate = taskToEdit.querySelector(".todo-list__task-date");
	// converting date string from task to dateformat YYYY-MM-DD
	taskToEditDateStr = taskToEditDate.textContent
		.replace("[", "")
		.replace("]", "");
	tmpDd = taskToEditDateStr.slice(0, 2);
	// console.log(tmpDd);
	tmpMm = taskToEditDateStr.slice(3, 5);
	// console.log(tmpMm);
	tmpYyyy = taskToEditDateStr.slice(6, 10);
	// console.log(tmpYyyy);
	taskToEditDateStr = `${tmpYyyy}-${tmpMm}-${tmpDd}`;
	// inserting text from task into inputs in edit-task popup
	editPopupTaskName.value = taskToEditName.textContent;
	editPopupTaskDate.value = taskToEditDateStr;
};

const changeTaskProperties = () => {
	if (editPopupTaskName.value !== "" && editPopupTaskDate.value !== "") {
		// adjusting date format to put it into todo-list__task
		tmpYyyy = editPopupTaskDate.value.slice(0, 4);
		tmpMm = editPopupTaskDate.value.slice(5, 7);
		tmpDd = editPopupTaskDate.value.slice(8, 10);
		taskToEditDateStr = `[${tmpDd}.${tmpMm}.${tmpYyyy}]`;

		let currentUl = taskToEdit.closest(".todo-list__ul");
		setTodoUlListTimeRange(editPopupTaskDate.value);

		if (currentUl === todoUlList) {
			taskToEditName.textContent = editPopupTaskName.value;
			taskToEditDate.textContent = taskToEditDateStr;
		} else {
			// removing li from the ul list with unmatched date
			taskToEdit.remove();
			// creating elements
			newTodoLi = document.createElement("li");
			newTodoLiText = document.createElement("div");
			newTodoLiTaskName = document.createElement("p");
			newTodoLiTaskDate = document.createElement("p");
			// adding classes
			newTodoLi.classList.add("todo-list__task");
			newTodoLiText.classList.add("todo-list__task-text");
			newTodoLiTaskName.classList.add("todo-list__task-name");
			newTodoLiTaskDate.classList.add("todo-list__task-date");
			// setting text content for todo-task li
			newTodoLiTaskName.textContent = editPopupTaskName.value;
			newTodoLiTaskDate.textContent = taskToEditDateStr;
			// append children
			todoUlList.append(newTodoLi);
			newTodoLi.append(newTodoLiText);
			newTodoLiText.append(newTodoLiTaskName, newTodoLiTaskDate);
			createTaskBtns();
		}

		if (window.innerWidth >= 768) {
			editPopup.classList.remove("edit-task-desktop--active");
		} else {
			editPopup.classList.remove("edit-task-mobile--active");
		}

		editPopupTaskName.value = "";
		editPopupTaskDate.value = "";
		editPopupTaskInfo.textContent = "";
	} else {
		editPopupTaskInfo.textContent =
			"Insert task name and task date to apply changes!";
	}
};

const closeTaskEditor = () => {
	if (window.innerWidth >= 768) {
		editPopup.classList.remove("edit-task-desktop--active");
	} else {
		editPopup.classList.remove("edit-task-mobile--active");
	}

	editPopupTaskName.value = "";
	editPopupTaskDate.value = "";
	editPopupTaskInfo.textContent = "";
};

const deleteTask = (e) => {
	if (confirm("Are you sure you want to delete this taks?")) {
		e.target.closest("li").remove();
	}

	allTasks = document.querySelectorAll(".todo-list__task");

	if (allTasks.length === 0) {
		errorInfo.textContent = "No tasks on the list.";
	} else {
		errorInfo.textContent = "";
	}
};

document.addEventListener("DOMContentLoaded", main);
