import express from "express"
import productosroutes from "./routes/productos.routes.js"
import carritoroutes from "./routes/carrito.routes.js"
import viewsroutes from "./routes/views.routes.js"
import sessionsRouter from "./routes/session.router.js"
import githubRouter from "./routes/github-login.views.router.js"
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import session from 'express-session' 
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import config from "./config/config.js"
import MongoSingleton from "./config/mongodb.js"

const app = express ()


app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10 * 60
    }),
    secret: "coderSecret",
    resave: true,
    saveUninitialized: true,
}));


initializePassport();
app.use(passport.initialize());
app.use(passport.session());


const PORT = config.port
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + "/public"))


app.use('/api/productos', productosroutes);
app.use('/api/carrito', carritoroutes);
app.use("/api/github", githubRouter);
app.use("/api", sessionsRouter);
app.use('/', viewsroutes); 


app.listen(PORT, () => {
    console.log(`Servidor abierto en el puerto ${PORT}`);
});


const mongoInstance = async () =>{
    try {
        await MongoSingleton.getIntance() 
    } catch (error) {
        console.log(error);
    }
}

mongoInstance()