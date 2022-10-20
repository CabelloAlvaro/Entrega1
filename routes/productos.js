const express = require("express");
const { Router } = express;
const Contenedor = require("../utils/Contenedor");
const db = "./utils/items.json";
const productos = new Contenedor(db);
const routerProductos = new Router();
const administrador = true;

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true })); 


//GET productos
routerProductos.get("/", async (req, res) => {
    const prods = productos.getAll();
    const resultado = await prods;
    res.json(resultado);
});


routerProductos.get("/:id", async (req, res) => {
    const id = req.params.id;
    const filtrado = productos.getById(id);
    const resultado = await filtrado;
    if (!resultado) {
        res.json({ message: "El id buscado no existe" });
    } else {
        res.json(resultado);
    }
});


routerProductos.post("/", async (req, res) => {
    if (administrador) {
        const item = req.body;
        const itemAgregado = productos.save(item);
        const resultado = await itemAgregado;
        const getAll = await productos.getAll();
        res.send(resultado);
    } else {
        res.send("ruta no disponible");
    }
});

//PUT
routerProductos.put("/:id", async (req, res) => {
    if (administrador) {
        const id = req.params.id;
        const item = req.body;
        const prod = await productos.update(item, id);
        res.json(prod);
    } else {
        res.send("ruta no disponible");
    }
});

routerProductos.delete("/:id", async (req, res) => {
    if (administrador) {
        const id = req.params.id;
        const nuevoArray = await productos.deletByID(id);
        res.send(nuevoArray);
    } else {
        res.send("ruta no disponible");
    }
});

module.exports = routerProductos;