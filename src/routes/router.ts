import express from 'express'
import userRouter from '../modules/user/user.routes'
// import postRouter from '../schemes/post/post.routes'

const router = express.Router()

router.use(express.json({}))
// router.use(cors({ origin: '...' }))

router.use('/user', userRouter)
// router.use('/post', postRouter)

export default router