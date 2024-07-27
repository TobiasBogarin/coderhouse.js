class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre.toUpperCase();
        this.contraseña = contraseña;
    }

    verificarContraseña(contraseña) {
        return this.contraseña === contraseña;
    }
}

class Cliente {
    constructor(nombreApellido, fechaNacimiento, sexo, telefono, dni) {
        this.nombreApellido = nombreApellido;
        this.fechaNacimiento = fechaNacimiento;
        this.sexo = sexo;
        this.telefono = telefono;
        this.dni = dni;
        this.compras = [];
    }

    mostrarDatos() {
        return `Datos del cliente:
                Nombre y Apellido: ${this.nombreApellido}
                Fecha de Nacimiento: ${this.fechaNacimiento}
                Sexo: ${this.sexo}
                Teléfono: ${this.telefono}
                DNI: ${this.dni}`;
    }

    agregarCompra(articulo, cantidad) {
        this.compras.push({ articulo, cantidad });
    }

    mostrarResumen() {
        let resumen = this.mostrarDatos() + '\n\nCompras:\n';
        this.compras.forEach(compra => {
            resumen += `Artículo: ${compra.articulo.sku}, Cantidad: ${compra.cantidad}\n`;
        });
        return resumen;
    }
}

class Articulo {
    constructor(id, sku, stock) {
        this.id = id;
        this.sku = sku;
        this.stock = stock;
    }

    mostrarDatos() {
        return `ID: ${this.id}, SKU: ${this.sku}, Stock: ${this.stock}`;
    }

    actualizarStock(cantidad) {
        this.stock += cantidad;
    }
}

const articulos = [
    new Articulo(1, "VGA2VIDEO", 30),
    new Articulo(2, "DVR-1CH", 30),
    new Articulo(3, "DVR64-1CH", 30),
    new Articulo(4, "LTV-3000", 30),
    new Articulo(5, "MYGICA U6813", 30),
    new Articulo(6, "EZTV939", 30),
    new Articulo(7, "S870", 30),
    new Articulo(8, "VIDEO2VGA", 30),
    new Articulo(9, "USB2.0-VGA", 30),
    new Articulo(10, "HDMI2VGA-1", 30),
    new Articulo(11, "HDMI2VGA-3", 30),
    new Articulo(12, "HDMI2VGA-2", 30),
    new Articulo(13, "VGA2HDMI", 30),
    new Articulo(14, "VGA2HDMI-2", 30),
    new Articulo(15, "ETC7-USB", 30),
    new Articulo(16, "ETC10-USB", 30),
    new Articulo(17, "MS500X", 0),
    new Articulo(18, "TSN440", 0),
    new Articulo(19, "UFD8GB", 0),
    new Articulo(20, "MICRO-PENDRIVE", 0)
];

const clientes = [];

function IniciarSesion() {
    const usuarios = [
        new Usuario("TOBIAS", "1234"),
        new Usuario("HORACIO", "1234"),
        new Usuario("FRANCO", "1234"),
        new Usuario("URIEL", "1234")
    ];

    let nombreUsuario;
    let contraseña;
    let intentosUsuario = 0;
    let intentosContraseña = 0;

    do {
        nombreUsuario = prompt("Ingrese su usuario:");
        if (nombreUsuario) {
            nombreUsuario = nombreUsuario.toUpperCase();
            const usuario = usuarios.find(user => user.nombre === nombreUsuario);
            if (usuario) {
                do {
                    contraseña = prompt("Ingrese su contraseña:");
                    if (usuario.verificarContraseña(contraseña)) {
                        alert("Bienvenido " + nombreUsuario);
                        flujoPrincipal();
                        return;
                    } else {
                        alert("Contraseña incorrecta");
                        intentosContraseña++;
                    }

                    if (intentosContraseña >= 3) {
                        alert("Superaste el límite de intentos.");
                        return;
                    }
                } while (!usuario.verificarContraseña(contraseña));
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

function flujoPrincipal() {
    do {
        DatosDeCliente();
    } while (confirm("¿Desea registrar un nuevo cliente?"));
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
            alert("DNI inválido. Intenta de nuevo.");
        }
    } while (true);

    const cliente = new Cliente(nombreApellido, fechaNacimiento, sexo, telefono, dni);
    clientes.push(cliente);
    alert(cliente.mostrarDatos());

    let deseaEditar = prompt("¿Desea editar algún dato? \n1 Sí \n2 No");
    if (deseaEditar === '1') {
        editarDatosDeCliente(dni);
    } else {
        registrarCompra(cliente);
    }
}

function editarDatosDeCliente(dni) {
    let cliente = clientes.find(c => c.dni === dni);

    if (cliente) {
        let opcion = prompt(`¿Qué desea editar?
        1. Nombre y Apellido
        2. Fecha de Nacimiento
        3. Sexo
        4. Teléfono
        5. DNI`);

        switch (opcion) {
            case '1':
                cliente.nombreApellido = prompt("Ingrese el nuevo nombre y apellido del cliente:") || cliente.nombreApellido;
                break;
            case '2':
                cliente.fechaNacimiento = prompt("Ingrese la nueva fecha de nacimiento con el siguiente formato (dd/mm/aaaa):") || cliente.fechaNacimiento;
                break;
            case '3':
                cliente.sexo = prompt("Ingrese el nuevo sexo del cliente (M para Masculino, F para Femenino):") || cliente.sexo;
                break;
            case '4':
                cliente.telefono = prompt("Ingrese el nuevo teléfono del cliente:") || cliente.telefono;
                break;
            case '5':
                let nuevoDni = prompt("Ingrese el nuevo DNI del cliente:");
                if (nuevoDni.length === 8 && !isNaN(parseInt(nuevoDni))) {
                    cliente.dni = nuevoDni;
                } else {
                    alert("DNI inválido. No se actualizó el DNI.");
                }
                break;
            default:
                alert("Opción no válida.");
                return;
        }

        alert("Datos del cliente actualizados correctamente:\n" + cliente.mostrarDatos());

        let deseaEditar = prompt("¿Desea editar algún dato más? \n1 Sí \n2 No");
        if (deseaEditar === '1') {
            editarDatosDeCliente(cliente.dni); 
        } else {
            registrarCompra(cliente);
        }
    } else {
        alert("Cliente no encontrado.");
    }
}

function registrarCompra(cliente) {
    let idArticulo = parseInt(prompt("Ingrese el ID del artículo que compró el cliente:"));
    let articulo = articulos.find(a => a.id === idArticulo);
    if (!articulo) {
        alert("Artículo no encontrado.");
        return;
    }

    let cantidad;
    do {
        cantidad = parseInt(prompt(`Ingrese la cantidad de ${articulo.sku} que compró el cliente:`));
        if (cantidad <= articulo.stock) {
            articulo.actualizarStock(-cantidad);
            cliente.agregarCompra(articulo, cantidad);
            alert(`Compra registrada: ${cantidad} unidades de ${articulo.sku}. Stock restante: ${articulo.stock}`);
            break;
        } else {
            let volverAIntentar = prompt("Stock insuficiente. ¿Desea volver a ingresar otra cantidad? \n1 para Sí \n2 para No");
            if (volverAIntentar !== '1') {
                break;
            }
        }
    } while (true);

    preguntarAgregarOtroArticulo(cliente);
}

function preguntarAgregarOtroArticulo(cliente) {
    let opcion = prompt("¿Desea añadir algo más? \n1 Sí \n2 No \n3 Consultar Stock");
    switch (opcion) {
        case '1':
            registrarCompra(cliente);
            break;
        case '2':
            alert(cliente.mostrarResumen());
            break;
        case '3':
            consultarStock(() => preguntarAgregarOtroArticulo(cliente));
            break;
        default:
            alert("Opción no válida.");
            preguntarAgregarOtroArticulo(cliente);
            break;
    }
}

function consultarStock(callback) {
    let articulosSinStock = articulos.filter(articulo => articulo.stock === 0);
    let mensaje = "Artículos con stock 0:\n";
    articulosSinStock.forEach(articulo => {
        mensaje += `${articulo.mostrarDatos()}\n`;
    });
    alert(mensaje);
    callback();
}


function mostrarArticulos() {
    articulos.forEach(articulo => {
        console.log(articulo.mostrarDatos());
    });
}

IniciarSesion();
