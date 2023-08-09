import path from 'path'
import { __abs_path } from '../../defines'
import JsonService from '../../services/JsonService'
import { DB, IPost, IUser } from './user.types'
import { getMySqlDate } from '../../utils'
import ApiError from '../../utils/errors/ApiError'
import { dbSchema } from './user.schemas'


class UserService {
  private readonly jsonService: JsonService

  constructor() {
    this.jsonService = new JsonService(path.resolve(__abs_path, 'db.json'))
  }

  private save(users: IUser []) {
    this.jsonService.writeField('users', users, dbSchema)
  }

  // @Getters

  public loadAll(): IUser[] {
    return this.jsonService.read<DB>(dbSchema)?.users || []
  }

  public findById(id: number) {
    const user = this.loadAll().find(it => it.id === +id)

    if (!user) {
      const error = 'Пользователь с данным ID не найден!'
      throw new ApiError(404, error)
    }

    return user
  }

  // @Setters

  public createItem(obj: { name: string, login: string }) {
    const users = this.loadAll()
    const user = users.find(it => it.login === obj.login)

    if (user) {
      const error = 'Пользователь с таким логином уже существует!'
      throw new ApiError(400, error)
    }

    const id = users.length + 1

    const update = [...users, {
      id,
      name: obj.name,
      login: obj.login,
      created: getMySqlDate()
    }]

    this.save(update)

    return id
  }

  // TODO: Доработать, убрать правку логина и накинуть необязательность всех данных
  public updateItem(obj: { name: string; id: number; login: string }) {
    const users = this.loadAll()
    const index = users.findIndex(it => it.id === obj.id)

    if (index === -1) {
      const error = 'Пользователь с данным ID не найден!'
      throw new ApiError(404, error)
    }

    const update = users.map((it) => {
      return it.id !== obj.id ? it : {
        ...it, name: obj.name, login: obj.login
      }
    })

    this.save(update)
  }

  public removeItem(id: number) {
    const filter = this.loadAll().filter(it => it.id !== id)
    this.save(filter)
  }

  public getAllPostsByUserId(userId: number): IPost[] {
    const posts = this.jsonService.read<DB>(dbSchema)?.posts || []
    return posts.filter(it => it.user_id === userId)
  }
}

export default new UserService()