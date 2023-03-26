import { HTTPResponse } from "./HTTPResponse";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HTTPResponse>
}
