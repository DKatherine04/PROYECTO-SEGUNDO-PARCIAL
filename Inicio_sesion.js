const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, 
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/, 
}

const campos = {
    usuario: false,
    password: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

function Iniciar() {
    alert("Se ha iniciado sesión correctamente!");
    window.location = 'home.html';
}

function volver() {
    window.location = 'index.html';
}

// Escuchar eventos en los inputs para validación
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); 
    input.addEventListener('blur', validarFormulario); 
});

// Manejar el envío del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.usuario && campos.password) {
        const cliente = JSON.parse(localStorage.getItem('cliente'));

        if (cliente && 
            cliente.usuario === document.getElementById('usuario').value && 
            cliente.password === document.getElementById('password').value) {
            // Mostrar mensaje de éxito
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
                Iniciar(); 
            }, 2000); 
        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }

        // Reiniciar el formulario
        formulario.reset();

        // Remover clases de validación
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
