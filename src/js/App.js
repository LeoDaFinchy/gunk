import _ from 'lodash'

export default class App {
  constructor (state) {
    this._state = state
    this._actions = []
  }

  get currentRoom () { return this._state.currentRoom }
  set currentRoom (room) {
    this._actions.push(() => {
      this._state.currentRoom = room
    })
    _.debounce(this.cycle, 16)()
  }

  doActions () {
    for (const func of this._actions) {
      func()
    }
    this._actions = []
  }

  getRoomAdjectives (room) {
    const {size, shape, colour} = room
    return _.compact([
      size === 'average' ? null : size,
      shape,
      colour,
    ])
  }

  renderRoom (room) {
    const adjectives = this.getRoomAdjectives(room).join(', ')
    const el = document.createElement('div')
    el.innerText = `You are in a ${adjectives} room`
    el.className = `${room.colour} ${room.size} ${room.shape}`
    return el
  }

  * actionButtons () {
    for (const neighbour of this.currentRoom.neighbours) {
      const button = document.createElement('button')
      button.onclick = () => {
        this.currentRoom = neighbour
      }
      button.className = neighbour.colour
      const adjectives = this.getRoomAdjectives(neighbour).join(', ')
      button.innerText = `Go to ${adjectives} room`
      yield button
    }
  }

  renderActions () {
    const actionsContainer = document.getElementById('actions')
    while (actionsContainer.firstChild) {
      actionsContainer.removeChild(actionsContainer.firstChild)
    }
    for (const button of this.actionButtons()) {
      actionsContainer.appendChild(button)
    }
  }

  renderState () {
    const viewContainer = document.getElementById('view')
    while (viewContainer.firstChild) {
      viewContainer.removeChild(viewContainer.firstChild)
    }
    viewContainer.appendChild(this.renderRoom(this.currentRoom))
  }

  cycle = () => {
    this.doActions()
    this.renderState()
    this.renderActions()
  }
}
