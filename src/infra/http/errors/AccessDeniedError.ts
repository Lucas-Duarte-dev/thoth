export class AccessDeniedError extends Error {
    constructor() {
        super('Your access is denied.');
        this.name = 'AccessDeniedError';
    }
}
