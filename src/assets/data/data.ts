import { CategoryType, Dates, StateBook } from "../models/models";

// Arreglo de categorias
export const categories: CategoryType [] = [
    {
        id:1,
        title: 'Ciencia Ficcion'        
    },
    {
        id:2,
        title: 'Romance',       
    },
    {
        id:3,
        title: 'Ficción especulativa'
        
    },
    {
        id:3,
        title: 'Ficcion',
    },
    {
        id:4,
        title:'Misterio',
    },
    {
        id:5,
        title:'Tragedia',
    },
    {
        id:6,
        title:'Medicina',
    }

];

export const statesBook:StateBook[] = [
    { id:1, description: 'disponible'},
    { id:2, description: 'prestado'},
    { id:3, description: 'reservado'},
]

export const dates:Dates[] = [
    { id:1, description:'3 días', days: 3},
    { id:2, description:'5 días', days:5},
    { id:3, description:'1 semana', days:7},
    { id:4, description:'2 semanas', days:14},
]