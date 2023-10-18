

export function auth(req, res, next){
    if (this.role == user) {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}

export function auth2(req, res, next){
    if (this.role == admin) {
        return next();
    } else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}