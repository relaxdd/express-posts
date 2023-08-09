export interface IUser {
  id: number,
  name: string,
  login: string,
  created: string
}

export interface DB {
  users: IUser[],
  posts: any[]
}