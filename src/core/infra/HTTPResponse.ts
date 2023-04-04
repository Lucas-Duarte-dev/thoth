import { DomainError } from '@core/domain/errors/DomainError'

export type HTTPResponse = {
    statusCode: number,
    body: any
}

export function ok<T = any>(dto?: T): HTTPResponse {
    return {
        statusCode: 200,
        body: dto
    }
}

export function created(): HTTPResponse {
    return {
        statusCode: 201,
        body: undefined
    }
}

export function clientError(error: Error|DomainError): HTTPResponse {
    return {
        statusCode: 400,
        body: error.message
    }
}

export function unauthorized(error: Error|DomainError): HTTPResponse {
    return {
        statusCode: 401,
        body: error.message
    }
}

export function forbidden(error: Error|DomainError): HTTPResponse {
    return {
        statusCode: 403,
        body: error.message
    }
}

export function fail(error: Error|DomainError): HTTPResponse {
    return {
        statusCode: 500,
        body: error.message
    }
}
