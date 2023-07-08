class DataBase {
    baseUrl

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async addPanel(panelObj) {
        const request = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(panelObj)
        })
        return await request.json()
    }

    async getPanels() {
        const request = await fetch(this.baseUrl, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        return await request.json()
    }

    async getParamPanel(key, value) {
        const url = new URL(this.baseUrl)
        url.searchParams.append(key, value)
        const request = await fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        return await request.json()
    }

    async changeParamsPanel(id, param) {
        const request = await fetch(this.baseUrl + '/' + id, {
            method: 'PATCH',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(param)
        })
        return  await request.json()
    }

    async setNote(panelId, noteArray) {
        const request = await fetch(this.baseUrl + '/' + id, {
            method: 'PATCH',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({notes: noteArray})
        })
        return await request.json()
    }

    async deletePanel(panelId) {
        await fetch(this.baseUrl + '/' + id, {
            method: 'DELETE'
        })
    }
}