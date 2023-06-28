let todoInsertTaskName; // text insert in ToDo container
let todoInsertTaskDate; // date insert in ToDo container
let todoAddBtn; // ADD button in ToDo container
let errorInfo; // p displaying errors that occur during adding tasks
let newTodoLi; // recently created todo-list li element
let newTodoLiText; // text div in recently created li
let newTodoLiTaskName; // task-name in recently created li
let newTodoLiTaskDate; // task-date in recently created li
let todoListUl; // ul inside todo-list div

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInsertTaskName = document.querySelector(".todo-header__input-tname");
	todoInsertTaskDate = document.querySelector(".todo-header__input-tdate");
	todoAddBtn = document.querySelector(".btn-add");
	errorInfo = document.querySelector(".error-info");
	todoListUl = document.querySelector(".todo-list__ul");
};

const prepareDOMEvents = () => {
	todoAddBtn.addEventListener("click", addNewTodo);
};

const addNewTodo = () => {
	if (todoInsertTaskName.value !== "" && todoInsertTaskDate.value !== "") {
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
		// adding text
		newTodoLiTaskName.textContent = todoInsertTaskName.value;
		newTodoLiTaskDate.textContent = "[" + todoInsertTaskDate.value + "]";
		// append children
		todoListUl.append(newTodoLi);
		newTodoLi.append(newTodoLiText);
		newTodoLiText.append(newTodoLiTaskName, newTodoLiTaskDate);
		createTaskBtns();
		// clearing inputs and errors
		errorInfo.textContent = "";
		todoInsertTaskName.value = "";
		todoInsertTaskDate.value = "";
	} else {
		errorInfo.textContent = "Insert name and date to add new task!";
	}
};

const createTaskBtns = () => {
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

document.addEventListener("DOMContentLoaded", main);
