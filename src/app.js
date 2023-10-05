import express from "express"// dejar 
import productosroutes from "./routes/productos.routes.js"// dejar 
import carritoroutes from "./routes/carrito.routes.js"// dejar 
import viewsroutes from "./routes/views.routes.js"// dejar 
import sessionsRouter from "./routes/session.router.js"// dejar 
import __dirname from './utils.js';// dejar 
import handlebars from 'express-handlebars';
import mongoose from 'mongoose'
import session from 'express-session' 
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import config from "./config/config.js"// dejar 



// pasar 
const conectarConMongo = `mongodb+srv://marianoapanelo:mariano5@cluster0.9gafxeg.mongodb.net/ecommers`

const app = express ()
// pasar 
const PORT = 8080
console.log(config.port);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

/*queda */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');



/*queda */
app.use(express.static(__dirname + "/public"))




/*rutas */
app.use('/api/productos', productosroutes);
app.use('/api/carrito', carritoroutes);
app.use("/api", sessionsRouter);
app.use('/', viewsroutes); 

initializePassport ();
app.use(passport.initialize())
app.use(passport.session())

//  pasar
app.use(session({
    store : MongoStore.create({
        mongoUrl: conectarConMongo ,
        mongoOptions : { useNewUrlParser: true, useUnifiedTopology: true }, 
        ttl : 10 * 60
    }),
    secret:"coderSecret",
    resave:true, 
    saveUninitialized: true, 
}))


const abrirServer = app.listen(PORT, ()=>{
    console.log("server abierto");
    })

    // pasar
const conectMongoDB = async() =>{
    try {
        await mongoose.connect(conectarConMongo)
        console.log("conectado con mongo");
        


    } catch (error) {
        console.error("no se puede conectar con mongo" + error);
        process.exit()
    }
}

conectMongoDB()