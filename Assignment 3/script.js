document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const dayModeBtn = document.getElementById('dayModeBtn');
    const nightModeBtn = document.getElementById('nightModeBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Function to render tasks from the 'tasks' array
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn"><i class="fa-solid fa-pencil"></i></button>
                    <button class="delete-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
            saveTasks();
        }
    }
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Handle task list events (complete/delete)
    taskList.addEventListener('click', (e) => {
        // Mark as completed
        if (e.target.classList.contains('task-checkbox')) {
            const index = e.target.getAttribute('data-index');
            tasks[index].completed = e.target.checked;
            e.target.parentNode.classList.toggle('completed');
            saveTasks();
        }
        // Delete task
        if (e.target.closest('.delete-btn')) {
            const index = e.target.closest('.delete-btn').getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
        }
    });

    // Day/Night Mode Toggles
    dayModeBtn.addEventListener('click', () => {
        document.body.classList.remove('dark-mode');
    });

    nightModeBtn.addEventListener('click', () => {
        document.body.classList.add('dark-mode');
    });

    // Initial render of tasks
    renderTasks();
});