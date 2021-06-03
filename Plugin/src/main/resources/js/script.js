let baseURL = "http://localhost:1990/confluence";
let pageTitleJson = "";
let pageVerJson = "";
let selectedPID = "";

/**
 * onInit - functions to call when document loads
 */
function onInit(){
    fetchAllPages();
}
document.onload = onInit();

/**
 * fetchAllPageTitles - fetch all pages when Create is clicked
 */

function fetchAllPages() {

    //fetch all page titles using fetch api
    let url = baseURL + "/rest/api/content?type=page&start=0&limit=99999";
    fetch(url)
    .then(response => response.json())
    .then(json => {
        pageTitleJson = json.results;
    })
}

/**
 * fetchAllPagesTitlesOnClick - display all page titles in options on button click
 */

function fetchAllPagesTitlesOnClick(){
    let selOption = document.getElementById("pageTitleSel");

    //ensure that each page title is only shown once when button is clicked multiple times
    if(selOption.length > 0){
        selOption.innerHTML = "";   //remove all exisiting options first
    }

    //create and append options
    pageTitleJson.forEach(array => {
        let newOp = document.createElement("OPTION");
        newOp.textContent = array.title;
        selOption.appendChild(newOp);
    })
}

/**
 * fetchVersionsOfPage - based on page title selected, fetch all previous versions, on option change
 */

function fetchVersionsOfPage(){
    let selectedOptions = document.getElementById("pageTitleSel");

    let selectedPage = selectedOptions.options[selectedOptions.selectedIndex].text; //get the current selected value for page title

    for(let i=0; i<pageTitleJson.length; i++){
        if(pageTitleJson[i].title == selectedPage){
            let url = baseURL + "/rest/experimental/content/" + pageTitleJson[i].id + "/version"
            
            fetch(url)  //fetch all versions using fetch api
            .then(response => response.json())
            .then(json => {
                pageVerJson = json.results;
            });
        }
    }

    for(let i=0; i<pageTitleJson.length; i++){
        if(pageTitleJson[i].title == selectedPage){
            selectedPID = pageTitleJson[i].id;  //get page id of selected page
        }
    }
}

/**
 * fetchPageVersionsOnClick - display all page versions on button click
 */

function fetchPageVersionsOnClick(){
    let pageVer1Sel = document.getElementById("pageVersionSel1");
    let pageVer2Sel = document.getElementById("pageVersionSel2");

    //ensure that each page version is only shown once when button is clicked multiple times
    if(pageVer1Sel.length > 0 || pageVer2Sel.length > 0){
        pageVer1Sel.innerHTML = ""; //remove all exisiting options first
        pageVer2Sel.innerHTML = "";
    }

    //create and append options
    pageVerJson.forEach(array => {
        let newOp1 = document.createElement("option");
        let newOp2 = document.createElement("option");

        newOp1.textContent = array.number;
        newOp2.textContent = array.number;

        newOp1.setAttribute("id", "1." + array.number);
        newOp2.setAttribute("id", "2." + array.number);

        pageVer1Sel.appendChild(newOp1);
        pageVer2Sel.appendChild(newOp2);
    })    
}


/**
 * fetchPageVersionContent - fetch the content of each version and display in template
 */

function fetchPageVersionContent(num){
    let selectedOptions = document.getElementById("pageVersionSel" + num);
    let selectedPageVer = selectedOptions.options[selectedOptions.selectedIndex].text; //get the current selected value for page title
    
    
    let contentURL = "";

    let fetchURL = baseURL + "/rest/experimental/content/" + selectedPID + "/version/" + selectedPageVer;   
    fetch(fetchURL)// fetch page version content
    .then(response => response.json())
    .then(json => {
        console.log(json);
        contentURL = baseURL+json.content._links.webui;
        console.log(contentURL);
        
        $.ajax({
            url : contentURL,
            success : function(response){
                let contentTitle = "<h3>Version " + selectedPageVer + "</h3>";
                let content = $(response).find("#main-content").html();
                
                content = contentTitle + content;

                let pageVerSel = document.getElementById(num + "." + selectedPageVer);
                pageVerSel.setAttribute("value", content);  //set the content as the value of the option
                alert("Success");
            }
        })
    });
    
}



