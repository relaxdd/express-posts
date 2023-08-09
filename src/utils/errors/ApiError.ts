class ApiError extends Error {
  public code: number
  public error: string | undefined

  constructor(code: number, error?: string, message?: string) {
    super(message)

    this.name = 'ApiError'
    this.code = code
    this.error = error
  }
}

export default ApiError