//Github Keys
const clientID = 'f670b87406e5de31bf43'
const secretKey = '36f96a2ae199dd383554e9cdd4c1bbc226a6ecc0'
const tempsha = '88b518b4a51e3b886f154c2c9e807a524307c9d3'

//User and Repo
let gituser = 'bcsjk11'
let gitrepo = 'course-electron'

let testJSON = "No DATA"
let table = document.querySelector('#repo-table')

//Selectors from HTML page
let mainDiv = document.querySelector('#main')

//GIT API CALLS
let ReadGitRepo = (user, repo, subdir) => {

    let apiurl = `https://api.github.com/repos/${user}/${repo}/contents/`

    if (subdir == '' || subdir == null) {
        apiurl += `?client_id=${clientID}&client_secret=${secretKey}`
    } else {
        apiurl += `${subdir}?client_id=${clientID}&client_secret=${secretKey}`
    }

    return apiurl
}

let GetCommitSha = (user, repo, branch) => {

    ////GET https://api.github.com/repos/:owner/:repo/git/refs/heads/:branch
    let apiurl = `https://api.github.com/repos/${user}/${repo}/git/refs/heads/`

    if (branch == '' || branch == null) {
        apiurl += `?client_id=${clientID}&client_secret=${secretKey}`
    } else {
        apiurl += `${branch}?client_id=${clientID}&client_secret=${secretKey}`
    }

    //console.log(apiurl)

    return apiurl
}

let GetCommitTree = (user, repo, tree) => {

    ////GET https://api.github.com/repos/:owner/:repo/git/refs/heads/:branch
    let apiurl = `https://api.github.com/repos/${user}/${repo}/git/refs/heads/`

    if (tree == '' || tree == null) {
        apiurl += `?client_id=${clientID}&client_secret=${secretKey}`
    } else {
        apiurl += `${tree}?client_id=${clientID}&client_secret=${secretKey}`
    }

    return apiurl
}

let GetCommitDetails = (user, repo, sha) => {

    ////GET https://api.github.com/repos/:owner/:repo/git/trees/:branch
    let apiurl = `https://api.github.com/repos/${user}/${repo}/git/trees/`

    if (sha == '' || sha == null) {
        apiurl += `?client_id=${clientID}&client_secret=${secretKey}`
    } else {
        apiurl += `${sha}?client_id=${clientID}&client_secret=${secretKey}`
    }

    return apiurl
}

//AJAX get json string from api
let getdataWithCallback = (url, callback) => {
    let output
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        //console.log(`${this.status} & ${this.readyState}`)

        if (this.readyState == 4 && this.status == 200) {

            callback(this.responseText)
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

let getdataNoCallBack = (url) => {
    let output
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        //console.log(`${this.status} & ${this.readyState}`)
        console.log(url)

        if (this.readyState == 4 && this.status == 200) {

            return this.responseText
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

//CALLBACKS
let mycallback = (data) => {
    readData(data)
}

let GetObjectURL = (data) => {

    let result = JSON.parse(data)
    let url = result.object.url
    //getdataWithCallback(url, CommitDetails)
}


let CommitDetails = (data) => {

    //data to array
    let result = JSON.parse(data);

    //Loop through current rows
    let table = document.querySelector('#repo-table')
    let rows = table.querySelectorAll('tr')
    

    for(let i = 0; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll('td')
        console.log(cells)
    }

    // let td3 = document.createElement('td')
    // let content3 = document.createTextNode(result.message)
    // td3.appendChild(content3)
    // cells[1].appendChild(td3)

    
    // 
    // console.log(result.message);

    // let tr = document.createElement('tr');
    // let td3 = document.createElement('td')
    // let content3 = document.createTextNode(result.message)
    // td3.appendChild(content3)
    // tr.insertBefore(td3)
    // table.appendChild(tr)
}


//console.log(data)
//let result = JSON.parse(data)
//let url = result.tree.url

//console.log(data)

//getdataWithCallback(url, TreeDetails)
//}

let TreeDetails = (data) => {
    //console.log(data)
}

//READING DATA
let readData = (readGitRepoData) => {

    //console.log(readGitRepoData)

    let result = JSON.parse(readGitRepoData)

    for (let x of result) {

        let tr = document.createElement('tr')

        let td1 = document.createElement('td')
        if(x.type == "file") {
            td1.innerHTML = "<i class='fa fa-file'></i>"
        }else {
            td1.innerHTML = "<i class='fa fa-folder-open'></i>"
        }

        let td2 = document.createElement('td')
        let content2 = document.createTextNode(x.name)
        let anchor = document.createElement('a')
        anchor.href = `index.html?param=${x.path}`
        anchor.appendChild(content2)
        td2.appendChild(anchor)

        
        let commitShaURL = GetCommitSha(gituser, gitrepo, "master")
        let mydata = (getdataWithCallback(commitShaURL, (resp) => {
            
            let data = JSON.parse(resp)
            let messagesURL = data.object.url

            console.log(messagesURL)
          
            let mydata = (getdataWithCallback(messagesURL, (respw) => {
                let dataw = JSON.parse(respw)

                console.log(dataw)
                
                if (x.type == "file") {

                    let td3 = document.createElement('td')
                    let content3 = document.createTextNode(dataw.message)
                    td3.appendChild(content3)
                    tr.appendChild(td3)

                    let td4 = document.createElement('td')
                    let content4 = document.createTextNode(dataw.committer.date)
                    td4.appendChild(content4)
                    tr.appendChild(td4)

                } else {

                    let subURL = GetCommitSha(gituser, gitrepo, "master")
                    let subfolders = (getdataWithCallback(subURL, (respw2) => {

                        let dataw2 = JSON.parse(respw2)

                        let subMsgURL = dataw2.object.url
                        let subMsgURLMessage = (getdataWithCallback(subMsgURL, (respw3) => {

                            let dataw3 = JSON.parse(respw3)

                            let td3 = document.createElement('td')
                            let content3 = document.createTextNode(dataw3.message)
                            td3.appendChild(content3)
                            tr.appendChild(td3)

                            let td4 = document.createElement('td')
                            let content4 = document.createTextNode(dataw.committer.date)
                            td4.appendChild(content4)
                            tr.appendChild(td4)
                        })); 

                    }));   
                }

            })); 
        })); 

        tr.appendChild(td1)
        tr.appendChild(td2)
        table.appendChild(tr)






        // subdir = x.path
        // let newURL = dynamicURL(subdir)

        // console.log(subdir)
        // console.log(newURL)

        // link.href = `index.html?param=${subdir}`
        // link.appendChild(content)

        // li.appendChild(link)
        // ul.appendChild(li)
    }
}

let getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.addEventListener('load', () => {
    console.log('Run!')
    getdataWithCallback(ReadGitRepo(gituser, gitrepo, getParameterByName("param")), mycallback)

}, false)
