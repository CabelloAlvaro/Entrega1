const express = require("express");
const app = express();
const productosRouter = require("./routes/productos");
const carritoRouter = require("./routes/carrito");


app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

app.get("/", (req, res) => {
    res.send("Pruebe desde postman")
});

app.get("*", (req, res) => {
    res.json("Error: metodo no implementado");
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
server.on('error', err => console.log( 'Error at server: ' + err ));