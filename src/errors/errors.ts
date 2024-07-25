export class ErrorShortPassword extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorShortPassword'
    }
}

export class ErrorFillEmpty extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorFillEmpty'
    }
}

export class ErrorBookIsReserved extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorBookIsReserved'
    }
}

export class NOT_FOUND_ERROR extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorShortPassword'
    }
}