import express from "express"
import producManager from "./ProductManager.js"

const app = express ()
app.use(express.urlencoded({extended:true}))
const PORT = 8080

const productos = new producManager()
const producotsJSON = productos.tranformarJSON()
productos.buscarProductoPorId()


app.get ("/products" , async (req , res)  =>{
    let limit = Number(req.query.limit)
    let productosEspera = await producotsJSON
    let productosPedidos = productosEspera.slice(0,limit)
    if (!limit) {return  res.send ( productosEspera)}
    else {return  res.send ( productosPedidos)}      
}    
)

app.get("/products/:id", async (req , res) =>{
    let producto = (await productos.buscarProductoPorId(req.params.id) )
    res.send (producto) 
})


app.listen(PORT, ()=>{
console.log("server abierto");
})



/*tuve que poner a index y carrito en scr porque me tiraba error que no encontraba
la carpeta de carrito y no me dejaba seguir */





/* no estria entendiendo porque este codigo no me serviria
para lo de buscar los productos que pongo en el link


esto me dice los productos
for (let i = 0;i < 5 ; i++) {
    let productoLimit = (await productos.buscarProductoPorId(i + 1) )
}

    app.get ("/products" , async (req , res)  =>{
    let limit = Number(req.query.limit)
    if (!limit) {return  res.send (await producotsJSON)}
    else {for (let i = 0;i < limit ; i++) {
        let productoLimit = (await productos.buscarProductoPorId(i + 1) )
        console.log(i);
        console.log(limit);
        res.send (await productoLimit)
}    
) y se corta en la segunda vuelta y no sabria porque */