document.addEventListener('DOMContentLoaded', () => {
    const loadOdontologos = async () => {
        const url = '/odontologos';
        const settings = { method: 'GET' };


        try {
            const response = await fetch(url, settings);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Datos recibidos:', data);

            const tableBody = document.getElementById("odontologoTableBody");

            if (Array.isArray(data)) {
                tableBody.innerHTML = ''; // Limpiar el contenido actual de la tabla
                data.forEach(odontologo => {
                    const odontologoRow = document.createElement('tr');
                    const idString = String(odontologo.id); // Asegúrate de que id es una cadena

                    odontologoRow.innerHTML = `
                        <td class="td_id">${idString.toUpperCase()}</td>
                        <td class="td_nombre">${odontologo.nombre.toUpperCase()}</td>
                        <td class="td_apellido">${odontologo.apellido.toUpperCase()}</td>
                        <td class="td_matricula">${odontologo.matricula}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deleteOdontologo('${odontologo.id}')">Eliminar</button>
                            <button class="btn btn-primary btn-sm" onclick="editOdontologo('${odontologo.id}')">Editar</button>
                        </td>
                    `;

                    tableBody.appendChild(odontologoRow);
                });
            } else {
                console.error('Los datos recibidos no son una lista:', data);
            }
        } catch (error) {
            console.error('Error fetching odontologos:', error);
        }
    };

    const activateNavItem = () => {
        const pathname = window.location.pathname;
        if (pathname === "/odontologoList.html") {
            const navItem = document.querySelector(".nav .nav-item a[href='/odontologoList.html']");
            if (navItem) {
                navItem.classList.add("active");
            }
        }
    };

    loadOdontologos();
    activateNavItem();
});
