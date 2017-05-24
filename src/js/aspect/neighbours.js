import _ from 'lodash'
import {aspect} from '.'

const symbol = 'neighbours'

const initNeighbours = (config = [], sourced, read) => _.concat(config, read())

export default aspect(symbol)(initNeighbours)
