import _ from 'lodash'
import colour from 'js/aspect/colour'
import name from 'js/aspect/name'
import shape from 'js/aspect/shape'
import size from 'js/aspect/size'
import container from 'js/aspect/container'
import neighbours from 'js/aspect/neighbours'

import {variety} from './aspect'

const TableFactory = variety(
  name('table'),
  colour(),
  size(),
)
const ChairFactory = variety(
  name('chair'),
  colour(),
)

const RoomContents = () => _.compact([
  TableFactory(),
  Math.random() > 0.5 ? ChairFactory() : null,
  Math.random() > 0.5 ? ChairFactory() : null,
  Math.random() > 0.5 ? ChairFactory() : null,
])

const RoomNeighbours = room => () => _.compact([
  RoomFactory({parentNeighbour: room})(),
  Math.random() > 0.5 ? RoomFactory({parentNeighbour: room})() : null,
  Math.random() > 0.5 ? RoomFactory({parentNeighbour: room})() : null,
  Math.random() > 0.5 ? RoomFactory({parentNeighbour: room})() : null,
])

export const RoomFactory = ({parentNeighbour} = {}) => variety(
  name('room'),
  colour(),
  container(RoomContents)(),
  size(),
  shape(),
  neighbours(RoomNeighbours)()(),
)

export default () => {
  const room = RoomFactory()()
  console.log(room)
  console.log(room.colour)
}
