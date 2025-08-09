// script.js

let taskList = document.getElementById("taskList");
let addBtn = document.getElementById("addBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.textContent = `${task.text} (${task.date})`;
        if (task.completed) taskText.classList.add("completed");

        taskText.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            let newText = prompt("Edit task:", task.text);
            if (newText) {
                tasks[index].text = newText;
                saveTasks();
                renderTasks();
            }
        };

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    let taskText = document.getElementById("taskInput").value.trim();
    let taskDate = document.getElementById("taskDate").value;
    if (taskText && taskDate) {
        tasks.push({ text: taskText, date: taskDate, completed: false });
        saveTasks();
        renderTasks();
        document.getElementById("taskInput").value = "";
        document.getElementById("taskDate").value = "";
    } else {
        alert("Please enter task and date!");
    }
});

renderTasks();
