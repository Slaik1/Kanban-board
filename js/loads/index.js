const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')
const panelsStore = new PanelsStore('#panelsList')

async function loadPanels() {
    const panels = await dataBase.getPanels()
    panelsStore.setAll(panels)
}

loadPanels()