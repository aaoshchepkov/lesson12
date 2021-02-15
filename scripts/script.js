'use strict';

const todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
let btnTodoComplete = document.querySelector('.header-button');

let todoData = [

];

document.addEventListener('keydown', function () {
  if (headerInput.value === '') {
    btnTodoComplete.disabled = true;
  } else {
    btnTodoComplete.disabled = false;
  }
});
document.addEventListener('mousedown', function () {
  if (headerInput.value === '') {
    btnTodoComplete.disabled = true;
  } else {
    btnTodoComplete.disabled = false;
  }
});

let getStorage = function(){
  todoData = JSON.parse(localStorage.todoList);
};

let saveStorage = function(){
localStorage.todoList = JSON.stringify(todoData);
};


const render = function () {
  headerInput.value = '';
  todoList.textContent = '';
  todoCompleted.textContent = '';
 
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    
    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', function () {
    todoData.splice(todoData.indexOf(item.value), 1);
      saveStorage();
      render();
      
    });

    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      saveStorage();
      render();
     
    });

  });

};


todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  saveStorage();
  render();
});

getStorage();
render();
