import { Injector, IInjection } from './injector.util'

interface IFake {
  fakeProp: string
}

class FakeImpl implements IFake {
  fakeProp: string = "I'm fake"
}

class NoMatch {
  fakeProp: string = "I'm fake"
}

describe('Injector Unit Tests', () => {
  it('should add new injections and return it when necessary', () => {
    Injector.add<IFake>(FakeImpl)
    expect(Injector.get<IFake>(FakeImpl)).toBeInstanceOf(FakeImpl)
  })

  it('should throw error when there is no associated injection', () => {
    expect(() => Injector.get<IFake>(NoMatch)).toThrow(new Error('No intance found for NoMatch'))
  })

  it('should throw error when there is already an instance registered', () => {
    expect(() => Injector.add<IFake>(FakeImpl)).toThrow(
      new Error('there is already an instance registered for FakeImpl')
    )
  })
})
