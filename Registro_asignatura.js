const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    codigo: /^[a-zA-ZÀ-ÿ0-9\s]{4,16}$/, // Letras, números, guion y guion bajo
    asignatura: /^[a-zA-ZÀ-ÿ\s0-9.]{4,60}$/, // Letras y espacios, máximo 40 caracteres
    carrera: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, máximo 40 caracteres
    nivel: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, máximo 40 caracteres
    docente: /^[a-zA-ZÀ-ÿ\s.'-]{4,40}$/ // Letras y espacios, máximo 40 caracteres
};

const campos = {
    codigo: false,
    asignatura: false,
    carrera: false,
    nivel: false,
    docente: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'codigo':
            validarCampo(expresiones.codigo, e.target, 'codigo');
            break;
        case 'asignatura':
            validarCampo(expresiones.asignatura, e.target, 'asignatura');
            break;
        case 'carrera':
            validarCampo(expresiones.carrera, e.target, 'carrera');
            break;
        case 'nivel':
            validarCampo(expresiones.nivel, e.target, 'nivel');
            break;
        case 'docente':
            validarCampo(expresiones.docente, e.target, 'docente');
            break;
    }
};

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
};

function cancelar() {
    window.location = 'Registro_asignatura.html';
}

function volver() {
    window.location = 'home.html';
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.codigo && campos.asignatura && campos.carrera && campos.nivel && campos.docente) {
        const formData = {
            codigo: formulario.codigo.value,
            asignatura: formulario.asignatura.value,
            carrera: formulario.carrera.value,
            nivel: formulario.nivel.value,
            docente: formulario.docente.value
        };

        // Obtener la lista actual de formDataList de localStorage o inicializarla como un array vacío
        const formDataList = JSON.parse(localStorage.getItem('formDataList')) || [];

        // Agregar el nuevo formData a la lista
        formDataList.push(formData);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('formDataList', JSON.stringify(formDataList));

        // Mensaje de éxito (opcional)
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        // Reiniciar formulario y campos
        formulario.reset();
        Object.keys(campos).forEach((campo) => {
            campos[campo] = false;
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        });

        // Opcional: redirigir a otra página después de procesar el formulario
        // window.location = 'otra_pagina.html';
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
