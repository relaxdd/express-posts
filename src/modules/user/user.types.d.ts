export interface IUser {
  id: number,
  name: string,
  login: string,
  created: string
}

export interface IPost {
  id: number,
  title: string,
  content: string,
  created: string,
  modified: string,
  user_id: number
}

export interface DB {
  users: IUser[],
  posts: any[]
}