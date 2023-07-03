class PanelsStore {
    panels = []
    panelsParentElement

    constructor(panelsListId) {
        this.panelsParentElement = document.querySelector(panelsListId)
    }

    createPanelElement = (element) => {
        const div = document.createElement('div')
        div.classList.add('board__panel')


        const titleWrapper = document.createElement('div')
        titleWrapper.classList.add('board__title')

        const title = document.createElement('h2')
        title.innerText = element.name
        titleWrapper.appendChild(title)

        titleWrapper.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z" data-original="#000000"/><path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000"/><path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000"/></g></svg>'
        const svg = titleWrapper.children[1]

        svg.addEventListener('click', () => {
            if (addItem.style.display === 'none') {
                addItem.style.display = 'flex'
                return
            }
            addItem.style.display = 'none'
        })

        div.appendChild(titleWrapper)


        const addItem = document.createElement('div')
        addItem.classList.add('board__addItem')

        const addItemWrapper = document.createElement('div')
        addItemWrapper.classList.add('board__titleWrapper')

        const inputColor = document.createElement('input')
        inputColor.classList.add('board__color')
        inputColor.type = 'color'

        inputColor.addEventListener('input', () => {
            addItem.style.background = inputColor.value
        })

        addItemWrapper.appendChild(inputColor)

        const addItemTitle = document.createElement('input')
        addItemTitle.classList.add('board__title')
        addItemTitle.type = 'text'
        addItemTitle.placeholder = 'Title'
        addItemWrapper.appendChild(addItemTitle)

        addItem.appendChild(addItemWrapper)

        const textarea = document.createElement('textarea')
        textarea.cols = '28'
        textarea.rows = '2'
        textarea.placeholder = 'Text'
        addItem.appendChild(textarea)

        const buttonAddItem = document.createElement('button')
        buttonAddItem.innerText = 'Add'
        addItem.appendChild(buttonAddItem)

        div.appendChild(addItem)
        //Отправка element.fields на другой класс
        return div
    }

    printDom = () => {
        this.panels.forEach((el) => {
            const div = this.createPanelElement(el)
            this.panelsParentElement.appendChild(div)
        })
    }

    printDomLast = () => {
        const div = this.createPanelElement(this.panels.at(-1))
        this.panelsParentElement.appendChild(div)
    }

    add = (newEl) => {
        this.panels = [...this.panels, newEl]
        this.printDomLast()
    }

    setAll = (panels) => {
        this.panels = panels
        this.clearDOM()
        this.printDom()
    }

    clearDOM() {
        while(this.panelsParentElement.firstChild) {
            this.panelsParentElement.removeChild(this.panelsParentElement.lastChild)
        }
    }
}