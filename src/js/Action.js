import _ from 'lodash'

const playerActivitiesList = {
  standingInRoom: 'standingInRoom',
  inspectingRoom: 'inspectingRoom',
}

export const playerActivities = playerActivitiesList

export default class Actions {
  constructor (app) {
    this._queue = []
    this.app = app
  }

  queueAction = action => {
    this._queue = [...this._queue, action]
  }

  doActions = () => {
    for (const func of this._queue) {
      func()
    }
    this._queue = []
  }

  changeRoom = room => () => {
    this.queueAction(() => {
      this.app.updateState({
        currentRoom: room,
        playerActivity: playerActivities.standingInRoom,
      })
    })
    _.debounce(this.app.cycle, 16)()
  }

  inspectRoom = room => () => {
    this.queueAction(() => {
      this.app.updateState({
        playerActivity: playerActivities.inspectingRoom,
      })
    })
    _.debounce(this.app.cycle, 16)()
  }
}
