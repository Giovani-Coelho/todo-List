let banc = [
    { tarefa: "jogar", status: "checked" },
    { tarefa: "estudar", status: "" },
]
const creatList = (tarefa, status, index) => {
    let item = document.createElement("label")
    item.classList.add("todo__item")
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-index=${index}> 
    `
    document.querySelector("#todoList").appendChild(item)
}
const updateItem = () => {
    adjustList()
    banc.forEach((item, index) => creatList(item.tarefa, item.status, index))
}
const adjustList = () => {
    const todoList = document.querySelector("#todoList")
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}
const insertItem = (event) => {
    const chave = event.key
    const txt = event.target.value
    if (chave === "Enter") {
        adjustList()
        banc.push({ tarefa: txt, status: "" })
        updateItem()
        event.target.value = ""
    }
}
const removeItem = (index) => {
    banc.splice(index, 1)
    updateItem()
}
const listChecked = (index) => {
    banc[index].status = banc[index].status === "" ? "checked" : ""
}
const clickItem = (event) => {
    const item = event.target
    if (item.type === "button") {
        const position = item.dataset.index
        removeItem(position)
    } else if (item.type === "checkbox") {
        const position = item.dataset.index
        listChecked(position)
    }
}
document.querySelector("#newItem").addEventListener("keypress", insertItem)
document.querySelector("#todoList").addEventListener("click", clickItem)

updateItem()
