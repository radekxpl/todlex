import React, { useState, useEffect } from "react";
import App from "./App"
import Axios from "axios"

export const MainPage = (props) => {
  const [userData, setUserData] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [allUserTodos, setAllUserTodos] = useState({});

  const { userInfo } = props
  
  useEffect(() => {
    const storedTodos = localStorage.getItem("userTodos");
    if (storedTodos) {
      setUserTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userTodos", JSON.stringify(userTodos));
  }, [userTodos]);

  useEffect(() => {
    console.log("Loading user todos from local storage...");
    const storedTodos = localStorage.getItem("userTodos");
    if (storedTodos) {
      setUserTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        fetch("/api/todos")
          .then((response) => response.json())
          .then((data) => setAllUserTodos(data))
          .catch((error) => console.error(error.response.data));
      })
      .catch((error) => console.error(error));
  }, []);

  
  let userTodoItems;

  function showUserTodoItems(){
    Axios.post('http://localhost:3001/user/info', {
      userId: userInfo[0].id
    }).then((response) => {
      console.log(response)
    })

    if(JSON.parse(userInfo[0].todos) != null){
      userTodoItems = JSON.parse(userInfo[0].todos).map(obj => {
        return <li key={obj.id}><div id='list-element'><div className="list-point"></div>{obj.name}</div></li>;
      });
    }
  }

  function handleAddTodoClick() {
    if (buttonClickCount === 0) {
      showUserTodoItems()
      const addTodoDiv = document.getElementById("add-todo");
      const todoInput = document.createElement("input");
      todoInput.id = "add-todo-input";
      todoInput.name = "todo_name"
      addTodoDiv.appendChild(todoInput);
      setButtonClickCount(1);
    } else if (buttonClickCount === 1) {
      const todoInput = document.getElementById("add-todo-input");
      const todoValue = todoInput.value;
      const userId = userInfo[0].id;

      
      console.log(userId, todoValue)
      Axios
        .post(`http://localhost:3001/api/user/todos`, { todo: todoValue, userId: userId })
        .then((response) => {
          console.log(response.data);
          setAllUserTodos(response.data);
        })
        .catch((error) => console.error(error));
  
      setUserTodos((prevTodos) => [...prevTodos, todoValue]);
      todoInput.remove();
      setInputValue("");
      setButtonClickCount(0);
    }
  }

  showUserTodoItems()
  
  return (
    <>
    
        <div id="menu">
            <div id="profile">
            <img id="profile-picture" src="" alt="profile picture"></img>
            <div id="experience-circle"></div>
            <div id="level-box"></div>
            </div>
        </div>
        <div id="flex-view">
            <div id="personal-challenges">
                <p>Witaj<br/>{userInfo[0].name} {userInfo[0].surname}</p>
                <div>
                    <p>Twoje zadania</p>
                    <div id="personal-challenges-box">
                    <ul id="personal-challenges-list">
                      {userTodoItems}
                    </ul>
                    <div id="add-todo">
                <button id="add-todo-button" onClick={handleAddTodoClick}>Dodaj</button>
              </div>
          </div>
        </div>
        </div>
            <div id="daily-challenges">
                <p>Zadania dnia</p>
                <div id="daily-challenges-box">
                    <ul id="daily-challenges-list">
                        {App.dailyChallengesList}
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}

export default MainPage