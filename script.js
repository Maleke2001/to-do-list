document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const task = taskInput.value.trim();
    const taskId = generateUniqueId();

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task}</span>
        <button onclick="updateTask('${taskId}')">Update</button>
        <button onclick="deleteTask('${taskId}')">Delete</button>
    `;

    taskList.appendChild(li);

    saveTask(taskId, task);

    taskInput.value = '';
}

function generateUniqueId(prefix = 'id') {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

function saveTask(id, task) {
    let tasks = getTasksFromStorage();
    tasks[id] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || {};
}
function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = getTasksFromStorage();

    for (const id in tasks) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tasks[id]}</span>
            <button onclick="updateTask('${id}')">Update</button>
            <button onclick="deleteTask('${id}')">Delete</button>
        `;
        taskList.appendChild(li);
    }
}

function deleteTask(id) {
    const taskList = document.getElementById('taskList');
    const tasks = getTasksFromStorage();

    delete tasks[id];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = document.querySelector(`[onclick="deleteTask('${id}')"]`).parentElement;
    taskList.removeChild(li);
}

function updateTask(id) {
    const tasks = getTasksFromStorage();
    const updatedTask = prompt('Update task:', tasks[id]);

    if (updatedTask !== null) {
        tasks[id] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const span = document.querySelector(`[onclick="updateTask('${id}')"]`).previousElementSibling;
        span.textContent = updatedTask;
    }
}