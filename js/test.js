async function test() {
    const data = new DataBase('https://slaik1.github.io/Kanban-board/server/db.json')
    const request = await data.getPanels()
    console.log(request);
}

test()