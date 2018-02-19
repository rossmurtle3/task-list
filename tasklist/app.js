// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      //Create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and appened to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }

//Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

  //Create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and appened to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  // Store to LS
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  e.preventDefault();
}

//Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    //remove from ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(){
  // taskList.innerHTML = '';

  //Faster
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //CLear from LS
  clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }

  });
}