export interface IInjection<T> {
    token: Symbol
    injection: T
}

export const Injector = new class<T> {
    private injections: IInjection<T>[] = []

    get<T>(token: Symbol){
        const instance = this.injections.find(injection => injection.token === token)
        if(instance) {
            return instance
        }
        throw `No implementation for ${token} found`
    }

    add<T>(){

    }
}
