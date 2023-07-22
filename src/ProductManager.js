/*const { json } = require("stream/consumers");*/
import json from "stream/consumers"
import fs from "fs"

export default class producManager {
    #userDirPath;
    #usersFilePath;
    #fileSystem;
    #products

    constructor(){
        this.#products = []
        this.#userDirPath = "./carrito"
        this.#usersFilePath = this.#userDirPath + "/productos.json"
        this.#fileSystem = fs
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

        await this.#fileSystem.promises.mkdir(this.#userDirPath,{recursive:true})
        await this.#fileSystem.promises.writeFile(this.#usersFilePath,JSON.stringify(this.#products,null, 2, "/t"))
    }

    tranformarJSON = async () => {
        let respuestasArreglo = await this.#fileSystem.promises.readFile(this.#usersFilePath, "utf8")
        return JSON.parse(respuestasArreglo)
    }

    getProducts = async () =>{
        let respuesta = await this.tranformarJSON()
        return console.log(respuesta); 
    }


    
    buscarProductoPorId = async (id) =>{
    let arreglo = await this.tranformarJSON()
    if(!arreglo.find (producto =>producto.id == id )){    
    console.log("producto no encontrado");
    return ("producto no encontrado con ese id")
    }else{
        console.log(arreglo.find((producto) =>producto.id == id ))
        return (arreglo.find((producto) =>producto.id == id ))
    }
    }

    borrarProductoPorID = async (id) =>{
        let arreglo1 = await this.tranformarJSON()
        let productosFiltrados = arreglo1.filter(producto =>producto.id != id )
        await this.#fileSystem.promises.writeFile(this.#usersFilePath,JSON.stringify(productosFiltrados,null, 2, "/t"))

    }

    actualizarProducto = async ({id, ... producto}) => {
        await this.borrarProductoPorID(id)
        let arreglo2 = await this.tranformarJSON()
        let productosFinales = [{... producto, id}, ...arreglo2]
        await this.#fileSystem.promises.writeFile(this.#usersFilePath,JSON.stringify(productosFinales,null, 2, "/t"))
    }    

}

const productos = new producManager

/*productos.agregarProducto("fifa 23", "juego de futbol con los equipos conformados en el 2023" , 5000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtxZ3S1MPmgFQbi7JJgi0OUQE2q-m80r72nQ&usqp=CAU","sasb20",5)
productos.agregarProducto("god of war ragnarok", "juego en el que un spartano y su hijo buscan la forma de vengarce de quienes lo traicionaron" , 6000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qukk_WJ-oVIeiq5rifSz61hV_GMr5d28Dw&usqp=CAU","abl123",10)
productos.agregarProducto("the last of us 2", "elie busca su lugar y encontrar a los que mataron a joel" , 4000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMpoRexowvlAvzo50jwHRlnk8fkc3QDh4823Fw8MP9gpCh_H7IoLtB3wZP0WkgMnlqACI&usqp=CAU","aza798",3)
productos.agregarProducto("skyrim", "juego en el que sos el protagonista de una historia con dragones y poderes magicos" , 4000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTPreI5cBzyYbYTT1Yj_ZF3CMp9Ts97oEd2yJnHRGKPiohkwD4EXpdv1g1VVGjn0jGzI&usqp=CAU","pepe442",2 )
productos.agregarProducto("spider-man", "juega como el hombre araña y columpiate por la ciudad para matar detener a los malos" , 16000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6b1tOK9PTdxFxox_BsJ6XZZpqAOiNBG3z8g&usqp=CAU","atr124",6 )
productos.agregarProducto("grand theft auto", "personifica la vida de un criminal para llegar a lo mas alto e intentar que no te atrapen" , 13000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyS__gNx7jDwlX-8HGR_IipG2m3ZnjZufo4g&usqp=CAU","bay242",3 )
productos.agregarProducto("uncharted 4", "juego de mundo abierto con misiones esparcidas por el mapa" , 14000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNybmazV9Jl9KfiqZJ_yZjvMV_LSJHZ9YMQ&usqp=CAU","alfa123",5 )
productos.agregarProducto("elden ring", "juego en el que tenes que derrotar a los semidioses y recontruir el circulo de elden para ser el mas fuerte" , 10000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfj9aT4Rzy2rQlpLnVZ0RJvXQ2YdmF5ArRw&usqp=CAU","128beta",3 )
productos.agregarProducto("detroit", "juego donde vas creando tu propia historia, dependiendo de las deciciones q tomes " , 14000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeku5yui2ZekBe1BO7Ww4Zo8Mm7YLpkcGfbQ&usqp=CAU","zasx352",5)
productos.agregarProducto("jump force", "juego donde se juntan los personajes de manga favoritos para pelear unos contra otros" , 10000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84-q6nBRaE2eO3ZTyqZnoy66vP5SebxEgUA&usqp=CAU","aea1247",4 )
productos.agregarProducto("horizon", "juego donde las maquinas tomaron el control y y vamos por el mapa buscando el porque " , 14000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpB_p6P9iKGYU_C1CZhhgQlQ_0auiPC2FDZA&usqp=CAU","mara71",5 )
*/
//  cuando pongo los metodos si no comento lo de agregar producto , me salta error porque como q reescribe el json y no sabe que leer , si lo de re poner los productos esta comentado funcionan los metodos

//productos.getProducts()

//productos.buscarProductoPorId(2)
//productos.borrarProductoPorID(2)
/*productos.actualizarProducto({
    title : "spider-man",
    descripcion : "juega como el hombre araña y columpiate por la ciudad para matar detener a los malos" ,
    precio: 6000 ,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6b1tOK9PTdxFxox_BsJ6XZZpqAOiNBG3z8g&usqp=CAU",
    codigo: "atr124",
    stock: 6,
    id: 4
})*/

