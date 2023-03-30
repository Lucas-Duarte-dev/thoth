import { HTTPResponse } from "./HTTPResponse";

export interface Middleware<T = any, U = any> {
    handle(request: T, body?: U): Promise<HTTPResponse>;
}
