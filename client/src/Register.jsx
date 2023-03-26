import React, { useState } from "react"
import Axios from 'axios'
import logo from "./logo-reverse.svg"


export const Register = (props) => {
    const [nameReg, setName] = useState("")
    const [surnameReg, setSurname] = useState("")
    const [emailReg, setEmail = useState] = useState("")
    const [passReg, setPass = useState] = useState("")
    
    const dupaReg = "dupa"

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3001/register', {
            name: nameReg,
            surname: surnameReg,
            email: emailReg,
            password: passReg,
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit}>
                <img src={logo}></img>
                <label htmlFor="name"><p>Imie</p>
                <input value={nameReg} onChange={(e) => setName(e.target.value)} type="text" placeholder="Jan" id="name" name="name"></input>
                </label>
                
                <label htmlFor="surname"><p>Nazwisko</p>
                <input value={surnameReg} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Kowalski" id="surname" name="surname"></input>
                </label>
                
                <label htmlFor="email"><p>E-mail</p>
                <input value={emailReg} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="jankowalski@gmail.com" id="email" name="email"></input>
                </label>
                
                <label htmlFor="password"><p>Hasło</p>
                <input value={passReg} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password"></input>
                </label>
                
                <input type="submit" value="Zarejestruj konto"></input>
                <button onClick={() => props.onFormSwitch('login')}>Masz już konto. Zaloguj się.</button>
            </form>
            
        </div>
    )
}