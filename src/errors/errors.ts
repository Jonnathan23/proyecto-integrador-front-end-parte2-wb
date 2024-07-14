export class ErrorShortPassword extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorShortPassword'
    }
}
