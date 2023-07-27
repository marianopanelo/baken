import express from "express"
import productosroutes from "./routes/productos.routes.js"
import carritoroutes from "./routes/carrito.routes.js"

const app = express ()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/productos', productosroutes);
app.use('/api/carrito', carritoroutes);


app.listen(PORT, ()=>{
console.log("server abierto");
})


