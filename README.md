Hoja de Trabajo 6 - 29/09/2024

Descripción de la API: Se realizó una API para gestionar usuarios. La API permite crear, listar, eliminar y actualizar usuarios, validando que no exista un usuario con el mismo DPI en el sistema.

Instrucciones para ejecutar la API localmente: La API está configurada para correr localmente en el puerto 3000, necesitamos colocar la siguiente URL: http://localhost:3000/users

URL de la API desplegada en Render: https://hojadetrabajo6-7ga5.onrender.com

Descripción de los endpoints con ejemplos de solicitudes y respuestas:
Ejemplos en Postman: creamos un nuevo HTTPS Request.

Para crear un nuevo usuario, seleccionamos la solicitud tipo POST, colocamos la URL "http://localhost:3000/users". 
Nos dirigimos a la pestaña "raw" y seleccionamos el formato JSON.
En el cuadro de texto que se encuentra en la parte de abajo, ingreamos los datos del usuario:

{
        "dpi": "3604453650101",
        "name": "Gustavo Letona",
        "email": "gletonas@miumg.edu.gt",
        "password": "Letona1502"
    }

Damos clic en el botón "Send" y se agregará el usuario, en el caso de ya estar creando, se mostrará un mensaje indicando que el número de DPI ingresado ya se encuentra registrado.

Para listar usuarios, seleccionamos la solicitud tipo GET, colocamos la URL "http://localhost:3000/users". 
Damos clic en el botón "Send" y se nos mostrarán los usuarios creados de la siguiente forma:

[
    {
        "dpi": "3604453650101",
        "name": "Gustavo Letona",
        "email": "gletonas@miumg.edu.gt",
        "password": "Letona1502"
    }
]

Para actualizar un usuario, seleccionamos la solicitud tipo PUT, colocamos la URL "http://localhost:3000/users", seguido del número de DPI del usuario, de la siguiente forma: "http://localhost:3000/users/3604453650101". 
Nos dirigimos a la pestaña "raw" y seleccionamos el formato JSON.
En el cuadro de texto que se encuentra en la parte de abajo, ingreamos los datos del usuario que querémos actualizar:

{
  "name": "Gustavo Letona",
  "email": "gletonas@miumg.edu.gt",
  "password": "Letona1502",
  "newDpi": "3604453650101"
}

Damos clic en el botón "Send" y se actualizarán los datos del usuario.

Para eliminar un usuario, seleccionamos la solicitud tipo DELETE, colocamos la URL "http://localhost:3000/users", seguido del número de DPI del usuario, de la siguiente forma: "http://localhost:3000/users/3604453650101". 
Damos clic en el botón "Send" y se eliminará el usuario del DPI colacado.

Nombre: Gustavo Adolfo Letona Santos. 
Carné: 9490-21-3142 
URL del web service desplegado: https://hojadetrabajo6-7ga5.onrender.com
