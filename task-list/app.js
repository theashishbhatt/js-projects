//Define UI Vars 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

//Load all event listners
loadEventListeners();

//Function for loading all the events

function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task events
    clearBtn.addEventListener('click', clearTasks);

    //Filter task 
    filter.addEventListener('keyup', filterTask);
}

// Get Tasks
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');
        //Adding class to list item

        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');
        
        //Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = ' <i class="small material-icons">clear</i>';
        //Append the link to li
        li.appendChild(link);
        // Append the li to ul

        taskList.appendChild(li);

    })
}


// Add Task 


function addTask(e){
    if (taskInput.value === "") {
        alert('Write the task you want to add');
    }

    //create li element
    const li = document.createElement('li');
    //Adding class to list item

    li.className = 'collection-item';

    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = ' <i class="small material-icons">clear</i>';
    //Append the link to li
    li.appendChild(link)
    // Append the li to ul

    taskList.appendChild(li);


    // Store in local storage
    storeTaskInLocalStorage(taskInput.value)

    //Clear input

    taskInput.value = '';


    e.preventDefault();


}

// Store task

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();

        //Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// Remove Task from ls

function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem.textContent);
    let tasks;
      
//     if(localStorage.getItem('tasks') === null){
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     } 
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task){
        if(taskItem.textContent === task) {
        //tasks.splice(index, 1);
        console.log(tasks)
        }
        //localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
}

// Clear Tasks

function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from ls

    clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage(){
    localStorage.clear();
};

function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        } else {
            task.style.display = 'none'
        }
    })
    
}