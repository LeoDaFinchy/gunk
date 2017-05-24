import {aspect} from '.'
import {randomWeighted} from 'js/utils/misc'

const symbol = 'size'

const randomSize = randomWeighted([
  {value: 'huge', weight: 1},
  {value: 'large', weight: 2},
  {value: 'average', weight: 4},
  {value: 'small', weight: 2},
  {value: 'tiny', weight: 1},
])

const initSize = (config, source, reader) => config || source()

export default aspect(symbol)(initSize)()(randomSize)
