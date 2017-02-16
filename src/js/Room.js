import _ from 'lodash'
import {lazyAttribute} from './main'

const accumulate = property => arr => _.tail(_.reduce(arr, (result, item) => [...result, _.last(result) + item[property]], [0]))

export default class Room {
  constructor ({parentNeighbour} = {}) {
    lazyAttribute(this, 'neighbours', () => {
      const neighbours = []
      if (parentNeighbour) {
        neighbours.push(parentNeighbour)
      }
      return _.concat(neighbours, this.generateNeighbours())
    })
    lazyAttribute(this, 'colour', randomColour)
    lazyAttribute(this, 'size', randomSize)
    lazyAttribute(this, 'shape', randomShape)
  }

  name () {
    return `${this.size} ${this.shape} ${this.colour} room`
  }

  spawnNeighbour () {
    this.neighbours.push(new Room({parentNeighbour: this}))
  }

  generateNeighbours = () => [
    () => [],
    () => [new Room({parentNeighbour: this})],
    () => [new Room({parentNeighbour: this}), new Room({parentNeighbour: this})],
  ][Math.floor(Math.random() * 2.7)]()
}

function randomColour () {
  return _.sample([
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'purple',
    'violet',
    'black',
    'white',
  ])
}

const randomSize = randomWeighted([
  {value: 'huge', weight: 1},
  {value: 'large', weight: 2},
  {value: 'average', weight: 4},
  {value: 'small', weight: 2},
  {value: 'tiny', weight: 1},
])

const randomShape = randomWeighted([
  {value: 'square', weight: 4},
  {value: 'round', weight: 3},
  {value: 'rectangular', weight: 6},
  {value: 'triangular', weight: 1},
  {value: 'hexagonal', weight: 2},
])

export function randomWeighted (weightedOptions) {
  const upperBounds = accumulate('weight')(weightedOptions)
  const values = _.map(weightedOptions, x => x.value)
  return () => {
    const sampler = Math.random() * _.last(upperBounds)
    const which = _.findIndex(upperBounds, x => x >= sampler)
    return values[which]
  }
}
