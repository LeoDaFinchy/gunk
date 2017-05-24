import _ from 'lodash'

export const accumulate = property => arr => _.tail(
  _.reduce(
    arr,
    (result, item) => [...result, _.last(result) + item[property]],
    [0]
  )
)

export function randomWeighted (weightedOptions) {
  const upperBounds = accumulate('weight')(weightedOptions)
  const values = _.map(weightedOptions, x => x.value)
  return () => {
    const sampler = Math.random() * _.last(upperBounds)
    const which = _.findIndex(upperBounds, x => x >= sampler)
    return values[which]
  }
}
