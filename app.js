// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add Task Event
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click',removeTask);
    // Clear task event
    clearBtn.addEventListener('click',clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup',filterTasks);
}

// Get Tasks from LS
function getTasks(params) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  //The localStorage always stores in the form of strings
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add a class
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add Icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to the li
        li.appendChild(link);

        // Append the li to the ul
        taskList.appendChild(li);
    });
}


// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  //The localStorage always stores in the form of strings
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure?')){

            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Tasks 
function clearTasks(e) {
    // taskList.innerHTML = '';

    // Faster (IMPORTANT)
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

// Filter Tasks
function filterTasks(e) {
    
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){   //Here we used querySelectorAll coz it returns a node list and hence we can use the forEach function which can otherwise be used only on arrays
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {   //Important [IndexOf property searches index of the text that is being searched]
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
            
        }
    }) //here task is our iterator
}