

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}


populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

// Itens de Coleta
// Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedIems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou Remover uma Classe com JavaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // verificar se existem ítens selecionados, se sim
    // pegar os ítens selecionados
    const alreadySelected = selectedIems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })


    // se já estiver selecionado,
    if( alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedIems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedIems = filteredItems
    } else {
        // se não estiver selecionado,
        // adicionar à seleção
        selectedIems.push(itemId)
    }

    console.log('selectedIems: ', selectedIems)
    

    // atualizar o campo escondido, com os ´tens selecionados
    collectedItems.value = selectedIems
}