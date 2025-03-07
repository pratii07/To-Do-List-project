const input = document.getElementById('input')
const addbtn = document.getElementById("addbtn")
const tasksList = document.querySelector('.tasks-list')
const alltask = document.querySelector('#alltask')
const completedtasks = document.querySelector('#completedtasks')
const pendingtasks = document.querySelector('#pendingtasks')

// to store task in local storage 
const tasks = JSON.parse(localStorage.getItem('tasks')) || []

// const tasks = []
const all_tasks = []
const completed_Tasks =[]

// to add task 
addbtn.addEventListener('click',function(){
    const task = input.value.trim()

    if(task === '') return
    tasks.push({task:task,status:false})
    all_tasks.push({task:task,status:false})
    saveTasksToLocalStorage();
    RenderTasks();
    input.value = ''

})

// to render tasks
function RenderTasks(){
    tasksList.innerHTML = ''

    for(let i=0;i<tasks.length;i++){
        const taskItem = document.createElement("li")
        taskItem.textContent = tasks[i].task
        taskItem.classList.add('task-item')
        tasksList.appendChild(taskItem)

        show_button(taskItem,i)
    }
}

// for task completion and deletion
function show_button(taskItem,i){
    const donebtn = document.createElement("button")
    donebtn.textContent = 'Done'
    donebtn.classList.add('done-btn')

    const deletebtn =document.createElement("button")
    deletebtn.textContent = "X"
    deletebtn.classList.add('delete-btn')

    taskItem.appendChild(donebtn)
    taskItem.appendChild(deletebtn)

    tasksList.appendChild(taskItem)

    donebtn.addEventListener('click',function(){
        Mark_Completed(i) 
    }) 

    deletebtn.addEventListener('click',function(){
        tasks.splice(i,1)
        saveTasksToLocalStorage();
        RenderTasks()
    })
}

// Move completed task to the completed list
function Mark_Completed(index){
    tasks[index].status = true;
    completed_Tasks.push(tasks[index])
    tasks.splice(index,1)
    RenderTasks()
}

// to display list of tasks based on the provided data
alltask.addEventListener('click',function(){
    tasksList.innerHTML = ''
    show_tasks(all_tasks,true)
})

completedtasks.addEventListener('click',function(){
    tasksList.innerHTML = ''
    show_tasks(completed_Tasks,false);
})

pendingtasks.addEventListener('click',function(){
    tasksList.innerHTML = ''
    show_pending_tasks(tasks);
})

// to display btns base on condition
function show_tasks(TaskToShow,showbtn){

    for(let i=0;i<TaskToShow.length;i++){
        const taskItem = document.createElement('li')
        taskItem.textContent=TaskToShow[i].task
        taskItem.classList.add('complted-task')
        tasksList.appendChild(taskItem)   

        if(showbtn){
            show_button(taskItem,i)
        }
    }
}

// Filter and display only pending tasks
const pending_tasks = []
function show_pending_tasks(tasks){
    pending_tasks.length = 0;
    
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].status === false){
            pending_tasks.push(tasks[i])
        }
    }
    show_tasks(pending_tasks,true)

}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
