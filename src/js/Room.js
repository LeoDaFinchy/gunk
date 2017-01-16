import _ from 'lodash'
import {lazyAttribute} from './main'

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
  }

  name () {
    return `${this.colour} room`
  }

  spawnNeighbour () {
    this.neighbours.push(new Room({parentNeighbour: this}))
  }

  generateNeighbours = () => [
    () => [],
    () => [new Room({parentNeighbour: this})],
    () => [new Room({parentNeighbour: this}), new Room({parentNeighbour: this})],
  ][Math.floor(Math.random() * 2.5)]()
}

function randomColour () {
  return _.sample([
    'chocolate',
    'coral',
    'gold',
    'goldenrod',
    'honeydew',
    'ivory',
    'khaki',
    'lavender',
    'orange',
    'pink',
    'plum',
    'thistle',
    'turquoise',
    'wheat',
  ])
}
