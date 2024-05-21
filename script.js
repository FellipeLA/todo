let taskList = [];

function addTask(event) {
    event.preventDefault();
    let description = document.getElementById('description');
    if (description.value == '') {
        showMessage();
    } else {
        taskList.push(description.value);
        description.value = '';
        updateTasks();
    }
}

function closeMessage() {
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}

function showMessage() {
    let message_type = document.getElementById('message_type');
    message_type.innerText = 'Erro: ';

    let message = document.getElementById('message');
    message.innerText = 'Você precisa descrever a nova tarefa.';

    let alert = document.getElementById('alert');
    alert.style.display = 'block'; setTimeout(() => {
        closeMessage();
    }, 4000);
}

function updateTasks() {
    let divTasks = document.getElementById('tasks');
    if (taskList.length > 0) {
        let newOl = document.createElement('ol');

        taskList.forEach((task) => {
            let newLi = document.createElement('li');
            newLi.innerText = task;
            newOl.appendChild(newLi);
        });
        divTasks.replaceChildren(newOl);
    }else{
        let p = document.createElement('p');
        p.innerText = 'Insira a primeira tarefa para começar....';
        divTasks.replaceChildren(p);
    }
}

function removeAll() {
    taskList = [];
    updateTasks();
}