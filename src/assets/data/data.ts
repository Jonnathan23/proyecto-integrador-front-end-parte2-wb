import { CategoryType, Dates, StateBook } from "../models/models";

// Arreglo de categorias
export const categories: CategoryType [] = [
    {
        title: 'Ciencia Ficcion',
        description: 'Quisque ullamcorper urna sit amet metus volutpat consequat. Aenean vulputate id felis eu aliquam.',
        image: 'assets/img/cohete.jpg'
    },
    {
        title: 'Romance',
        description: 'Curabitur vel orci ac purus dignissim condimentum. Nunc at commodo urna. Nulla varius lectus nec pellentesque rhoncus.',
        image: 'assets/img/cohete.jpg'
    },
    {
        title: 'Ficción especulativa',
        description: ' Nunc dolor sapien, cursus sed semper ac, finibus quis diam. Vestibulum mollis convallis ipsum, eu viverra tellus facilisis et',
        image: 'assets/img/cohete.jpg'
    },
    {
        title: 'Ficcion',
        description: 'Nunc tincidunt nunc ac turpis lobortis, et euismod ipsum posuere. Nunc non semper magna, vitae scelerisque nisi. Nunc pretium gravida pretium. ',
        image: 'assets/img/cohete.jpg'
    },
    {
        title:'Misterio',
        description:'Donec orci metus, rutrum eu dignissim et, tempus vel sapien. Mauris feugiat neque commodo ultrices varius. Ut in sodales nisi.',
        image:'assets/img/cohete.jpg'
    },
    {
        title:'Tragedia',
        description:'Dnec orci metus, rutrum eu dignissim et, tempus vel sapien. Mauris feugiat neque commodo ultrices varius. Ut in sodales nisi.',
        image:'assets/img/cohete.jpg'
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