export interface Action<T = any> {
  execute(request: T): Promise<Boolean>
}
