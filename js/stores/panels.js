class PanelsStore {
    panels = []
    panelsParentElement

    constructor(panelsListId) {
        this.panelsParentElement = document.querySelector(panelsListId)
    }

    createPanelElement = (element) => {

        const div = document.createElement('div')
        div.classList.add('board__panel')
        div.style.background = element.color

        const titleWrapper = document.createElement('div')
        titleWrapper.classList.add('board__title')

        const svgWrapper = document.createElement('div')
        svgWrapper.classList.add('board__svg')

        svgWrapper.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1ZM20 4h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"/><path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0ZM15 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"/></g></svg>'
        svgWrapper.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z" data-original="#000000"/><path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000"/><path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000"/></g></svg>'

        const addPanelSvg = svgWrapper.children[1]
        const deletePanelSvg = svgWrapper.children[0]

        addPanelSvg.addEventListener('click', () => {
            if (addItem.style.display === 'none') {
                addItem.style.display = 'flex'
                return
            }
            addItem.style.display = 'none'
        })

        deletePanelSvg.addEventListener('click', async () => {
            await dataBase.deletePanel(element.id)
            div.remove()
        })

        titleWrapper.appendChild(svgWrapper)

        const titlePanel = document.createElement('h2')
        titlePanel.innerText = element.name
        titleWrapper.appendChild(titlePanel)

        div.appendChild(titleWrapper)

        const addItem = document.createElement('div')
        addItem.classList.add('board__addItem')

        const alert =document.createElement('p')
        alert.innerText = 'Add new note'

        function alertUser(message) {
            alert.innerText = message
        
            setTimeout(() => {
                alert.innerText = 'Add new note'
            },5000)
        }

        addItem.appendChild(alert)

        const addItemWrapper = document.createElement('div')
        addItemWrapper.classList.add('board__titleWrapper')

        const inputColor = document.createElement('input')
        inputColor.classList.add('board__color')
        inputColor.type = 'color'
        inputColor.value = '#dadee5'

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

        buttonAddItem.addEventListener('click', async () => {
            if (addItemTitle.value === '' || textarea.value === '') {
                alertUser('Fill in the entry fields')
                return
            }

            const newNote = {
                title: addItemTitle.value,
                text: textarea.value,
                color: inputColor.value
            }

            element.notes.push(newNote)

            try {
                await dataBase.setNote(element.id, element.notes)
                notesStore.printDomLast()
                alertUser('The note was added')
            } catch (error) {
                alert(error)
            }finally{
                addItemTitle.value = ''
                textarea.value = ''
            }
        })

        addItem.appendChild(buttonAddItem)

        div.appendChild(addItem)

        const notesList = document.createElement('div')
        notesList.classList.add('board__itemsList')

        const notesStore = new NotesStore(notesList, element.id)
        notesStore.setAll(element.notes)

        div.appendChild(notesList)

        return div
    }

    printDom = () => {
        this.panels.forEach((el) => {
            const div = this.createPanelElement(el)
            this.panelsParentElement.appendChild(div)
        })
    }

    setAll = (panels) => {
        this.panels = panels
        this.clearDOM()
        this.printDom()
    }

    printDomLast = () => {
        const div = this.createPanelElement(this.panels.at(-1))
        this.panelsParentElement.appendChild(div)
    }

    add = (newEl) => {
        this.panels = [...this.panels, newEl]
        this.printDomLast()
    }

    clearDOM() {
        while(this.panelsParentElement.firstChild) {
            this.panelsParentElement.removeChild(this.panelsParentElement.lastChild)
        }
    }
}