import errorNumero from '../enumeracionDeError.js';

//esto se comporta como un niderwer 
export default (error, req, res, next) => {
    //Logica
    console.error("Error detectado entrando al Error Handler");
    console.error(error.cause)
    // estos serian los chach en realidad de los trie cach , por eso se cambia 
    switch (error.code) {
        // aca nos traemos el EErrors.INVALID_TYPES_ERROR para pasarle los errores 
        case errorNumero.INVALID_TYPES_ERROR:
            res.status(400).send({ status: "Error", error: error.message });
            // next();
            break;

        default:
            res.status(500).send({ status: "Error", error: "Unhandeld error!" })
            break;
    }
};