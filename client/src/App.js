import { useState, useEffect } from "react";
import { User } from "./User"
import { Login } from "./Login"
import { Register } from "./Register"

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
  const [currentForm, setCurrentForm] = useState('login')

  

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  
  return (
    <>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </>
  );
  
  
}

export default App;
