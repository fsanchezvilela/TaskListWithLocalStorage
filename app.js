// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners 
loadEventListeners();


// Load all event listeners
function loadEventListeners(){
  // DOM Load Event (get all the localstorage and sesions)
  document.addEventListener('DOMContentLoaded',getTasks)
  // Add task event
  form.addEventListener('submit',addTask);
  //need event delegation  Remove task event
  taskList.addEventListener('click',removeTask);
  // clear task event
  clearBtn.addEventListener('click',clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  

} 

// Add task
function addTask(e){
  // add a task
  if(taskInput.value === ''){
    alert('Add a Task')
  } 

  // Create li elemement
  const li = document.createElement('li');
  // add Class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className='delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-times"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);


  // Clear input
  taskInput.value =''
  console.log(li);

  e.preventDefault();

}
// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  //check if we have tasks
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else {
    //only store strings
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.push(task);
  // save the local storage
  localStorage.setItem('tasks',JSON.stringify(tasks));

}
// Remove Task
function removeTask(e){
  //event delegation (when click the collection)
  if(e.target.parentElement.classList.contains('delete-item')){
    
  //parent to the parent to get the li
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();
    }
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  //check if we have tasks
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else {
    //only store strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // iterations
  tasks.forEach(function(task,index){
    //if the text == task
    if(taskItem.textContent === task){
      tasks.splice(index,1);
      // remove from the local storage
    } 
  })
  //set the new tasks with out the  item removed
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Clear Task
function clearTasks(){
  //taskList.innerHTML = '';

  //Faster
  while(taskList.firstChild){
    //remove all child of the task;
    taskList.removeChild(taskList.firstChild);
  }

  //innerhtml-vs-removechild 

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
  //get the text
  const text = e.target.value.toLowerCase();

  console.log(text)

  //node list 
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    //items
    //match the item we put in the value (si encuentra algun index existente muestra el task;)
    if(item.toLowerCase().indexOf(text) != -1){
      //show item
      task.style.display = 'block';
    }else{
      //hide item
      task.style.display = 'none';
    }
  })
}
// get Tasks from local storage
function getTasks(){
  let tasks;
  //check if we have tasks
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else {
    //only store strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create li elemement
  const li = document.createElement('li');
  // add Class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className='delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-times"></i>';
    // Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}

