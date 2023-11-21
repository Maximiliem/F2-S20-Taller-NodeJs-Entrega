const express = require('express');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ASADITO CON EL DUENDE"

const edificiosRouter = require("./routes/edificiosRoute");

const app = express();
const puerto = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('<h1>Bienvenid@ al servidor de Genova SRL</h1>');
});

app.post("/login", (req, res) =>{
  const {username, password} = req.body;
  if(username === "duende" && password === "cortez"){
    const token = jwt.sign({username}, SECRET_KEY);
    res.status(200).json({token});
  } else {
    res.status(401).json({message: "Usuario y/o contraseña incorrecto"})
  }
});

// Midelware para autorizar la realización de peteiciones a /edificios
app.use("/edificios", (req, res, next)=>{
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch(err){
    res.status(401).json({message: "Usuario no autorizado"})
  }
})

app.use("/edificios", edificiosRouter);


app.listen(puerto, ()=>{
    console.log(`Servidor en http://localhost:${puerto}`)
});