import _ from 'lodash'
import {playerActivities} from './Action'

export default class App {
  constructor (state) {
    this._state = state
    this._actions = []
  }

  get currentRoom () { return this._state.currentRoom }
  get currentActivity () { return this._state.playerActivity }

  updateState = newState => {
    this._state = _.merge(this._state, newState)
  }

  doActions () {
    this.actionSet.doActions()
  }

  get actionSet () {
    console.error('Actions not yet connected to App')
  }
  set actionSet (actions) {
    Object.defineProperty(this, 'actionSet', {
      value: actions,
    })
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
    const {playerActivity} = this._state
    if (playerActivity === playerActivities.inspectingRoom) {
      return this.renderRoomDetailed(room)
    }
    return this.renderRoomCursory(room)
  }

  renderRoomCursory (room) {
    const el = document.createElement('div')
    el.innerText = `You are in a ${room.colour} room.`
    el.className = `${room.colour}`
    return el
  }

  renderRoomDetailed (room) {
    const adjectives = this.getRoomAdjectives(room).join(', ')
    const el = document.createElement('div')
    el.innerText = `You are in a ${adjectives} room`
    el.className = `${room.colour} ${room.size} ${room.shape}`
    return el
  }

  renderChangeRoomButton (room) {
    const button = document.createElement('button')
    button.onclick = this.actionSet.changeRoom(room)
    button.className = room.colour
    button.innerText = `Go to ${room.colour} room`
    return button
  }

  renderInspectRoomButton (room) {
    const button = document.createElement('button')
    button.onclick = this.actionSet.inspectRoom(room)
    button.className = room.colour
    button.innerText = `Inspect ${room.colour} room`
    return button
  }

  * actionButtons () {
    for (const neighbour of this.currentRoom.neighbours) {
      yield this.renderChangeRoomButton(neighbour)
    }
    if (this.currentActivity === playerActivities.standingInRoom) {
      yield (this.renderInspectRoomButton(this.currentRoom))
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
