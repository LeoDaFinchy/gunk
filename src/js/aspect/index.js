import _ from 'lodash'

export const aspect = symbol => initialiser => (reader = () => () => {}) => (source = () => {}) => config => target => Object.defineProperty(target, symbol, {
  get: () => {
    const value = initialiser(config, source, reader(target))
    Object.defineProperty(target, symbol, {
      value,
      enumerable: true,
    })
    return value
  },
  enumerable: true,
  configurable: true,
})

export const variety = (...aspects) => (target = {}) => _.reduce(aspects, (target, aspect) => aspect(target), target)
