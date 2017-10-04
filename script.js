//Github Keys
const clientID = 'f670b87406e5de31bf43'
const secretKey = '36f96a2ae199dd383554e9cdd4c1bbc226a6ecc0'
//const tempsha = '88b518b4a51e3b886f154c2c9e807a524307c9d3'

//User and Repo
let gituser = 'bcsjk11'
let gitrepo = 'MySQLi-Demo-With-Login'

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

let GetCommitsFromSha = (user, repo, sha, path) => {


    let apiurl = `https://api.github.com/repos/${user}/${repo}/git/trees/`

    if ((path == '' || path == null) && (sha == '' || sha == null)) {
        apiurl += `?client_id=${clientID}&client_secret=${secretKey}`
    } else if (sha == '' || sha == null) {
        apiurl += `?path=${path}&client_id=${clientID}&client_secret=${secretKey}`
    } else if (path == '' || path == null) {
        apiurl += `${sha}?client_id=${clientID}&client_secret=${secretKey}`
    } else {
        apiurl += `${sha}?path=${path}&client_id=${clientID}&client_secret=${secretKey}`
    }

    //console.log(apiurl)

    return apiurl
}

let GetCommitTree = (user, repo, sha) => {

    //GET /repos/:owner/:repo/git/commits/:sha
    let apiurl = `https://api.github.com/repos/${user}/${repo}/git/commits/`

    if (sha == '' || sha == null) {
        apiurl += `?client_id=${clientID}&client_secret=${secretKey}`
    } else {
        apiurl += `${sha}?client_id=${clientID}&client_secret=${secretKey}`
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


//READING DATA
let readData = (readGitRepoData) => {

    let result = JSON.parse(readGitRepoData)
    console.log(result)

    for (let x of result.sort((a, b) => a.type[0]+a.name > b.type[0]+b.name )) {
        //Create TableRow and TableData Objects
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')

        //COL 1: => Set file or folder icon in table
        if (x.type == "file") {
            td1.innerHTML = "<i class='fa fa-file'></i>"
        } else {
            td1.innerHTML = "<i class='fa fa-folder-open'></i>"
        }

        //COL 2: => Display file/folder name and link to the next request.
        let td2 = document.createElement('td')
        let content2 = document.createTextNode(x.name)

        if(x.name == ".DS_Store") {
            td2.innerHTML = x.name
        } else {
            if(x.type == "dir") {
                let anchor = document.createElement('a')
                anchor.href = `index.html?param=${x.path}`
                anchor.appendChild(content2)
                td2.appendChild(anchor)
            } else {
                td2.innerHTML = `<a href="${x.html_url}" target="_blank">${x.name}</a>`
            }
        }
 
        //COL 3: => Get Last commit message

        let rawurl = `https://raw.githubusercontent.com/${gituser}/${gitrepo}/master/${x.path}`

        let td3 = document.createElement('td')

        if(x.name == ".DS_Store") {
            td3.innerHTML = "DO NOT DOWNLOAD THIS FILE"
        } else {
            if(x.type == "dir") {
                td3.innerHTML = `<a href="${x.html_url}" target="_blank">Open on Github</a>`
            }else {
                td3.innerHTML = `<a href="${rawurl}" target="_blank">Display Raw Code</a>`
            }
        }

        //COL 4: => Get Last commit date
        let td4 = document.createElement('td')
        td4.innerHTML = `Maybe awhile ago :-)`


        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        table.appendChild(tr)
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