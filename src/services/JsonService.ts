import * as fs from 'fs'
import Joi from 'joi'

class JsonService {
  private readonly file: string

  public constructor(file: string) {
    this.file = file
  }

  public validateJson<T extends Record<string, any>>(data: T, schema: Joi.ObjectSchema<T>) {
    const result = schema.validate(data)

    if (result.error) throw result.error
    if (result.warning) console.warn(result.warning)

    return result.value
  }

  public read<T = any>(jsonSchema?: Joi.ObjectSchema) {
    try {
      const json = fs.readFileSync(this.file, 'utf8')
      const data = JSON.parse(json)

      return (!jsonSchema ? data : this.validateJson(data, jsonSchema)) as T
    } catch (e) {
      throw new Error('Ошибка извлечения данных из файла!' + (e as Error).message)
    }
  }

  public write(data: any) {
    try {
      const json = JSON.stringify(data, null, 2)
      fs.writeFileSync(this.file, json, 'utf8')
    } catch (e) {
      throw new Error('Ошибка записи данных в файл!' + (e as Error).message)
    }
  }

  public readField<T extends Record<string, any>, K extends keyof T = keyof T>(key: K, jsonSchema?: Joi.ObjectSchema<T>) {
    return this.read<T>(jsonSchema)?.[key] || null
  }

  public writeField<T extends Record<string, any>>(key: keyof T, data: any, jsonSchema?: Joi.ObjectSchema<T>) {
    this.write({ ...this.read(jsonSchema), [key]: data })
  }
}

export default JsonService