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
  // Add task event

  form.addEventListener('submit',addTask);


} 

//add task

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
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // Clear input
  taskInput.value =''
  console.log(li);

  e.preventDefault();

}