const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: "",
    database: 'todlex'
})

app.post('/register', (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const password_hash = req.body.password
    

    db.query(
        "INSERT INTO todlex.users (name, surname, email, password_hash) VALUES (?, ?, ?, ?)",
        [name, surname, email, password_hash],
        (err, result) => { 
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }
            res.status(200).send('User registered successfully');
        }
    );

    db.query(
        "SELECT todos FROM users WHERE email = ?",
        [email],
        (err, result) => {
            const todos = JSON.parse(userInfo[0].todos)
        }
    )
});

app.post('/api/user/todos', (req, res) => {
    const userId = req.body.userId;
    const todo  = req.body.todo;

    console.log(userId, todo)
    // fetch the user's existing todos JSON field from the database
  db.query(
    'SELECT todos FROM users WHERE id = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Internal server error');
      }

      const todos = JSON.parse(result[0].todos || '[]');

      // add the new todo to the user's todos array
      todos.push({
        name: todo,
        completed: false
      });

      // update the user's todos JSON field in the database
      db.query(
        'UPDATE users SET todos = ? WHERE id = ?',
        [JSON.stringify(todos), userId],
        (err) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Internal server error');
          }

          res.status(200).send('Todo added successfully');
        }
      );
    })
});

app.post('/login', (req, res) => {
    const email = req.body.email
    const password_hash = req.body.password

    db.query(
        "SELECT * FROM todlex.users WHERE email = ? AND password_hash = ?",
        [email, password_hash],
        (err, result) => { 
            if(err){
                console.log(err);
                return res.status(500).send('Internal server error');
            } 

            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(401).json({message: "Incorrect email or password"});
            }
        }
    ); 
});

app.post('/user/info', (req, res) => {
    const userId = req.body.id;
    db.query(
        'SELECT todos FROM users WHERE id = ?',
        [userId],
        (err, result) => {
          
        })
})

app.listen(3001, () => {
    console.log('server is running')
});