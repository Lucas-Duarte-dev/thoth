import crypto from 'node:crypto';

export abstract class Entity<T> {
    protected readonly _id: string;
    public readonly props: T;

    get id(): string {
        return this._id;
    }

    constructor(props: T, id?: string) {
        this.props = props;
        this._id = id || crypto.randomUUID();
    }
}
