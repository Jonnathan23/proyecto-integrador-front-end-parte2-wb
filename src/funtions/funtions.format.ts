export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
}
/**
 * @description Genera una ventana xhtml emergente creada en java
 * @param idUser 
 */
export const generateWindow = (idUser: number) => {
    const width = 600;
    const height = 400;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;    
    window.open(`http://localhost:8080/proyectobackend/faces/notification.xhtml?userId=${idUser}`, '_blank', windowFeatures);

}