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

export function clientError(error: Error): HTTPResponse {
    return {
        statusCode: 400,
        body: error.message
    }
}

export function unauthorized(error: Error): HTTPResponse {
    return {
        statusCode: 401,
        body: error.message
    }
}
