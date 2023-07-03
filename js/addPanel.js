const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')
const panelsStore = new PanelsStore('#panelsList')
const elements = {
    input: document.querySelector('#addPanelInput'),
    alert: document.querySelector('#alert'),
    addBtn: document.querySelector('#addPanelBtn')
}

elements.addBtn.addEventListener('click', async () => {
    if (elements.input.value === '') {
        alert('Enter the name of the panel')
        return
    }

    const newPanel = {
        name: elements.input.value,
        fields: []
    }

    try {
        await dataBase.addPanel(newPanel)
        panelsStore.add(newPanel)
        alert('The panel was successfully added')
    } catch (error) {
        alert(error)
    } finally {
        elements.input.value = ''
    }
})

function alert(alert = null) {
    elements.alert.innerText = alert

    setTimeout(() => {
        elements.alert.innerText = 'Add new panel'
    },5000)
}