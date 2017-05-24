import _ from 'lodash'

import {aspect} from '.'

const symbol = 'colour'

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

const initColour = (config, source, reader) => config || source()

export default aspect(symbol)(initColour)()(randomColour)
