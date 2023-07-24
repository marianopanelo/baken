import producManager from "./ProductManager.js"

const productos = new producManager()

let persistirProducto = async() =>{
    await productos.agregarProducto("fifa 23", "juego de futbol con los equipos conformados en el 2023" , 5000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtxZ3S1MPmgFQbi7JJgi0OUQE2q-m80r72nQ&usqp=CAU","sasb20",5)
    await productos.agregarProducto("god of war ragnarok", "juego en el que un spartano y su hijo buscan la forma de vengarce de quienes lo traicionaron" , 6000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qukk_WJ-oVIeiq5rifSz61hV_GMr5d28Dw&usqp=CAU","abl123",10)
    await productos.agregarProducto("the last of us 2", "elie busca su lugar y encontrar a los que mataron a joel" , 4000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMpoRexowvlAvzo50jwHRlnk8fkc3QDh4823Fw8MP9gpCh_H7IoLtB3wZP0WkgMnlqACI&usqp=CAU","aza798",3)
    await productos.agregarProducto("skyrim", "juego en el que sos el protagonista de una historia con dragones y poderes magicos" , 4000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTPreI5cBzyYbYTT1Yj_ZF3CMp9Ts97oEd2yJnHRGKPiohkwD4EXpdv1g1VVGjn0jGzI&usqp=CAU","pepe442",2 )
    await productos.agregarProducto("spider-man", "juega como el hombre araña y columpiate por la ciudad para matar detener a los malos" , 16000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6b1tOK9PTdxFxox_BsJ6XZZpqAOiNBG3z8g&usqp=CAU","atr124",6 )
    await productos.agregarProducto("grand theft auto", "personifica la vida de un criminal para llegar a lo mas alto e intentar que no te atrapen" , 13000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyS__gNx7jDwlX-8HGR_IipG2m3ZnjZufo4g&usqp=CAU","bay242",3 )
    await productos.agregarProducto("uncharted 4", "juego de mundo abierto con misiones esparcidas por el mapa" , 14000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNybmazV9Jl9KfiqZJ_yZjvMV_LSJHZ9YMQ&usqp=CAU","alfa123",5 )
    await productos.agregarProducto("elden ring", "juego en el que tenes que derrotar a los semidioses y recontruir el circulo de elden para ser el mas fuerte" , 10000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfj9aT4Rzy2rQlpLnVZ0RJvXQ2YdmF5ArRw&usqp=CAU","128beta",3 )
    await productos.agregarProducto("detroit", "juego donde vas creando tu propia historia, dependiendo de las deciciones q tomes " , 14000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeku5yui2ZekBe1BO7Ww4Zo8Mm7YLpkcGfbQ&usqp=CAU","zasx352",5)
    await productos.agregarProducto("jump force", "juego donde se juntan los personajes de manga favoritos para pelear unos contra otros" , 10000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84-q6nBRaE2eO3ZTyqZnoy66vP5SebxEgUA&usqp=CAU","aea1247",4 )
    await productos.agregarProducto("horizon", "juego donde las maquinas tomaron el control y y vamos por el mapa buscando el porque " , 14000 ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpB_p6P9iKGYU_C1CZhhgQlQ_0auiPC2FDZA&usqp=CAU","mara71",5 )
}

persistirProducto ()