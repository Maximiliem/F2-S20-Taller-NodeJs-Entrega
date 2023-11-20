const express = require('express');
const mariadb = require("mariadb"); 
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ASADITO CON EL DUENDE"

const pool = mariadb.createPool({ 
  host: "localhost", 
  user: "root", 
  password:"palosanto", 
  database: "genovasrl", 
  connectionLimit: 5 });

const app = express();
const puerto = 3000;

app.use(express.json());


// Inicio de los endpoints - GET, POST, PUT, DELETE
//esto va a ir en modules creo
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

app.use("/edificios", (req, res, next)=>{
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch(err){
    res.status(401).json({message: "Usuario no autorizado"})
  }
})

app.get('/edificios', async (req, res)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, nombre_edificio, direccion_edificio, email_contacto FROM edificios"
        );

        res.json(rows);
    } catch (error) {
    res.status(500).json({message : "Ha ocurrido un error en el servidor."});
    } finally {
        if (conn) conn.release();
    }
});


app.get('/edificios/:id', async (req, res)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, nombre_edificio, direccion_edificio, email_contacto FROM edificios WHERE id=?",
            [req.params.id]
        );

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Ha ocurrido un error en el servidor"});
    }finally {
        if (conn) conn.release();
    }
});

app.post("/edificios", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO edificios(nombre_edificio, direccion_edificio, email_contacto) VALUE(?, ?, ?)`,
        [req.body.nombre_edificio, req.body.direccion_edificio, req.body.email_contacto]
      );
  
      res.json({ id: parseInt(response.insertId), ...req.body });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    } finally {
      if (conn) conn.release(); 
    }
  });

app.put("/edificios/:id", async (req, res) => {
    let conn;
    try {
        conn = await conn.getConnection();
        const response = await conn.query(
            "UPDATE edificios SET nombre_edificio=?, direccion_edificio=?, email_contacto=?, email_contacto, WHERE id=?",
            [req.body.nombre_edificio, req.body.direccion_edificio, req.body.email_contacto, req.params.id]
        );

        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor"});
    } finally {
        if (conn) conn.release();
    }
});

app.delete("/edificios/:id", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("DELETE FROM edificios WHERE id=?", [
        req.params.id,
      ]);
      res.json({ message: "Elemento eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    } finally {
      if (conn) conn.release(); 
    }
  });

app.listen(puerto, ()=>{
    console.log(`Servidor en http://localhost:${puerto}`)
});