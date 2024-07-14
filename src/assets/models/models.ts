// Estructura del Objeto libro
export type AdminBook = {
    id: number
    name: string
    description: string
    image: string
    autor: string
    category: string
}

export type BookType = Pick<AdminBook, 'name' | 'description' | 'image' | 'autor' | 'category'>

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

export type AddUser = Pick<UserType, 'name'|'lastname'| 'cell'| 'email'| 'password'|'image'|'admin' >

export type LoginUser = Pick<UserType,'email' | 'password'>

//Atribuciones

export type Atribuciones = {
    url:string
    texto:string
}