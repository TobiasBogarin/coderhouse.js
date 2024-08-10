class VALIDARLOGIN {
    constructor() {
        this.usuarios = {
            Tobias: '1234',
            Uriel: '1234',
            Franco: '1234'
        };
    }

    validar(usuario, contrasena) {
        if (this.usuarios[usuario] && this.usuarios[usuario] === contrasena) {
            console.log('Inicio de sesión exitoso');
            return true;
        } else {
            console.log('Usuario o contraseña incorrecta');
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginValidator = new VALIDARLOGIN();
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const mainContent = document.querySelector('main'); // Asumiendo que la animación ocurre en el <main>

    function attemptLogin() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const isValid = loginValidator.validar(username, password);
        if (isValid) {
            document.getElementById('message').textContent = 'Inicio de sesión exitoso';
            document.getElementById('message').style.color = 'green';
            // Añadir clase de animación
            mainContent.classList.add('fade-out');

            // Esperar a que termine la animación antes de redirigir
            setTimeout(() => {
                window.location.href = './pages/REMITO.html'; // Ajusta la ruta según sea necesario
            }, 1000); // Esperar 1000 ms = 1 segundo
        } else {
            document.getElementById('message').textContent = 'Usuario o contraseña incorrecta';
            document.getElementById('message').style.color = 'red';
        }
    }

    loginButton.addEventListener('click', attemptLogin);

    // También puede manejar el Enter para el inicio de sesión
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                attemptLogin();
            }
        });
    });
});
