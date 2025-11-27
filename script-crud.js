const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAddTarefa= document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')

const listTask = [];

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

formAddTarefa.addEventListener('submit', (evento) => {
    // previne o comportamento padrão da pagina preventDefault();
    evento.preventDefault();
    // recebe o valor digitado dentro do formulario textArea
    const tarefa = {
        descicao: textArea.value
    }

    listTask.push(tarefa)
    // permite acessar um objeto e salvar as informações 
    // Utilzamos a API JSON.stringify para converter String em objeto
    localStorage.setItem('fullTarefas', JSON.stringify(listTask))
})

