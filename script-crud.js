const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAddTarefa= document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ultask = document.querySelector('.app__section-task-list')

const listTask = JSON.parse(localStorage.getItem('fullTarefas')) || [];

// Creat task 
function creatElementTask(tarefa) {
    const li= document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg= document.createElement('svg')
    svg.innerHTML=`<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`

        const paragraph= document.createElement('p') 
        paragraph.textContent = tarefa.descricao
        paragraph.classList.add('app__section-task-list-item-description')

        const button= document.createElement('button')
        button.textContent = 'EDITAR'
        button.classList.add('app_button-edit')

        button.onclick = () =>{
            prompt('Qual nome da tarefa?')
        }

        const imgButton= document.createElement('img')
        imgButton.setAttribute('src', 'imagens/edit.png')

        button.append(imgButton)

        li.append(svg)
        li.append(paragraph)
        li.append(button)

        return li
}

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

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
    localStorage.setItem('fullTarefas', JSON.stringify(listTask))
    textArea.value = ''
    formAddTarefa.classList.add('hidden')

})


listTask.forEach(task => {
    const elementTask= creatElementTask(task)
    ultask.append(elementTask)
});