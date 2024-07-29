import { addLendBookError, connectionError, defaultErrorAlert, errorInputs, shortPassword } from "../alerts/alerts";

export class ErrorShortPassword extends Error {
    override name: string;

    constructor(message: string) {
        super(message)
        this.name = 'ErrorShortPassword'
    }

    public static emitAlert() {
        shortPassword()
    }
}

export class ErrorFillEmpty extends Error {
    override name: string;

    constructor(message: string) {
        super(message)
        this.name = 'ErrorFillEmpty'
    }

    public static emitAlert() {
        errorInputs()
    }
}

export class ErrorBookIsUsed extends Error {
    override name: string;

    constructor(message: string){
        super(message)
       this.name = 'ErrorBookIsUsed'
    }

    public static emitAlert() {
        addLendBookError()
    }
}

export class NOT_FOUND_ERROR extends Error {
    override name: string;

    constructor(message: string){
        super(message)
        this.name = 'ErrorShortPassword'
    }

    public static emitAlert() {
        defaultErrorAlert()
    }
}

export class DefaultErrorAngular extends Error {
    override name: string;

    constructor(message: string) {
        super(message)
        this.name = 'DefaultErrorAngular'
    }
    public static emitAlert() {
        defaultErrorAlert()
    }
}

export class ConectionError extends Error {
    override name: string;

    constructor(message: string) {
        super(message)
        this.name = 'ConectionError'
    }
    public static emitAlert(info: string) {
        connectionError(info)
    }
}