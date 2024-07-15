const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
    codigo: /^[a-zA-ZÀ-ÿ0-9\s]{4,16}$/, //acepta+ números y letras.
    silabo: /^[a-zA-ZÀ-ÿ\s0-9.]{4,60}$/, //  acepta puntos, espacios, letras y números.
    carrera: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // acepta espacio y letras.
    unidad: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, //solo acepta letras
    periodo: /^[a-zA-Z0-9\-\/\s.]{4,16}$/, // solo acepta números letras, guion.
    paralelo: /^[a-zA-Z]{1}$/, // solo acepta letras 
    docente: /^[a-zA-ZÀ-ÿ\s.'-]{4,40}$/ // acepta puntos, espacios, letras
};

const campos = {
    codigo: false,
    silabo: false,
    carrera: false,
    unidad: false,
    periodo: false,
    paralelo: false,
    docente: false
};

const validarCampo = (expresion, input, campo) => {
    const grupo = document.getElementById(`grupo__${campo}`);
    const icono = document.querySelector(`#grupo__${campo} i`);
    const mensajeError = document.querySelector(`#grupo__${campo} .formulario__input-error`);

    if(expresion.test(input.value)){
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        icono.classList.remove('fa-times-circle');
        icono.classList.add('fa-check-circle');
        mensajeError.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        icono.classList.add('fa-times-circle');
        icono.classList.remove('fa-check-circle');
        mensajeError.classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "codigo":
            validarCampo(expresiones.codigo, e.target, 'codigo');
            break;
        case "silabo":
            validarCampo(expresiones.silabo, e.target, 'silabo');
            break;
        case "carrera":
            validarCampo(expresiones.carrera, e.target, 'carrera');
            break;
        case "unidad":
            validarCampo(expresiones.unidad, e.target, 'unidad');
            break;
        case "periodo":
            validarCampo(expresiones.periodo, e.target, 'periodo');
            break;
        case "paralelo":
            validarCampo(expresiones.paralelo, e.target, 'paralelo');
            break;
        case "docente":
            validarCampo(expresiones.docente, e.target, 'docente');
            break;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.codigo && campos.silabo && campos.carrera && campos.unidad && campos.periodo && campos.paralelo && campos.docente){
        const archivo = document.getElementById('archivo').files[0];
        const lector = new FileReader();

        lector.onload = function(evento) {
            const imagen = evento.target.result;

            const datosFormulario = {
                codigo: formulario.codigo.value,
                silabo: formulario.silabo.value,
                carrera: formulario.carrera.value,
                unidad: formulario.unidad.value,
                periodo: formulario.periodo.value,
                paralelo: formulario.paralelo.value,
                docente: formulario.docente.value,
                imagen: imagen // Almacenar la imagen en Base64
            };

            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            registros.push(datosFormulario);
            localStorage.setItem('registros', JSON.stringify(registros));

            formulario.reset();
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });

            // Redirigir a silabos.html
        };

        lector.readAsDataURL(archivo); // Convertir la imagen a Base64
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
    }
});

function cancelar(){
    window.location='Registro_silabo.html';
}

function volver(){
    window.location='home.html';
}

function validar() {
    const archivo = document.getElementById('archivo').value;
    const extension = archivo.substring(archivo.lastIndexOf('.') + 1).toLowerCase();
    const aceptados = ['pdf', 'doc', 'docx', 'png'];

    if (aceptados.indexOf(extension) === -1) {
        alert('Archivo inválido. No se permite la extensión ' + extension);
    }


}
