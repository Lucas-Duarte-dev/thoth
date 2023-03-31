import { Administrator } from '../domain/administrator'

export interface AdministratorRepositoryInterface {
  exists(email?: string, username?: string): Promise<boolean>
  findByEmail(email: string): Promise<Administrator>
  findByUsername(username: string): Promise<Administrator>
  create(admin: Administrator): Promise<void>
  save(admin: Administrator): Promise<void>
}
