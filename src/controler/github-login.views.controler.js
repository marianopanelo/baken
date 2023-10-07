
export const getlogin = (req,res) =>{
    res.render('github-login')
}
export const geterror = (req,res) =>{
    res.render('error', { error: "No se pudo autenticar usando gitHub" })
}
