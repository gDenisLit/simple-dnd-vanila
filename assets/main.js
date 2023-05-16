'use strict'

function init(){
    const items = getItems()
    renderItems(items)
}

function renderItems(items) {
    const strHtml = items.map(item => `
        <li class="item-preview" draggable="true">
            <div>O</div>
            <h2>${item.name}</h2>
            <h2>${item.price}</h2>
        </li>
    `).join('')
    document.querySelector('.item-list').innerHTML = strHtml
}

function getItems(){
    let id = 101
    return [
        {
            id: id++,
            name: 'item1',
            price: 28,
        },
        {
            id: id++,
            name: 'item2',
            price: 54,
        },
        {
            id: id++,
            name: 'item3',
            price: 13,
        },
    ]
}