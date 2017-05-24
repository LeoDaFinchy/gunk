import {aspect} from '.'

const symbol = 'name'

const initName = (config, sourced, read) => config || 'thingy'

export default aspect(symbol)(initName)()()
