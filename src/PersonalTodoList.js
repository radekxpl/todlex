import { useState } from "react";
import { user } from "./App";

function PersonalTodoList() {
    const [inputValue, setInputValue] = useState("");
    const [inputShown, setInputShown] = useState(false);
  
    function handleAddTodoClick() {
      if (!inputShown) {
        setInputShown(true);
        const addTodoDiv = document.getElementById("add-todo");
        const todoInput = document.createElement("input");
        todoInput.id = "add-todo-input";
        addTodoDiv.appendChild(todoInput);
      } else {
        const todoInput = document.getElementById("add-todo-input");
        const inputVal = todoInput.value;
        setInputValue(inputVal);
        todoInput.remove();
        setInputShown(false);
        user.addTodo(inputVal);
      }
    }
}  

export default PersonalTodoList & user;