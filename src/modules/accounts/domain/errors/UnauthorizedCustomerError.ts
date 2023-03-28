class UnauthorizedCustomerError extends Error {
    constructor() {
        super('Email or password is invalid.');
        this.name = 'UnauthorizedCustomerError';
    }
}
