const inputEl = document.querySelector("#inputEl");
const ulEl = document.querySelector("#ulEl");

// Buttons Declarations
const saveInputBtn = document.querySelector(".saveInput-btn");
const saveTabBtn = document.querySelector(".saveTab-btn");
const deleteAllBtn = document.querySelector(".deleteAll-btn");

let myLeads = [];

// Getting items stored in the form of arrays from the localStorage 
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Rendering leads out if any
if(leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage;
    render(myLeads);
};

// Function to render out all the leads from the array
function render(leads){
    let listItems = "";
    for(let i = 0 ; i < leads.length ; i++)
    {
        listItems += `<li>
                            <a href = "${leads[i]}" target = "_blank">${leads[i]}</a>
                        </li>`;
    };
    ulEl.innerHTML = listItems;
};


// Buttons Working

// Save Input Button
saveInputBtn.addEventListener("click",function()
{
    myLeads.push(inputEl.value);
    render(myLeads);
    inputEl.value = " ";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));  
});

// Save Tab Button
saveTabBtn.addEventListener("click",function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
     });
});

// Delete All Button
deleteAllBtn.addEventListener("dblclick",function()
{
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});



