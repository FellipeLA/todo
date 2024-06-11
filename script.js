let taskList = [];

// Função para carregar as tarefas salvas no localStorage ao iniciar a página
function taskLoad() {
    let list = localStorage.getItem('taskList');
    taskList = list ? JSON.parse(list) : [];
    updateTasks();
}

// Função para adicionar uma nova tarefa
function addTask(event) {
    event.preventDefault();
    let descriptionInput = document.getElementById('description');
    let description = descriptionInput.value.trim(); // Removendo espaços em branco extras
    if (description === '') {
        showMessage('Erro: ', 'Você precisa descrever a nova tarefa.', 'error');
    } else {
        let newTask = {
            description: description,
            completed: false
        };
        taskList.push(newTask);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        descriptionInput.value = ''; // Limpa o campo de entrada
        updateTasks();
    }
}

// Função para atualizar a lista de tarefas na interface
function updateTasks() {
    let divTasks = document.getElementById('tasks');
    let button = document.querySelector('main > button');

    if (taskList.length > 0) {
        let newOl = document.createElement('ol');

        taskList.forEach((task, index) => {
            let newLi = document.createElement('li');
            newLi.textContent = task.description; 

            // Adicionando um botão para marcar tarefa como concluída
            let completeButton = document.createElement('button');
            completeButton.textContent = 'FEITO!';
            completeButton.className = 'complete-button';
            completeButton.onclick = () => toggleTaskCompletion(index);
            newLi.appendChild(completeButton);

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => removeTask(index);

            newLi.appendChild(deleteButton);
            newOl.appendChild(newLi);

            if (task.completed) {
                newLi.classList.add('completed');
            }
        });
        divTasks.replaceChildren(newOl);
        button.disabled = false;
    } else {
        let p = document.createElement('p');
        p.textContent = 'Insira a primeira tarefa para começar....';
        divTasks.replaceChildren(p);
        button.disabled = true;
    }
}

// função de concluir tarefas
function toggleTaskCompletion(index) {
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasks();
}

// Função para remover individualmente 
function removeTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasks();
}

// remover tudo da lista
function removeAll() {
    taskList = [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasks();
}

// função para exibir mensagem
function showMessage(type, message, messageType) {
    let message_type = document.getElementById('message_type');
    message_type.innerText = type;

    let messageElement = document.getElementById('message');
    messageElement.innerText = message;

    let alert = document.getElementById('alert');
    alert.style.display = 'block';

    if (messageType === 'success') {
        alert.classList.add('success');
    } else {
        alert.classList.remove('success');
    }

    setTimeout(() => {
        closeMessage();
    }, 6000);
}

// Função para fechar a mensagem
function closeMessage() {
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
    alert.classList.remove('success');
}

// filtro
function filterTasks() {
    let filterInput = document.getElementById('filter').value.toLowerCase();
    let filteredTasks = taskList.filter(task => task.description.toLowerCase().includes(filterInput));
    let divTasks = document.getElementById('tasks');

    if (filteredTasks.length > 0) {
        let newOl = document.createElement('ol');

        filteredTasks.forEach((task, index) => {
            let newLi = document.createElement('li');
            newLi.textContent = task.description;

            let completeButton = document.createElement('button');
            completeButton.textContent = 'FEITO!';
            completeButton.className = 'complete-button';
            completeButton.onclick = () => toggleTaskCompletion(index);
            newLi.appendChild(completeButton);

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => removeTask(index);

            newLi.appendChild(deleteButton);
            newOl.appendChild(newLi);

            if (task.completed) {
                newLi.classList.add('completed');
            }
        });
        divTasks.replaceChildren(newOl);
    } else {
        let p = document.createElement('p');
        p.textContent = 'Nenhuma tarefa encontrada.';
        divTasks.replaceChildren(p);
    }
}

// função que escolhe aleatoriamente uma task
function chooseRandomTask() {
    if (taskList.length === 0) {
        showMessage('Erro: ', 'Não há tarefas para escolher.', 'error');
        return;
    }
    let randomIndex = Math.floor(Math.random() * taskList.length);
    let randomTask = taskList[randomIndex].description;
    showMessage('Tarefa escolhida: ', randomTask, 'success');
}
