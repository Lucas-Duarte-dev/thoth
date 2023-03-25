export class AccountAlreadyExists extends Error {
    constructor(email: string) {
        super(`Customer with email ${email} already exists.`)
        this.name = 'AccountAlreadyExists'
    }
}
