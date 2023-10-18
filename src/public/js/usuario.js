document.addEventListener('DOMContentLoaded', function () {
    const irAProductosButton = document.getElementById('irAProductos');
    const data = document.getElementById('data');
// me trae todos los datos del usuario , pero no lo puedo terminar de cargar en las p , nose porque
    fetch('/')
        .then((response) => response.json())
        .then((user) => {
            data.innerHTML = `
                <p>Name: ${user.first_name}</p>
                <p>Last Name: ${user.last_name}</p>
                <p>Age: ${user.age}</p>
                <p>Email: ${user.email}</p>
            `;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    irAProductosButton.addEventListener('click', function () {
        window.location.href = '/api/productos';
    });
});