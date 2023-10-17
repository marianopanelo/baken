export default class usuariosDto {
    constructor(usuario) {
        this.name = usuario.first_name;
        this.lastName = usuario.last_name;
        this.age = usuario.age;
        this.email = usuario.email;
        this.fullName = this.name + ' ' + this.lastName
    }
}