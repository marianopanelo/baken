import fs from "fs"


export default class caritoManager {
    #caritoDirPath;
    #carritoFilePath;
    products

    constructor(){
        this.carrito = []
        this.#caritoDirPath = "./carrito"
        this.#carritoFilePath = this.#caritoDirPath + "/carrito.json"
        this.fileSystem = fs
    }

    static cantidad = Number()

    agregarProductoCarrito = async(id) =>{
        
        let car = {
            id,
            cantidad : caritoManager.cantidad
        }
        

        await this.fileSystem.promises.mkdir(this.#caritoDirPath,{recursive:true})
        if (!this.fileSystem.existsSync(this.#carritoFilePath)){
            await this.fileSystem.promises.writeFile(this.#carritoFilePath, "[]")
        }

        let leercarrito = await this.fileSystem.promises.readFile(this.#carritoFilePath, "utf-8")
        this.carrito =  JSON.parse(leercarrito)
        

        if (this.carrito.find ((producto =>producto.id == id )) ){
            this.carrito.find(producto =>producto.id == id ).cantidad++
            await this.fileSystem.promises.writeFile(this.#carritoFilePath, JSON.stringify(this.carrito,null, 2, "/t"))
            
        }else{
            car.cantidad++
            this.carrito.push(car)
            await this.fileSystem.promises.writeFile(this.#carritoFilePath, JSON.stringify(this.carrito,null, 2, "/t"))
        }
    }

    tranformarCarritoJSON = async () => {
        if (this.#carritoFilePath != []) {
        let respuestasArregloCarrito = await this.fileSystem.promises.readFile(this.#carritoFilePath, "utf8")
        return JSON.parse(respuestasArregloCarrito)
        }else{
        console.log("error");}
    }

    tranformarCarritoString = async () =>{
        let respuesta = await this.fileSystem.promises.readFile(this.#carritoFilePath,"utf-8" )       
        return respuesta; 
    }

    buscarProductoEnCarritoPorId = async (id) =>{
        let arreglo = await this.tranformarCarritoJSON()
        if(!arreglo.find (producto =>producto.id == id )){    
        return ("producto no encontrado con ese id")
        }else{
            return (arreglo.find((producto) =>producto.id == id ))
        }
    }

    borrarProductoEnCarritoPorID = async (id) =>{
        let arreglo1 = await this.tranformarCarritoJSON()
        let productosFiltradosEnCarrito = arreglo1.filter(producto =>producto.id != id )
        await this.fileSystem.promises.writeFile(this.#carritoFilePath,JSON.stringify(productosFiltradosEnCarrito,null, 2, "/t"))

    }

}

//const carrito = new caritoManager()

//carrito.tranformarCarritoJSON()

/*me salio lo de agregar producto */
//carrito.agregarProductoCarrito(13)