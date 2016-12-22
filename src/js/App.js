export default class App{
  constructor(state){
    this._state = state
    this._actions = []
  }

  get currentRoom () {return this._state.currentRoom}
  set currentRoom (room) {
    this._actions.push (() => {
      this._state.currentRoom = room
    })
    _.debounce(this.cycle, 16)()
  }

  doActions () {
    for(const func of this._actions){
      func()
    }
    this._actions = []
  }
  
  renderState () {
    const viewContainer = document.getElementById('view')
    while(viewContainer.firstChild){
      viewContainer.removeChild(viewContainer.firstChild)
    }
    viewContainer
  }
  
  renderRoom (room) {
    const el = document.createElement('div')
    el.innerText = `You are in a ${room.name()}`
    return el
  }

  * actionButtons () {
    for(const neighbour of this.currentRoom.neighbours()){
      const button = document.createElement('button')
      button.onclick = () => {
        this.currentRoom = neighbour
      }
      button.innerText = `Go to ${neighbour.name()}`
      yield button
    }
  }

  renderActions () {
    const actionsContainer = document.getElementById('actions')
    while(actionsContainer.firstChild){
      actionsContainer.removeChild(actionsContainer.firstChild)
    }
    for(const button of this.actionButtons()){
      actionsContainer.appendChild(button)
    }
  }

  renderState () {
    const viewContainer = document.getElementById('view')
    while(viewContainer.firstChild){
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
