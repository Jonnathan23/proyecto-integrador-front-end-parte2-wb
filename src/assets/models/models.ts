// Estructura del Objeto libro
export class AdminBook {
    boo_id?: number;
    boo_name?: string;
    boo_description?: string;
    boo_image?: string;
    boo_autor?: string;
    boo_category?: string;
    boo_state?: StateBook['description'];
}

/** @description Modelo para guardar un nuevo libro que no se ha creado con anterioridad sin la necesidad de colocar el id*/
export type BookType = Pick<AdminBook, 'boo_name' | 'boo_description' | 'boo_image' | 'boo_autor' | 'boo_category'>


/** @description Modelo que hereda del AdminBook, posee el estado actual del libro */
export type AdminSateBook = AdminBook & {
    state: StateBook['description']
}

/** @description Modelo para indicar los estados del libro  */
export type StateBook = {
    id: number
    description: string
}

export class MyBooks {    
	myBoo_id ?: number;	
	myBoo_idUser ?: number;	
	myBoo_nameUser ?: string;	
	myBoo_idBook ?: number;	
	myBoo_nameBook ?: string;	
	myBoo_stateBook ?: string;
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

export class LendBookHistory {
    lenboo_id?: number;
    lenboo_name?: string;
    lenboo_category?: string;
    lenboo_nameUser?: string;
    lenboo_date?: string;
}

export class ReturnBookHistory {
    retboo_id?: number;
    retboo_name?: string;
    retboo_category?: string;
    retboo_nameUser?: string;
    retboo_date?: string;
}

export type LoginUser = Pick<UserType, 'us_email' | 'us_password'>

//Atribuciones

export type Atribuciones = {
    url: string
    texto: string
}

export class TokenUser {
    jwt?: string
}

export type Dates = {
    id: number
    description: string
    days: number
}