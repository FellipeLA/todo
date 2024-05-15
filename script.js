function incluir(){
    let description = document.getElementById('description');

    if(description.value == ''){
        let message_type = document.getElementById('message_type');
        message_type.innerText = 'Erro:';

        let message_type = document.getElementById('message');
        message_type.innerText = 'você precisa descrever a nova tarefa';
        
        let alert_box = document.getElementById('alert');
        alert.style.display = 'block';
        
    }
}