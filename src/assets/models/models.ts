// Estructura del Objeto libro
export class AdminBook {
    boo_id?: number;
    boo_name?: string;
    boo_description?: string;
    boo_image?: string;
    boo_autor?: string;
    boo_category?: string;
}

/** @description Modelo para guardar un nuevo libro que no se ha creado con anterioridad sin la necesidad de colocar el id*/
export type BookType = Pick<AdminBook, 'boo_name' | 'boo_description' | 'boo_image' | 'boo_autor' | 'boo_category'>


/** @description Modelo que hereda del AdminBook, posee el estado actual del libro */
export type AdminSateBook = AdminBook & {
    state: StateBook['description']
}

/**
 * @description Modelo para indicar los estados del libro
 */
export type StateBook = {
    id: number
    description: string
}

// Estructura de una categoria
export type CategoryType = {
    title: string
    description: string
    image: string
}

// Estructura del Objeto Usuario
export class UserType {
    us_id?: number
    us_name?: string
    us_lastname?: string
    us_cell?: string
    us_email?: string
    us_password?: string
    us_image?: string
    us_admin?: boolean
}

export type LoginUser = Pick<UserType, 'us_email' | 'us_password'>

//Atribuciones

export type Atribuciones = {
    url: string
    texto: string
}

export class TokenUser {
    jwt ?: string
}