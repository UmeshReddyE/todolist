const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('#filter-options button');


let tasks = [];


taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        const newTask = {
            id: Date.now(),
            text: taskInput.value.trim(),
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
});


function renderTasks(filter = 'all') {
    taskList.innerHTML = ''; 

    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filteredTasks.length === 0) {
        const message = document.createElement('li');
        message.classList.add('task-item');
        message.textContent = filter === 'completed' ? 'No tasks are completed' : 'No tasks';
        taskList.appendChild(message);
    } else {
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            
            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', () => toggleComplete(task.id));
            taskItem.appendChild(completeButton);

            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        });
    }
}


function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}


function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}


filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        renderTasks(filter);
    });
});