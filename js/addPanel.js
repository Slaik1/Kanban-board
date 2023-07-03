const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')
const panelsStore = new PanelsStore('#panelsList')
const elements = {
    panel: document.querySelector('#addPanel'),
    input: document.querySelector('#addPanelInput'),
    color: document.querySelector('#addPanelColor'),
    alert: document.querySelector('#alert'),
    addBtn: document.querySelector('#addPanelBtn')
}

elements.addBtn.addEventListener('click', async () => {
    if (elements.input.value === '') {
        alert('Enter the name of the panel')
        return
    }

    let newPanel = {
        name: elements.input.value,
        color: elements.color.value,
        notes: []
    }

    try {
        newPanel = await dataBase.addPanel(newPanel)
        panelsStore.add(newPanel)
        alert('The panel was successfully added')
    } catch (error) {
        alert(error)
    } finally {
        elements.input.value = ''
    }
})

elements.color.addEventListener('input', () => {
    elements.panel.style.background = elements.color.value
})

function alert(alert) {
    elements.alert.innerText = alert

    setTimeout(() => {
        elements.alert.innerText = 'Add new panel'
    },5000)
}