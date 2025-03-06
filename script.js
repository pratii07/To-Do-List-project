const input = document.getElementById('input');
    const addbtn = document.getElementById('addbtn');
    const alltask = document.getElementById('alltask');
    const taskslist = document.querySelector('.tasks-list');
    const completedtasks = document.getElementById('completedtasks');
    const pendingtasks = document.getElementById('pendingtasks');

    // Retrieve tasks from localStorage (if any)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };


    // let tasks = [];

    // for adding input Text into an array(tasks)
    addbtn.addEventListener('click', function () {
    const task = input.value.trim();
    if (task) {
        tasks.push({ task, completed: false });
        input.value = '';
        saveTasks();
        renderTasks();
    }
    });

    // for rendering tasks on ui
    const renderTasks = (filter = 'all') => {
    let filteredTasks = [];

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }

    taskslist.innerHTML = ''; 

    filteredTasks.forEach(({ task, completed }, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${completed ? 'completed' : ''}`;
        taskItem.textContent = task;

        if (!completed) {
            const doneBtn = document.createElement('button');
            doneBtn.textContent = 'Done';
            doneBtn.className = 'done-btn';
            doneBtn.addEventListener('click', () => completeTask(index)); 
            taskItem.appendChild(doneBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'cancel-btn.';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        taskItem.appendChild(deleteBtn);

        taskslist.appendChild(taskItem); 
    });
    }

    // to mark a task as completed
    const completeTask = (index) => {
        tasks[index].completed = true;
        saveTasks();
        renderTasks();
    };

    // to delete a task by index
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Event listeners for filtering tasks
    alltask.addEventListener('click', () => renderTasks('all'));
    completedtasks.addEventListener('click', () => renderTasks('completed'));
    pendingtasks.addEventListener('click', () => renderTasks('pending'));


