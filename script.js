let input1 = document.querySelector(".input");
let task_list = document.querySelector(".task_list");
let add = document.querySelector(".btn");

//  Save tasks to localStorage
function savetaskToLS() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(task => {
        const text = task.querySelector(".task-text").innerText;
        const done = task.querySelector(".checkBox").checked;
        tasks.push({ text, done });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  Load tasks from localStorage
function loadtaskFromLS() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    storedTasks.forEach(taskobj => {
        const newtask = document.createElement('div');
        newtask.classList.add("task-item");

        const taskText = document.createElement("span");
        taskText.innerText = taskobj.text; //  use taskobj.text here
        taskText.classList.add("task-text");

        const delbtn = document.createElement('span');
        delbtn.innerHTML = "<i class='fas fa-trash'></i>";
        delbtn.classList.add("delBtn");

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add("checkBox");
        checkbox.checked = taskobj.done;

        if (taskobj.done) {
            taskText.classList.add("done");
        }

        checkbox.addEventListener("click", () => {
            taskText.classList.toggle("done", checkbox.checked);
            savetaskToLS();
        });

        delbtn.addEventListener("click", () => {
            newtask.remove();
            savetaskToLS();
        });

        newtask.appendChild(taskText);
        newtask.appendChild(checkbox);
        newtask.appendChild(delbtn);
        task_list.appendChild(newtask);
    });
}

//  Add new task
add.addEventListener("click", () => {
    if (input1.value.trim() !== "") {
        const newtask = document.createElement('div');
        newtask.classList.add("task-item");

        const taskText = document.createElement("span");
        taskText.innerText = input1.value;
        taskText.classList.add("task-text");

        const delbtn = document.createElement('span');
        delbtn.innerHTML = "<i class='fas fa-trash'></i>";
        delbtn.classList.add("delBtn");

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add("checkBox");

        checkbox.addEventListener("click", () => {
            taskText.classList.toggle("done", checkbox.checked);
            savetaskToLS();
        });

        delbtn.addEventListener("click", () => {
            newtask.remove();
            savetaskToLS();
        });

        newtask.appendChild(taskText);
        newtask.appendChild(checkbox);
        newtask.appendChild(delbtn);
        task_list.appendChild(newtask);

        savetaskToLS();
        input1.value = "";
    }
});

// Load tasks on page load
loadtaskFromLS(); 
