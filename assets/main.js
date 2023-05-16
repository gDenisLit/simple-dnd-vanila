'use strict'

var todoItems
var inProgressItems
var doneItems

const todoContainer = document.getElementById("todo-container")
const inProgressContainer = document.getElementById("in-progress-container")
const doneContainer = document.getElementById("done-container")

function init() {
    createItems()
    renderItems()
    addEventListeners()
}

function renderItems() {
    renderArrayItems(todoContainer, todoItems)
    renderArrayItems(inProgressContainer, inProgressItems)
    renderArrayItems(doneContainer, doneItems)
}

function addEventListeners() {
    handleDrop("todo-container", todoItems)
    handleDrop("in-progress-container", inProgressItems)
    handleDrop("done-container", doneItems)
}

function renderArrayItems(container, items) {
    container.innerHTML = ''

    items.forEach((item, i) => {
        const draggableItem = createDraggableItem(item, i)
        container.appendChild(draggableItem)
    })
}

function createDraggableItem(item, index) {
    const draggableItem = document.createElement("li")
    draggableItem.className = "item-preview"
    draggableItem.draggable = true
    draggableItem.textContent = item.name

    draggableItem.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", JSON.stringify({ item, index }))
    })
    return draggableItem
}

function handleDrop(containerId, items) {
    const container = document.getElementById(containerId)

    container.addEventListener("dragover", (event) => {
        event.preventDefault()
    })

    container.addEventListener("drop", (event) => {
        const { item, index } = JSON.parse(event.dataTransfer.getData("text/plain"))
        removeItemFromArrays(item)

        items.splice(index, 0, item)
        renderItems()
    })
}

function removeItemFromArrays(item) {
    removeFromArray(todoItems, item)
    removeFromArray(inProgressItems, item)
    removeFromArray(doneItems, item)
}

function removeFromArray(array, item) {
    const index = array.findIndex(i => i.id === item.id)
    if (index !== -1) {
        array.splice(index, 1)
    }
}

function createItems() {
    let id = 101
    const todos = [
        {
            id: id++ + '',
            name: 'item 1',
            price: 28,
            status: 'todo'
        },
        {
            id: id++ + '',
            name: 'item 2',
            price: 54,
            status: 'todo'
        },
        {
            id: id++ + '',
            name: 'item 3',
            price: 13,
            status: 'todo'
        },
    ]
    const inProgress = [
        {
            id: id++ + '',
            name: 'item 4',
            price: 28,
            status: 'inProgress'
        },
        {
            id: id++ + '',
            name: 'item 5',
            price: 54,
            status: 'inProgress'
        },
        {
            id: id++ + '',
            name: 'item 6',
            price: 13,
            status: 'inProgress'
        },
    ]
    const done = [
        {
            id: id++ + '',
            name: 'item 7',
            price: 28,
            status: 'done'
        },
        {
            id: id++ + '',
            name: 'item 8',
            price: 54,
            status: 'done'
        },
    ]
    todoItems = todos
    inProgressItems = inProgress
    doneItems = done
}