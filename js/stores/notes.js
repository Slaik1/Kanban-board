class NotesStore {
    notes = []
    panelId
    notesParentElement

    constructor(notesParentElement, panelId) {
        this.notesParentElement = notesParentElement
        this.panelId = panelId
    }

    createNoteElement = (element) => {
        const div = document.createElement('div')
        div.classList.add('board__item')
        div.style.background = element.color

        const title = document.createElement('p')
        title.classList.add('board__title')
        title.innerText = element.title
        div.appendChild(title)

        const text = document.createElement('p')
        text.classList.add('board__text')
        text.innerText = element.text
        div.appendChild(text)

        div.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 320.591 320.591" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"/><path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"/></g></svg>'

        const delBtn = div.children[2]

        console.log(this.notes);
        delBtn.addEventListener('click', async () => {
            let index
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i] === element) {
                    index = i
                }
            }
            this.notes.splice(index, 1)
            await dataBase.changeParamsPanel(this.panelId, {notes: this.notes})
            div.remove()
        })

        return div
    }

    printDom = () => {
        this.notes.forEach((el) => {
            const div = this.createNoteElement(el)
            this.notesParentElement.appendChild(div)
        })
    }

    setAll = (notes) => {
        this.notes = notes
        this.clearDOM()
        this.printDom()
    }

    printDomLast = () => {
        const div = this.createNoteElement(this.notes.at(-1))
        this.notesParentElement.appendChild(div)
    }

    add = (newEl) => {
        this.notes = [...this.notes, newEl]
        this.printDomLast()
    }

    clearDOM() {
        while(this.notesParentElement.firstChild) {
            this.notesParentElement.removeChild(this.notesParentElement.lastChild)
        }
    }
}