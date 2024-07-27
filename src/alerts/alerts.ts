import Swal from "sweetalert2"
import { AdminBook, BookType } from "../assets/models/models"


//* Libros
/** @description alerta para el guardado exitosamente */
export function saveBook() {
    Swal.fire({
        title: 'Se ha guardado con exito',
        icon: 'success',
        timer: 3000,
    })
}

/** @description Alerta de modificacion exitosa del libro*/
export function modifyBook() {
    Swal.fire({
        title: 'Modificado correctamente',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true
    })
}


/** @description Alerta de error al modificar el libro */
export function errorModifyBook() {
    Swal.fire({
        title: 'Error al modificar el libro',
        icon: 'error',
        text: 'Lo sentimos, hubo un error al modificar',
        timer: 4000
    })
}

/** @description Alerta de guardado con exito el prestamo */
export function addLendBookSuccess() {
    Swal.fire({
        title: 'Reservacion exitosa',
        text: 'Se ha reservado el libro correctamente',
        icon: 'success',
        timer: 4000,
        timerProgressBar: true
    })
}

/** @description Alerta de guardado con exito el prestamo */
export function addLendBookError() {
    Swal.fire({
        title: 'Fallo al reservar el libro',
        text: 'Lo sentimos, el libro se encuentra reservado o prestado',
        icon: 'error',
        timer: 4000,
        timerProgressBar: true
    })
}

/** @description Alerta de guardado con exito el prestamo */
export function addReturnBookSuccess() {
    Swal.fire({
        title: 'Devolucion exitosa',
        text: 'Se ha devuelto el libro correctamente',
        icon: 'success',
        timer: 4000,
        timerProgressBar: true
    })
}



//* Borrar
/** @description alerta para informar de que se ha eliminado correctamente */
export function deleteSuccess() {
    Swal.fire({
        title: 'Eliminado',
        text: 'Se ha borrado correctamente',
        icon: 'info',
        timer: 3000,
    })
}

/**
 * @description error con la BD al borrar la información
 */
export function errorDelete() {
    Swal.fire({
        title: 'No se ha elimnado',
        text: 'Error al eliminar el libro',
        icon: 'error',
        timer: 3000,
    })
}



// Campos de agregar libro vacios
/** @description Alerta para formulario con error por campos vacios */
export function errorInputs() {
    Swal.fire({
        title: `Error al guardar`,
        text: `Verifique que todos los campos estén llenos`,
        icon: 'error',
        timer: 5000
    })
}

// Error de guardar en la BD
/** @description Alerta de error al guardar pero en la BD */
export function errorSave() {
    Swal.fire({
        title: `Error al guardar`,
        text: `Lo sentimos, hubo un error al momento de guardar`,
        icon: 'error',
        timer: 5000
    })
}

export function connectionError(info: string) {
    Swal.fire({
        title: 'Error al conectar',
        text: `Error: ${info}`,
        icon: 'error'
    })
}


/**
 * @description Alerta que espera una confirmación
 * @param bookDelete 
 * @returns Promesa<Boolean>
 */
export async function confirmDelete(bookDelete: AdminBook): Promise<boolean> {
    const result = await Swal.fire({
        title: 'Eliminar',
        text: `Está seguro que desea eliminar el libro ${bookDelete.boo_name}`,
        icon: 'question',
        showConfirmButton: true,
        confirmButtonColor: '#ff0000',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#2F358B',
        imageUrl: bookDelete.boo_image,
        imageWidth: '35rem',
        imageAlt: 'Imagen del libro'
    });

    return result.isConfirmed;
}


//* Usuario
/**
 * @description Advertencia de que la contraseña es muy corta
 */
export function shortPassword() {
    Swal.fire({
        title: 'Contraseña error',
        text: 'La contraseña es muy corta',
        icon: 'error',
        position: 'bottom',

        showCancelButton: false,
        showConfirmButton: false,
        closeButtonAriaLabel: 'X',

        allowOutsideClick: true,
        backdrop: false,

        timer: 3000,
    })
}

/**
 * @description Alerta de error al ingresar
 */
export function errorSignIn() {
    Swal.fire({
        title: 'Error de Ingreso',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        timer: 3000,
    })
}

/**
 * @description Alerta de modificacion exitosa al usuario
 */
export function modifyUser() {
    Swal.fire({
        title: 'Usuario modificado con exito',
        icon: 'success',
        timer: 3000,
    })
}

/**
 * @description Alerta de error Usuario existente
 */
export function userExist() {
    Swal.fire({
        title: 'Fallo al registrarse',
        text: 'El usuario ya existe, use otro correo',
        icon: 'error',
        timer: 6000,
    })
}

/**
 * @description Alerta de error fallo al cerrar la sesión a nivel de Validación
 */
export function failBack() {
    Swal.fire({
        title: 'Fallo al cerrar sesión'
    })
}