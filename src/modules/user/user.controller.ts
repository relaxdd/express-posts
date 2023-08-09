import { Request, Response } from 'express'
import userService from './user.service'
import { IUser } from './user.types'
import ApiError from '../../utils/errors/ApiError'

class UserController {
  private static defaultError(res: Response, err: ApiError) {
    console.log(err)

    const defText = 'На сервере произошла не предвиденная ошибка!'

    if (err.error)
      return res.status(err?.code || 500).json({ error: err?.message || err?.error || defText })
    else
      return res.status(err?.code || 500).json({ error: err?.message || defText })
  }

  // ************************

  public static getAll(_: Request, res: Response) {
    return res.json(userService.loadAll())
  }

  public static getById(req: Request, res: Response) {
    const id = req.params['id']!

    try {
      const user = userService.findById(+id)
      return res.json(user)
    } catch (e) {
      return UserController.defaultError(res, e as ApiError)
    }
  }

  // TODO: Тут остановился!

  public static createOne(req: Request, res: Response) {
    const { name, login } = req.body as Omit<IUser, 'id'>

    try {
      const id = userService.createItem({ name, login })

      const message = 'Новый пользователь был успешно создан!'
      return res.status(201).json({ message, id })
    } catch (e) {
      return UserController.defaultError(res, e as ApiError)
    }
  }

  public static updateOne(req: Request, res: Response) {
    const { name, login } = req.body as IUser
    const id = +(req.body as IUser).id

    try {
      userService.updateItem({ id, name, login })
    } catch (e) {
      return UserController.defaultError(res, e as ApiError)
    }

    return res.json({ message: 'Пользователь успешно обновлен!' })
  }

  public static deleteOne(req: Request, res: Response) {
    const id = req.params['id']!

    try {
      userService.removeItem(+id)
    } catch (e) {
      return UserController.defaultError(res, e as ApiError)
    }

    const message = 'Пользователь был успешно удален!'
    return res.json({ message })
  }

  public static getUserPosts(req: Request, res: Response) {
    const userId = req.params['id']!
    const posts = userService.getAllPostsByUserId(+userId)

    return res.json(posts)
  }
}

export default UserController