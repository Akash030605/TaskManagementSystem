document.getElementById('taskForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    const task = {
        name: taskName,
        description: taskDescription
    };

    // Send a POST request to create a new task
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const createdTask = await response.json();
        addTaskToList(createdTask);
        clearForm();
    } else {
        console.error('Failed to create task');
    }
});

// Function to add the task to the UI
function addTaskToList(task) {
    const taskList = document.getElementById('tasks');
    const li = document.createElement('li');
    li.textContent = `${task.name}: ${task.description}`;
    taskList.appendChild(li);
}

// Function to clear the form
function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
}

// Fetch and display all tasks when the page loads
async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    tasks.forEach(task => addTaskToList(task));
}

loadTasks(); // Call this function to load tasks on page load
