class VALIDARLOGIN {
    constructor() {
        this.usuarios = {
            Tobias: '1234',
            Uriel: '1234',
            Franco: '1234'
        };
        this.intentosRestantes = 3;
    }

    validar(usuario, contrasena) {
        if (this.intentosRestantes === 0) {
            console.log('Demasiados intentos fallidos, recarga la pagina para volver a intentar.');
            return false;
        }

        if (this.usuarios[usuario] && this.usuarios[usuario] === contrasena) {
            console.log('Inicio de sesión exitoso');
            this.intentosRestantes = 3;
            return true;
        } else {
            this.intentosRestantes--;
            console.log(`Usuario o contraseña incorrecta. Intentos restantes: ${this.intentosRestantes}`);
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginValidator = new VALIDARLOGIN();
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const mainContent = document.querySelector('main');
    const messageElement = document.getElementById('message');

    function attemptLogin() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const isValid = loginValidator.validar(username, password);

        if (isValid) {
            messageElement.textContent = 'Inicio de sesión exitoso';
            messageElement.style.color = 'green';
            mainContent.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = './pages/REMITO.html';
            }, 1000);
        } else {
            messageElement.textContent = loginValidator.intentosRestantes > 0 ?
                'Usuario o contraseña incorrecta' : 'Demasiados intentos fallidos, recarga la pagina.';
            messageElement.style.color = 'red';
        }
    }

    loginButton.addEventListener('click', attemptLogin);
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                attemptLogin();
            }
        });
    });
});
