import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './model/templates/listTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  // for Adding listener to new entry form submit
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    // for Getting the new item value
    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return
    else{input.value=""}

    // calculate item ID
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    // create new item
    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    template.render(fullList)
  })

  // Clear button
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

  clearItems.addEventListener('click', (): void => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp) 