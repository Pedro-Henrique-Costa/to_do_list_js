// Seleção de elementos
const todoForm = document.querySelector("#to-do-form");
const todoInput = document.querySelector("#to-do-input");
const todoList = document.querySelector("#to-do-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const toolbar = document.querySelector("#toolbar");

let oldInputValue;


// Funções
const saveTodo = (text) => {

    //Criação da caixinha da tarefa na lista
    const todo = document.createElement("div")
    todo.classList.add("to-do")

    const h3 = document.createElement("h3")
    h3.innerText = text
    todo.appendChild(h3)

    //Botão de Check
    const finishBtN = document.createElement("button")
    finishBtN.classList.add("finish-to-do")
    finishBtN.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(finishBtN)

    //Botão de Edit
    const editBtN = document.createElement("button")
    editBtN.classList.add("edit-to-do")
    editBtN.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtN)

    //Botão de Delete
    const deleteBtN = document.createElement("button")
    deleteBtN.classList.add("remove-to-do")
    deleteBtN.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtN)

    todoList.appendChild(todo)

    todoInput.value = '';
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".to-do")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}
 
// Eventos

//Envio do form
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value

    if(inputValue){
       saveTodo(inputValue);
    }
});

// Botões
document.addEventListener("click", (e) => {

    const targetEl = e.target
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    // Click botão de check da lista de tarefas
    if(targetEl.classList.contains("finish-to-do")){
        parentEl.classList.toggle("done");
    }

    // Click botão de edit da lista de tarefas
    if(targetEl.classList.contains("edit-to-do")){
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    // Click botão de delete da lista de tarefas
    if(targetEl.classList.contains("remove-to-do")){
        parentEl.remove();
    }

});

// Cancelar Edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms()
})

