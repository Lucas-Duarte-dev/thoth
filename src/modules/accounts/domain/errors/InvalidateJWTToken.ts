export class InvalidateJWTToken extends Error {
    constructor() {
        super('Token JWT is invalid.');
        this.name = 'InvalidateJWTToken';
    }
}
