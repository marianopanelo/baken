import caritoManager from "./caritomanager.js"

let carrito = new caritoManager()

let persistirCarrito = async() =>{
   await carrito.agregarProductoCarrito(22)
   await carrito.agregarProductoCarrito(22)
   await carrito.agregarProductoCarrito(22)
   await carrito.agregarProductoCarrito(23)
   await carrito.agregarProductoCarrito(23)
   await carrito.agregarProductoCarrito(24)
   await carrito.agregarProductoCarrito(24)
   await carrito.agregarProductoCarrito(24)
   await carrito.agregarProductoCarrito(24)

}

persistirCarrito()

