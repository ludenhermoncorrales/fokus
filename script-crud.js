const btnAddTarefa = document.querySelector('.app__button--add-task');
const btnCancelTask = document.querySelector('.app__form-footer__button--cancel')
const formAddTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ultask = document.querySelector('.app__section-task-list')
const paragraphDescriptionTask = document.querySelector('.app__section-active-task-description')

const btnRemoveTaskCompleted = document.querySelector('#btn-remover-concluidas')
const btnRemoveAllTask = document.querySelector('#btn-remover-todas')


let listTask = JSON.parse(localStorage.getItem('fullTarefas')) || [];

function tuUpdateTask() {
    localStorage.setItem('fullTarefas', JSON.stringify(listTask))
}
let selectedTask = null;
let liForSelectedTask = null;

// Creat task 
function creatElementTask(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`

    const paragraph = document.createElement('p')
    paragraph.textContent = tarefa.descricao
    paragraph.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    button.textContent = 'EDITAR'
    button.classList.add('app_button-edit')

    const imgButton = document.createElement('img')
    imgButton.setAttribute('src', 'imagens/edit.png')

    button.onclick = () => {
        // debugger
        const newDescription = prompt('Qual a nova da tarefa?');
        // console.log('New description task -->', newDescription)
        if (newDescription) {
            // Altera a camada visual da tela
            paragraph.textContent = newDescription;
            // salva na localStorage (application) a nova descrição
            tarefa.descricao = newDescription;
            tuUpdateTask();
        }
    }

    button.append(imgButton)

    li.append(svg)
    li.append(paragraph)
    li.append(button)

    if (tarefa.complet) {

        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled', 'disabled')
    } else {
        // li escuta o click na tarefa existene após inclui com .textContent a descrição da tareda dentro da classe: app__section-active-task-description
        li.addEventListener(`click`, () => {
            paragraphDescriptionTask.textContent = tarefa.descricao
            document.querySelectorAll('.app__section-task-list-item-active').forEach(element => {
                element.classList.remove('app__section-task-list-item-active')
            });

            if (selectedTask == tarefa) {
                // debugger
                paragraphDescriptionTask.textContent = ``
                li.classList.remove(`app__section-task-list-item-active`)
                selectedTask = null;
                liForSelectedTask = null
                return
            }

            selectedTask = tarefa;
            liForSelectedTask = li;
            li.classList.add(`app__section-task-list-item-active`)
        })
    }


    return li
}

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

// ------------------------------------------------

// Leiura do click do botão cancelar e limpar o campo textArea 

// btnCancelTask.addEventListener('click', () => {
// textArea.value = ''
// formAddTarefa.classList.add('hidden')
// })

const clearTextArea = () => {
    textArea.value = '';
    formAddTarefa.classList.add('hidden');
}

btnCancelTask.addEventListener('click', clearTextArea)

// ------------------------------------------------


formAddTarefa.addEventListener('submit', (evento) => {
    // previne o comportamento padrão da pagina preventDefault();
    evento.preventDefault();
    // recebe o valor digitado dentro do formulario textArea
    const tarefa = {
        descricao: textArea.value
    }

    listTask.push(tarefa)
    const elementTask = creatElementTask(tarefa)
    ultask.append(elementTask)
    // permite acessar um objeto e salvar as informações 
    // Utilzamos a API JSON.stringify para converter String em objeto
    tuUpdateTask();
    textArea.value = ''
    formAddTarefa.classList.add('hidden')
})

listTask.forEach(task => {
    const elementTask = creatElementTask(task)
    ultask.append(elementTask)
});

document.addEventListener('focusFinish', () => {
    // debugger
    if (selectedTask && liForSelectedTask) {
        liForSelectedTask.classList.remove('app__section-task-list-item-active')
        liForSelectedTask.classList.add('app__section-task-list-item-complete')

        liForSelectedTask.querySelector('button').setAttribute('disabled', 'disabled')

        // Cria uma nova propriedade para lat selectedTask
        selectedTask.complet = true
        // Chama função atualiazar informações localStorage
        tuUpdateTask();
    }
})

btnRemoveTaskCompleted.addEventListener('click', () => {    
const selector = document.querySelectorAll('.app__section-task-list-item-complete');
selector.forEach(element => {
    element.remove();
})
listTask = listTask.filter(element => !element.complet)
tuUpdateTask()
})

btnRemoveAllTask.addEventListener('click', () => {
    const selector = document.querySelectorAll('.app__section-task-list-item');
    selector.forEach(element => {
        element.remove();
    })
    listTask = [];
    tuUpdateTask();
})
