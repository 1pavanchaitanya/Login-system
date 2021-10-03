const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());

const dbPath = path.join(__dirname, "login.db");

let db = null;
 
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3030, () => {
      console.log("Server Running at http://localhost:3030/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
 
initializeDBAndServer();

app.post("/register", async (req, res) => {
    const { username, name, password, gender, location } = req.body;    
    const passwd = await bcrypt.hash(password, 10);        
    var query = `select * from user where username='${username}';`;
    var data = await db.get(query);
    if (password.length < 5) {
      res.status(400);
      //res.send("Password is too short");
      res.send({msg: "password too short"});      
    }
    if (data == undefined) {
      query = `insert into user values('${username}','${name}','${passwd}','${gender}', '${location}');`;
      await db.run(query);
      res.status(200);
      console.log('hello');
      //res.send("User created successfully");
      res.send({msg: 'success'});
    } else {
      res.status(400);
      res.send({msg:"User already exists"});
    }
  });

app.post("/login/", async (req, res) => {
const { username, password } = req.body;
var query = `select * from user where username='${username}';`;
var data = await db.get(query);
console.log(username);
if (data == undefined) {
    res.status = 400;
    res.send({msg: 'Invalid user'});
} else {
    const a = await bcrypt.compare(password, data.password);
    if (a === true) {
    res.status = 200;
    await db.run(query);
    res.send({msg: 'success'})
    } else {
    res.status = 400;
    res.send({msg: 'invalid password'})
    }
}
});

