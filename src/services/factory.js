import config from "../config/config.js";
import MongoSingleton from "../config/mongodb.js";

let usuariosService
let productosService
let carritoService

// conectar cuando poner mongo
async function initializeMongoService() {
    console.log("Iniciando servicio para MongoDB");
//    try {
        await MongoSingleton.getIntance() /*esto me va decir si tengo mas de una base de datos conectada y a inicializar mongo  */

        const { default: usuariosServiceMongo } = await import('./dao/db/usuarios.service.js');
        usuariosService = new usuariosServiceMongo(); 
        console.log("Servicio de usuarios cargado");
        

        const { default: productosServiceMongo } = await import('./dao/db/producto.service.js');
        productosService = new productosServiceMongo();
        console.log("Servicio de productos cargado");
        

        const { default: carritoServiceMongo } = await import('./dao/db/carrito.service.js');
        carritoService = new carritoServiceMongo();
        console.log("Servicio de carrito cargado");
        


//    } catch (error) {
//        console.error("Error al iniciar MongoDB:", error);
//        process.exit(1); 
//   }
}

switch (config.persistence) {
    case 'mongodb': 
        initializeMongoService(); 
        break;

    case 'files':
       
        
    case 'sql':
        

        break;

    default: 
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); 
}


export { usuariosService, productosService , carritoService }