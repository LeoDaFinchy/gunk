import {randomWeighted} from 'js/utils/misc'
import {aspect} from '.'

const symbol = 'shape'

const randomShape = randomWeighted([
  {value: 'square', weight: 4},
  {value: 'round', weight: 3},
  {value: 'rectangular', weight: 6},
  {value: 'triangular', weight: 1},
  {value: 'hexagonal', weight: 2},
])

const initShape = (config, source, reader) => config || source()

export default aspect(symbol)(initShape)()(randomShape)
