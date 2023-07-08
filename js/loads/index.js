const dataBase = new DataBase('https://slaik1.github.io/Kanban-board/server/db.json')
const panelsStore = new PanelsStore('#panelsList')
const loader = document.querySelector('#preloader')

async function loadPanels() {
    const panels = await dataBase.getPanels()
    panelsStore.setAll(panels)
    loader.style.display = 'none'
}

loadPanels()