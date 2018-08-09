export interface IInjection<T> {
  token: string
  injection: any
}

export const Injector = new class<T> {
  private injections: IInjection<T>[] = []

  private findInstance(token: string) {
    return this.injections.find(injection => {
      return injection.token === token
    })
  }

  get<T>(constructor: { new (): T }): T {
    const token = constructor.name
    const instance = this.findInstance(token)
    if (instance) {
      return instance.injection
    }
    throw `No intance found for ${token}`
  }

  add<T>(constructor: { new (): T }) {
    if (this.findInstance(constructor.name)) {
      throw `there is already an instance registered for ${constructor.name}`
    }
    this.injections.push({
      token: constructor.name,
      injection: new constructor()
    })
  }
}()
