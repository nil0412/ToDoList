(function(){

    let tasks = [];
    var input = document.getElementById("input");
    const add = document.getElementById("add");
    const taskList = document.getElementById("list");
    const counter = document.getElementById("counter");

    function addToDOM(task){
        const li = document.createElement("li");

        li.innerHTML = `<input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.completed ? "checked" : ""}>\n<label for="${task.id}">${task.title}</label>\n<i class="fa-regular fa-trash-can" data-cls="delete" data-id="${task.id}"></i>`;

        taskList.append(li);
    }

    function renderList(){
        taskList.innerHTML = "";
        for(var i=0; i<tasks.length; i++){
            addToDOM(tasks[i]);
        }
    }

    function toggleTask(taskId){
        let toggle = tasks.filter(function(task){
            return task.id === Number(taskId);
        });

        toggle[0].completed = ! toggle[0].completed;
        renderList();
    }

    function addTask(task){
        tasks.push(task);
        renderList(task);
        counter.innerHTML = parseInt(counter.innerHTML)+1;
        return;
    }

    function deleteTask(taskId){
        let newTasks = tasks.filter(function(task){
            return task.id !== Number(taskId);
        });

        tasks = newTasks;
        renderList();

        counter.innerHTML = parseInt(counter.innerHTML)-1;
    }

    function showNotification(text){
        window.alert(text);
    }

    function handleClick(e){
        var target = e.target;

        if(target.id === 'add'){
            if(input.value === ""){
                showNotification("Enter valid task");
                return;
            }

            const task = {
                title : input.value,
                id : Date.now(),
                completed : false
            }

            input.value = "";
            addTask(task);
        }
        if(target.dataset.cls === "delete"){
            const taskId = target.dataset.id;
            deleteTask(taskId);
        }
        if(target.type === "checkbox"){
            toggleTask(target.id);
        }
    }

    function handleKeyPress(e){
        if(e.key === "Enter"){
            if(input.value === ""){
                showNotification("Enter valid task");
                return;
            }

            const task = {
                title : input.value,
                id : Date.now(),
                completed : false
            }

            input.value = "";
            addTask(task);
        }
    }

    function initializeApplication(){
        input.addEventListener("keyup", handleKeyPress);
        document.addEventListener("click", handleClick);
    }

    initializeApplication();
})()


