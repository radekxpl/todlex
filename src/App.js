import { useState, useEffect } from "react";
import { User } from "./User"

const dailyChallenges = [
  ['Zrób pranie', 35],
  ['Posprzątaj pokój', 30],
  ['Umyj zęby', 5],
  ['Umyj naczynia', 15],
];

dailyChallenges.sort((a, b) => b[1] - a[1]);

const dailyChallengesList = dailyChallenges.map(challenge => {
  return <li><div id='list-element'><div class="list-point"></div>{challenge[0]}</div>  <div id="experience-box">{challenge[1]} exp</div></li>;
})

const user = new User("Radosław", "Gajewski", "https://cdn.discordapp.com/attachments/907309064873181205/1082656872055709767/72368900_1026279334372206_773878258344132608_n.jpg")

function App() {

  const [userData, setUserData] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [buttonClickCount, setButtonClickCount] = useState(0);

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

  function handleAddTodoClick() {
    if (buttonClickCount === 0) {
      const addTodoDiv = document.getElementById("add-todo");
      const todoInput = document.createElement("input");
      todoInput.id = "add-todo-input";
      addTodoDiv.appendChild(todoInput);
      setButtonClickCount(1);
    } else if (buttonClickCount === 1) {
      const todoInput = document.getElementById("add-todo-input");
      const todoValue = todoInput.value;
      setUserTodos((prevTodos) => [...prevTodos, todoValue]);
      todoInput.remove();
      setInputValue("");
      setButtonClickCount(0);
    }
  }

  const userTodoItems = userTodos.map((todo, index) => {
    return <li key={index}><div id='list-element'><div class="list-point"></div>{todo}</div></li>;
  });
  
  return (
    <>
      <div id="menu">
        <div id="profile">
          <img id="profile-picture" src={user.profile_picture} alt="profile picture"></img>
          <div id="experience-circle"></div>
          <div id="level-box">{user.level}</div>
        </div>
      </div>
    <div id="flex-view">
      <div id="personal-challenges">
        <p>Witaj<br/>{user.first_name} {user.sure_name}</p>
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
            {dailyChallengesList}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
  
  
}

export default App;
