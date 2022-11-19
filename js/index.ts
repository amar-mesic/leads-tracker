const myLeads = JSON.parse(localStorage.getItem('myLeads') || '[]')
const leadsElement = document.getElementById('leads')!


// capture DOM elements
const inputEl = document.getElementById("input-el") as HTMLInputElement
const deleteBtn = document.getElementById('delete-btn')!
const tabBtn = document.getElementById("tab-btn")!
const inputBtn = document.getElementById("input-btn")!


// INITIALIZE LIST
list(myLeads, leadsElement)


// event listener for input button
inputEl.addEventListener<'keypress'>('keypress', event => {
    if (event.key == 'Enter') {
        addLead()
        console.log('enter pressed')
    }
})

inputBtn.addEventListener("click", addLead)

// event listener for delete button
deleteBtn.addEventListener<'dblclick'>('dblclick', event => {
    myLeads.length = 0
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    list(myLeads, leadsElement)
})

tabBtn.addEventListener('click', e => {

    console.log("button clicked")
    getCurrentTab().then(tab => {
        addUrl(tab.url!)
    })
    
})





/*
    FUNCTIONS
*/
function addLead(): void {
    if (inputEl.value != '') {
        myLeads.push(inputEl.value)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
    }
    list(myLeads, leadsElement)
}

function addUrl(url: string): void {
    myLeads.push(url)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    list(myLeads, leadsElement)
}

function list(list: any[], listElement: HTMLElement, event?: Event) {

    listElement.innerHTML = ''
    list.forEach(element => {
        let newItem = document.createElement('li')
        let anchorTag = document.createElement('a')
        anchorTag.textContent = element
        anchorTag.href = element
        anchorTag.setAttribute('target', '_blank')

        newItem.appendChild(anchorTag)
        listElement.appendChild(newItem)
    });

    //clear the input field
    inputEl.value = ''
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}