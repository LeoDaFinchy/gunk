export default class Room{
  constructor (colour = 'black') {
    this._colour = colour
    this._neighbours = []
  }

  name () {
    return `${this._colour} room`
  }

  * neighbours () {
    for (const neighbour of this._neighbours)
    {
      yield neighbour
    }
  }

  static connectRooms (a, b) {
    a._neighbours.push(b)
    b._neighbours.push(a)
  }
}
