;(function(){
    "use strict"

    // ARMAZENAR O DOM EM VARIÁVEIS
    const itemInput = document.getElementById('item-input')     //BARRA DE NOVO ITEM
    const todoAddForm = document.getElementById('todo-add')    // TODO O FORMULARIO
    const ul = document.getElementById('todo-list')     //UL DA LISTA
    const lis = ul.getElementsByTagName('li')    // LI'S DA UL DA LISTA


    // ARRAY DE OBJETOS PARA AS LI'S A PARTIR DO SERVIDOR DO JAVA SCRIPT
    let arrTaks = [
        {
            name: 'task 1',
            createAt: Date.now(),
            completed: false,
        },
        {
            name: 'task 2',
            createAt: Date.now(),
            completed: false,
        }
    ]




    //MOSTRAR A LI NO CONSOLE QUANDO DER CLICK EM CIMA DELA
    //function addEventLi(li){
      //  li.addEventListener('click', function(){
        //    console.log(this)
        //})
    //}






    //CRIA UMA LI E UM PARAGRAFO DENTRO DA LI E RETORNA A PRÓPIA LI CRIADA
    function generateLiTask(obj){
        const li = document.createElement('li')
        const p = document.createElement('p')
        const checkButton = document.createElement('button')
        const editButton = document.createElement('i')
        const deleteButton = document.createElement('i')



        li.className = 'todo-item' 
        checkButton.className = 'button-check'
        checkButton.innerHTML = '<i class="fas fa-check displayNone data-action=checkButton"></i>'
        checkButton.setAttribute("data-action", "checkButton")

        li.appendChild(checkButton)

        p.className = 'task-name'
        p.textContent = obj.name
        li.appendChild(p)
        editButton.className = "fas fa-edit"
        editButton.setAttribute('data-action', 'editButton')
        li.appendChild(editButton)

        const containerEdit = document.createElement('div')
        containerEdit.className ='editContainer'
        const inputEdit = document.createElement('input')
        inputEdit.setAttribute('type', 'text')
        inputEdit.className = 'editInput'
        inputEdit.value = obj.name
        containerEdit.appendChild(inputEdit)       
        const containerEditButton = document.createElement('button')
        containerEditButton.className = 'editButton'
        containerEditButton.textContent = 'Edit'
        containerEditButton.setAttribute('data-action', 'containerEditButton')
        containerEdit.appendChild(containerEditButton)
        const containerCancelButton = document.createElement('button')
        containerCancelButton.className = 'cancelButton'
        containerCancelButton.textContent = 'Cancel'
        containerCancelButton.setAttribute('data-action', 'containercancelButton')
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)



        deleteButton.className = "fas fa-trash-alt"
        deleteButton.setAttribute("data-action", 'deleteButton')
        li.appendChild(deleteButton)

        //addEventLi(li)
        return li
    }







    //RENDERIZA(MOSTRA NA TELA) A LI CRIADA POR generateliTask()
    //VAI PERCORRER CADA ÍNDICE DO ARRAY DE ADICIONAR NA UL
    function renderTask(){
        ul.innerHTML = ''
        arrTaks.forEach(task => {
            ul.appendChild(generateLiTask(task))
        });
    }






    //ADICONAR UM OBJETO NO ARRAY
    function addTask(task){                 
       arrTaks.push({
        name: task ,
        createAt: Date.now(),
        completed: false,
       })
    }

  
    



    
    function clickedUl(e){
        
        //if(e.target.className === 'fas fa-edit')
        //if(e.target.classList.contains('fa-edit'))
        //if(e.target.getAttribute('data-action')=== 'editButton'){
            
            //   console.log('é edit')
            
            
            //switch(e.target.getAttribute('data-action')){
                //  case 'editButton':
                //    console.log('é edit no swich')
                //  break
            
                

        const dataAction = e.target.getAttribute('data-action')
        
        if(!dataAction) return

        let currentLi = e.target
        while(currentLi.nodeName !== 'LI'){
            currentLi = currentLi.parentElement
        }


        const currentliIndex = [...lis].indexOf(currentLi)

        const actions = {
            editButton : function(){
                const editContainer = currentLi.querySelector('.editContainer');
                [...ul.querySelectorAll('.editContainer')].forEach(container => {
                    container.removeAttribute('style')
                })
                editContainer.style.display = 'flex';

            },
            deleteButton : function(){
                arrTaks.splice(currentliIndex, 1)
                console.log(arrTaks)
                renderTask()  
            } ,
            containerEditButton : function(){
                const val =currentLi.querySelector('.editInput').value
                arrTaks[currentliIndex].name = val
                renderTask()
            } ,
            containercancelButton : function () {
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector('.editInput').value = arrTaks[currentliIndex].name
            }       
        }


        if(actions[dataAction]){
            actions[dataAction]()
        }
    }
   
    



    
    //ADD EVENTO NO FORMULÁRIO
    todoAddForm.addEventListener('submit', function(e){
        e.preventDefault()
        console.log(itemInput.value)
        addTask(itemInput.value)
        renderTask()
        itemInput.value = ''
        itemInput.focus()
    });

    ul.addEventListener('click', clickedUl)
    renderTask()
})()