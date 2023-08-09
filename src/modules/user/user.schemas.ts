import Joi from 'joi'
import { DB } from './user.types'

const LOGIN_PATTERN = /^[a-z0-9_-]{2,20}$/i
const MYSQL_DATE_PATTERN = /(\d{4}-\d{2}-\d{2} (?:\d{2}:){2}\d{2})/

export const userSchema = {
  id: Joi.number().integer().sign('positive').required().min(1),
  login: Joi.string().required().pattern(LOGIN_PATTERN, { name: 'Login' }),
  name: Joi.string().required(),
  created: Joi.string().min(19).max(26).pattern(MYSQL_DATE_PATTERN, { name: 'MySql Date' }).required()
}

export const createSchema = Joi.object({
  login: userSchema.login,
  name: userSchema.name
})

export const updateSchema = Joi.object({
  id: userSchema.id,
  login: userSchema.login,
  name: userSchema.name
})

export const dbSchema = Joi.object<DB>({
  users: Joi.array().items(Joi.object(userSchema)),
  posts: Joi.array().items(Joi.any())
})