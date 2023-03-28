export interface Command<T = any> {
    execute(request?: any): Promise<void>;
}
