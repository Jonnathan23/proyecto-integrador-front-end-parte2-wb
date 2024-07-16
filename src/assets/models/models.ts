// Estructura del Objeto libro
export type AdminBook = {
    id: number
    name: string
    description: string
    image: string
    autor: string
    category: string
}

/** @description Modelo para guardar un nuevo libro que no se ha creado con anterioridad sin la necesidad de colocar el id*/
export type BookType = Pick<AdminBook, 'name' | 'description' | 'image' | 'autor' | 'category'>


/** @description Modelo que hereda del AdminBook, posee el estado actual del libro */
export type AdminSateBook = AdminBook & {
    state: StateBook['description']
}

/** @description Modelo para el historial de prestamos de libros */
export type LendBookHistory = Pick<AdminBook, 'id' | 'name' | 'category'> & {
    nameUser: string
    date: Date | string
}

/** @description Modelo para el historial de devoluciones de libros */
export type ReturnBookHistory = Pick<AdminBook , 'id'| 'name' | 'category'> & {
    nameUser: string
    date: Date | string
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
export type UserType = {
    idUser: number
    name: string
    lastname: string
    cell: string
    email: string
    password: string
    image: string
    admin: boolean
}

export type LoginUser = Pick<UserType, 'email' | 'password'>

//Atribuciones

export type Atribuciones = {
    url: string
    texto: string
}