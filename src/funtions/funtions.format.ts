export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
}