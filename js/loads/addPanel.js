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

    panelsPosition = [0]

    panelsStore.getPanels().forEach((el) => {
        panelsPosition.push(el.position)
    })
    
    console.log(panelsPosition);

    let newPanel = {
        name: elements.input.value,
        color: elements.color.value,
        position: Math.max(...panelsPosition) + 1,
        notes: []
    }

    console.log(newPanel);

    // try {
    //     newPanel = await dataBase.addPanel(newPanel)
    //     panelsStore.add(newPanel)
    //     alert('The panel was successfully added')
    // } catch (error) {
    //     alert(error)
    // } finally {
    //     elements.input.value = ''
    // }

    newPanel = await dataBase.addPanel(newPanel)
    panelsStore.add(newPanel)
    alert('The panel was successfully added')
    elements.input.value = ''
    
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