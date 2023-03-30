export interface Resolver<T = any, U = any> {
  handle(args: T): Promise<U>
}
