import { Router } from 'express'
import controller from './user.controller'
import { createSchema, updateSchema } from './user.schemas'
import checkContentType from '../../middlewares/checkContentType'
import validateJsonBody from '../../middlewares/validateJsonBody'
import { checkIdParam } from './user.middlewares'

const userRouter = Router()

userRouter.get('/', controller.getAll)
userRouter.get('/:id', checkIdParam, controller.getById)
userRouter.post('/', checkContentType('application/json', true), validateJsonBody(createSchema), controller.createOne)
userRouter.put('/', checkContentType('application/json', true), validateJsonBody(updateSchema), controller.updateOne)
userRouter.delete('/:id', checkIdParam, controller.deleteOne)

userRouter.get('/:id/posts', checkIdParam, controller.getUserPosts)
userRouter.get('/:id/posts/:postId', checkIdParam, controller.getUserPostById)

export default userRouter