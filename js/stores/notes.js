class NotesStore {
    notes = []
    notesParentElement

    constructor(notesListId) {
        this.notesParentElement = document.querySelector(notesListId)
    }

    createNoteElement = (element) => {
        const div = document.createElement('div')

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