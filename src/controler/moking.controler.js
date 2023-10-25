import { faker } from '@faker-js/faker';


// dejo todo en controler y no lo importo de factori porque esto es solo prueba y tal vez lo termine borrando


export const getMoking = async(req,res) =>{
    try {
        faker.locale = 'es';

        let productos = [];

        // como no ahi jueguitos o cosas de computacion en faker , voy a crear 100 animales, le pongo stock y todo lo q tendria un producto , pero en vez de producto le pongo animales 
        // tambien le puse imagenes rando
        let paramoetros = () => {
            return {
                _id: faker.database.mongodbObjectId(),
                email: faker.internet.email(),
                stock: faker.random.numeric(1),
                price: faker.commerce.price(),
                perros : faker.animal.dog(),
                image: faker.image.image()
            }
        }


        for (let i = 0; i < 100; i++) {
            productos.push(paramoetros());
        }



        res.send({ status: "success", payload: productos }); // devolvemos los q se crearon
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo generar productos" }); // si no se pueden crear los usiaros 
    }
}