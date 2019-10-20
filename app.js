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
  //need event delegation  Remove task event
  taskList.addEventListener('click',removeTask);
  // clear task event
  clearBtn.addEventListener('click',clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  

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
  link.innerHTML = '<i class="fa fa-times"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // Clear input
  taskInput.value =''
  console.log(li);

  e.preventDefault();

}

// Remove Task
function removeTask(e){
  //event delegation (when click the collection)
  if(e.target.parentElement.classList.contains('delete-item')){
    
  //parent to the parent to get the li
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();
    }
  
  }
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