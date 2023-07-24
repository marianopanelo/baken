import json from "stream/consumers"
import fs from "fs"
import { error } from "console";

export default class producManager {
    #userDirPath;
    #usersFilePath;
    #products

    constructor(){
        this.#products = []
        this.#userDirPath = "./carrito"
        this.#usersFilePath = this.#userDirPath + "/productos.json"
        this.fileSystem = fs
    }
    
    static id = 0 

    agregarProducto = async (title, descripcion, precio, imagen, codigo, stock) =>{
        
        producManager.id++ 

        let carrito = {
            title,
            descripcion,
            precio,
            imagen,
            codigo,
            stock,
            id : producManager.id
        }

        this.#products.push(carrito)
      
        await this.fileSystem.promises.mkdir(this.#userDirPath,{recursive:true})
        await this.fileSystem.promises.writeFile(this.#usersFilePath, JSON.stringify(this.#products,null, 2, "/t"))
    
    }

    tranformarJSON = async () => {
        if (this.#usersFilePath != []) {
        let respuestasArreglo = await this.fileSystem.promises.readFile(this.#usersFilePath, "utf8")
        return JSON.parse(respuestasArreglo)
        }else{
        console.log("error");}
    }

    getProducts = async () =>{
        let respuesta = await this.fileSystem.promises.readFile(this.#usersFilePath,"utf-8" )
        return respuesta; 
    }


    
    buscarProductoPorId = async (id) =>{
    let arreglo = await this.tranformarJSON()
    if(!arreglo.find (producto =>producto.id == id )){    
    return ("producto no encontrado con ese id")
    }else{
        return (arreglo.find((producto) =>producto.id == id ))
    }
    }

    borrarProductoPorID = async (id) =>{
        let arreglo1 = await this.tranformarJSON()
        let productosFiltrados = arreglo1.filter(producto =>producto.id != id )
        await this.fileSystem.promises.writeFile(this.#usersFilePath,JSON.stringify(productosFiltrados,null, 2, "/t"))

    }

    actualizarProducto = async ({id, ... producto}) => {
        await this.borrarProductoPorID(id)
        let arreglo2 = await this.tranformarJSON()
        let productosFinales = [{... producto, id}, ...arreglo2]
        await this.fileSystem.promises.writeFile(this.#usersFilePath,JSON.stringify(productosFinales,null, 2, "/t"))
    }    

}

//const productos =  new producManager 


//  cuando pongo los metodos si no comento lo de agregar producto , me salta error porque como q reescribe el json y no sabe que leer , si lo de re poner los productos esta comentado funcionan los metodos

//productos.getProducts()

//productos.buscarProductoPorId(4)
//productos.borrarProductoPorID(2)
/*productos.actualizarProducto( {
    title : "spider-man",
    descripcion : "juega como el hombre araña y columpiate por la ciudad para matar detener a los malos" ,
    precio: 6000 ,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6b1tOK9PTdxFxox_BsJ6XZZpqAOiNBG3z8g&usqp=CAU",
    codigo: "atr124",
    stock: 6,
    id: 4
})*/