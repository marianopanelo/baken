const socket = io()


socket.on("evento_para_todos" , productoCarritoNombre =>{
    console.log(productoCarritoNombre);
});/* aca ya me los esta pasando y se actualiza a medida q agrego o quito un elemento , desde los postman, pero no se 
como poder mostrarlo , solo vimos como mostrarlo en consola por ahora */


