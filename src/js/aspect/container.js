import {aspect} from '.'
const symbol = 'container'

const initContents = (config, source, reader) => config || source()

export default aspect(symbol)(initContents)()
