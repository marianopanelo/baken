export default class ticketDto {
    constructor(productos) {
        this.purchase_deletime = productos.purchase_deletime;//hora de compra
        this.amount = productos.amount;// numero total de compra esta 
        this.purchaser = usuario.email;//email de la persona 
    }
}