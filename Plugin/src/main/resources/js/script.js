let baseURL = document.getElementById('confluence-base-url').content;
let selectedPID = AJS.params.pageId;
let pageVerJson = "";

AJS.toInit(function(){
 fetchPageVersions();
})

async function getJSON(){
  let url = baseURL + "/rest/experimental/content/" + selectedPID + "/version"
            
  return fetch(url)  //fetch all versions using fetch api
  .then(response => response.json())
  .then(json => {
    console.log(json.results);
    return json.results;
  }).catch(err =>{
    console.log(err);
  });
}

/**
 * fetchPageVersions - display all page versions on button click
 */

 async function fetchPageVersions(){
  alert("Fetching page versions, please wait")

  pageVerJson = await getJSON();

  let pageVer1Sel = document.getElementById("pageVersionSel1");
  let pageVer2Sel = document.getElementById("pageVersionSel2");
  
  let table = document.getElementById("table");
  table.style.visibility = "visible";
  table.style.borderCollapse = "collapse";

  //ensure that each page version is only shown once when button is clicked multiple times
  if(pageVer1Sel.length > 0 || pageVer2Sel.length > 0){
    pageVer1Sel.innerHTML = ""; //remove all exisiting options first
    pageVer2Sel.innerHTML = "";
  }

  for(var key in pageVerJson){
    let num = pageVerJson[key].number;
    let when = pageVerJson[key].when;
    let by = pageVerJson[key].by.username;

    //fill table
    let tableRow = document.createElement("tr");
    let numTableData = document.createElement("td");
    numTableData.innerHTML = num;
    let whenTableData = document.createElement("td");
    whenTableData.innerHTML = when;
    let byTableData = document.createElement("td");
    byTableData.innerHTML = by;
    tableRow.appendChild(numTableData);
    tableRow.appendChild(whenTableData);
    tableRow.appendChild(byTableData);
    table.appendChild(tableRow);

    //fill option value
    let newOp1 = document.createElement("option");
    let newOp2 = document.createElement("option");

    newOp1.textContent = num;
    newOp2.textContent = num;

    newOp1.setAttribute("id", "1." + num.toString());
    newOp2.setAttribute("id", "2." + num.toString());

    pageVer1Sel.appendChild(newOp1);
    pageVer2Sel.appendChild(newOp2);

    let contentURL = "";
    let fetchURL = baseURL + "/rest/experimental/content/" + selectedPID + "/version/" + num;


    fetch(fetchURL)// fetch page version content
    .then(response => response.json())
    .then(json => {
        contentURL = baseURL+json.content._links.webui;
        
        $.ajax({
            url : contentURL,
            success : function(response){
                let contentTitle = "<h3>Version " + num + "</h3>";
                let content = $(response).find("#main-content").html();
                
                content = contentTitle + content;

                newOp1.setAttribute("value", content);  //set the content as the value of the option
                newOp2.setAttribute("value", content);
            }
        })
    });
  }
  alert("Fetching completed");
}