import { carritoService } from "../services/factory.js"


export const getLogin = async(req,res) =>{
    res.render('login')
}
export const getRegister = async(req,res) =>{
    res.render('registro')

}

export const getUsuario = async(req,res) =>{
    res.render('usuario')

}

export const getTicket = async(req,res) =>{
    let carritoTotal = await carritoService.verTiket()

    res.render('ticket', { carritoTotal });

}

