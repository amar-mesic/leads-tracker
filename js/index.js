"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const myLeads = JSON.parse(localStorage.getItem('myLeads') || '[]');
const leadsElement = document.getElementById('leads');
// capture DOM elements
const inputEl = document.getElementById("input-el");
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById("tab-btn");
const inputBtn = document.getElementById("input-btn");
// INITIALIZE LIST
list(myLeads, leadsElement);
// event listener for input button
inputEl.addEventListener('keypress', event => {
    if (event.key == 'Enter') {
        addLead();
        console.log('enter pressed');
    }
});
inputBtn.addEventListener("click", addLead);
// event listener for delete button
deleteBtn.addEventListener('dblclick', event => {
    myLeads.length = 0;
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    list(myLeads, leadsElement);
});
tabBtn.addEventListener('click', e => {
    console.log("button clicked");
    getCurrentTab().then(tab => {
        addUrl(tab.url);
    });
});
/*
    FUNCTIONS
*/
function addLead() {
    if (inputEl.value != '') {
        myLeads.push(inputEl.value);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
    }
    list(myLeads, leadsElement);
}
function addUrl(url) {
    myLeads.push(url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    list(myLeads, leadsElement);
}
function list(list, listElement, event) {
    listElement.innerHTML = '';
    list.forEach(element => {
        let newItem = document.createElement('li');
        let anchorTag = document.createElement('a');
        anchorTag.textContent = element;
        anchorTag.href = element;
        anchorTag.setAttribute('target', '_blank');
        newItem.appendChild(anchorTag);
        listElement.appendChild(newItem);
    });
    //clear the input field
    inputEl.value = '';
}
function getCurrentTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = yield chrome.tabs.query(queryOptions);
        return tab;
    });
}
