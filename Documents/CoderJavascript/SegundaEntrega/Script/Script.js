//me gustaria añadirle alguna forma de editar los datos ingresados de los clientes falta agregarle funcionalidades de filter

function IniciarSesion() {
    let usuarios = {
        "TOBIAS": "1234",
        "HORACIO": "1234",
        "FRANCO": "1234",
        "URIEL": "1234"
    };
    let nombreUsuario;
    let contraseña;
    let intentosUsuario = 0; 
    let intentosContraseña = 0; 

    do {
        nombreUsuario = prompt("Ingrese su usuario:");
        if (nombreUsuario) {  
            nombreUsuario = nombreUsuario.toUpperCase();  

            if (usuarios.hasOwnProperty(nombreUsuario)) {  
                do {
                    contraseña = prompt("Ingrese su contraseña:");
                    if (usuarios[nombreUsuario] === contraseña) {
                        alert("Bienvenido " + nombreUsuario);
                        DatosDeCliente(); 
                        return;
                    } else {
                        alert("Contraseña incorrecta");
                        intentosContraseña++;
                    }

                    if (intentosContraseña >= 3) {
                        alert("Superaste el límite de intentos.");
                        return;
                    }
                } while (usuarios[nombreUsuario] !== contraseña);

            } else {
                alert("Usuario no registrado.");
            }
        } else {
            alert("Operación cancelada.");
            return;
        }

        intentosUsuario++;
        if (intentosUsuario >= 3) {
            alert("Superaste el límite de intentos.");
            return;
        }
    } while (true);
}

function DatosDeCliente() {
    let nombreApellido = prompt("Ingrese nombre y apellido del cliente:");
    let fechaNacimiento = prompt("Ingrese la fecha de nacimiento con el siguiente formato (dd/mm/aaaa):");
    let sexo = prompt("Ingrese el sexo del cliente (M para Masculino, F para Femenino):");
    let telefono = prompt("Ingrese el teléfono del cliente:");

    let dni;
    do {
        dni = prompt("Ingrese el DNI del cliente:");
        if (dni.length === 8 && !isNaN(parseInt(dni))) {
            alert("DNI Cargado correctamente.");
            break;
        } else {
            alert("DNI inválido. intenta de nuevo.");
        }
    } while (true);

    alert("Datos del cliente cargados correctamente:\n" +
          "Nombre y Apellido: " + nombreApellido + "\n" +
          "Fecha de Nacimiento: " + fechaNacimiento + "\n" +
          "Sexo: " + sexo + "\n" +
          "Teléfono: " + telefono + "\n" +
          "DNI: " + dni);
}

IniciarSesion();
console.log(usuarios)