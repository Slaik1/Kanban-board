class DataBase {
    baseUrl
    endpoints = {
        panels:'/panels/'
    }

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async addPanel(panelObj) {
        const request = await fetch(this.baseUrl + this.endpoints.panels, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(panelObj)
        })
        return await request.json()
    }

    async getPanels() {
        const request = await fetch(this.baseUrl + this.endpoints.panels, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        return await request.json()
    }

    async getParamPanel(key, value) {
        const url = new URL(this.baseUrl + this.endpoints.panels)
        url.searchParams.append(key, value)
        const request = await fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        return await request.json()
    }

    async changeParamsPanel(id, param) {
        const request = await fetch(this.baseUrl + this.endpoints.panels + id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(param)
        })
        return  await request.json()
    }

    async setNote(panelId, noteArray) {
        const request = await fetch(this.baseUrl + this.endpoints.panels + panelId, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({notes: noteArray})
        })
        return await request.json()
    }
}