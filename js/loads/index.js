const dataBase = new DataBase('http://localhost:3000')
const panelsStore = new PanelsStore('#panelsList')
const loader = document.querySelector('#preloader')

async function loadPanels() {
    const panels = await dataBase.getPanels()
    panelsStore.setAll(panels)
    loader.style.display = 'none'
}

loadPanels()