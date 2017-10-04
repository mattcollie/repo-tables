let mydata = (getdataWithCallback(commitShaURL, (resp) => {
    
                //GetCommitsFromSha
    
                let data = JSON.parse(resp)
                let messagesURL = data.object.sha
                console.log(x.path)
    
                let mydata = (getdataWithCallback(GetCommitDetails(gituser, gitrepo, data.object.sha), (respw) => {
                    let dataw = JSON.parse(respw)
    
                    console.log(dataw.tree[0].path)
    
                    for (let z of dataw.tree) {
                        if (x.type == "file") {
    
                            //console.log(z.path)
                            let data1 = (getdataWithCallback(GetCommitsFromSha(gituser, gitrepo, data.object.sha, z.path), (respw) => {
                            let data1w = JSON.parse(data1)
    
                            console.log(data1w)
    
                            if (x.type == "file") {
    
                                let td3 = document.createElement('td')
                                let content3 = document.createTextNode(dataw.message)
                                td3.appendChild(content3)
                                tr.appendChild(td3)
    
                                let td4 = document.createElement('td')
                                let content4 = document.createTextNode(dataw.committer.date)
                                td4.appendChild(content4)
                                tr.appendChild(td4)
    
                                let td5 = document.createElement('td')
                                let content5 = document.createTextNode(dataw.sha.substring(0, 6))
                                td5.appendChild(content5)
                                tr.appendChild(td5)
    
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
    
                                        let td5 = document.createElement('td')
                                        let content5 = document.createTextNode(dataw.sha.substring(0, 6))
                                        td5.appendChild(content5)
                                        tr.appendChild(td5)
                                    }));
    
                                }));
                            }
    
                            let td3 = document.createElement('td')
                            let content3 = document.createTextNode(z.path)
                            td3.appendChild(content3)
                            tr.appendChild(td3)
    
                            let td4 = document.createElement('td')
                            let content4 = document.createTextNode(dataw.committer.date)
                            td4.appendChild(content4)
                            tr.appendChild(td4)
    
                            let td5 = document.createElement('td')
                            let content5 = document.createTextNode(dataw.sha.substring(0, 6))
                            td5.appendChild(content5)
                            tr.appendChild(td5)
                        }));
    
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
    
                                    let td5 = document.createElement('td')
                                    let content5 = document.createTextNode(dataw.sha.substring(0, 6))
                                    td5.appendChild(content5)
                                    tr.appendChild(td5)
                                }));
    
                            }));
                        }
                    }
    
    
    
                }));
            }));



                    // subdir = x.path
        // let newURL = dynamicURL(subdir)

        // console.log(subdir)
        // console.log(newURL)

        // link.href = `index.html?param=${subdir}`
        // link.appendChild(content)

        // li.appendChild(link)
        // ul.appendChild(li)

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
            
            
                for (let i = 0; i < rows.length; i++) {
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

///////////////



    
    let seeFolderContentsDECODED = JSON.parse(seeFolderContentsJSON);
    //console.log(seeFolderContentsDECODED.tree[0].path)

    for (let t of seeFolderContentsDECODED.tree) {
        let filenames = `${result[i].name}/${t.path}`
        console.log(filenames)
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i].type == "dir") {

            let FolderContentsURL = GetCommitsFromSha(gituser, gitrepo, result[i].sha)
            let seeFolderContents = (getdataWithCallback(FolderContentsURL, (seeFolderContentsJSON) => {
                console.log(FolderContentsURL)
            }));

            //console.log(`I am dir ${result[i].name}`)
            //console.log(`I am in a subfolder ${result[i].path}/${result[i].name}`)

            //let CommitDetails = GetCommitDetails(gituser, gitrepo, x.sha)
            //let ShowFolderDetails = (getdataWithCallback(CommitDetails, (ShowFolderDetailsJSON) => {

            //let ShowFolderDetailsDecoded = JSON.parse(ShowFolderDetailsJSON)
            //console.log(ShowCommitDetailsJSON)

            //let getPathToFolder = ShowFolderDetailsDecoded.tree
            //console.log(getPathToFolder)

            //}));

        } else {

            //console.log(`I am file ${result[i].name}`)
            //console.log(x.path)
        }
    }

/////////

let commitShaURL = GetCommitSha(gituser, gitrepo, "master")
//console.log(commitShaURL)

let DataPerLine = (getdataWithCallback(commitShaURL, (DataPerLineJSON) => {
    
            let DataPerLineDECODED = JSON.parse(DataPerLineJSON)
            //console.log(DataPerLineDECODED)
    
            let objectURL = DataPerLineDECODED.object.url
            //console.log(objectURL)
    
            let DetailsForLastCommit = (getdataWithCallback(objectURL, (DetailsForLastCommitJSON) => {
    
                let DetailsForLastCommitDECODED = JSON.parse(DetailsForLastCommitJSON)
                //console.log(DetailsForLastCommitDECODED)
    
                let treeObject = DetailsForLastCommitDECODED.tree.url
                //console.log(objectURL)
    
                let DetailsForLastTreeObject = (getdataWithCallback(treeObject, (DetailsForLastTreeObjectJSON) => {
    
                    let DetailsForLastTreeObjectDECODED = JSON.parse(DetailsForLastTreeObjectJSON)
                    //console.log(DetailsForLastTreeObjectDECODED)
    
                    let treeObjectParts = DetailsForLastTreeObjectDECODED
                    //console.log(treeObjectParts.tree)
    
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].type == "dir") {
    
                            let FolderContentsURL = GetCommitsFromSha(gituser, gitrepo, result[i].sha)
                            let seeFolderContents = (getdataWithCallback(FolderContentsURL, (seeFolderContentsJSON) => {
                                
                                let seeFolderContentsDECODE = JSON.parse(seeFolderContentsJSON)
                                console.log(seeFolderContentsDECODE)
    
                                
    
                                let FolderDetailUrl = GetCommitTree(gituser, gitrepo, seeFolderContentsDECODE.sha)
                                let seeFolderDetailContents = (getdataWithCallback(FolderDetailUrl, (seeFolderDetailContentsJSON) => {
    
                                    let NextStep001 = JSON.parse(seeFolderDetailContentsJSON)
                                    console.log(NextStep001)
                                }));
                            }));
    
                            //console.log(`I am dir ${result[i].name}`)
                            //console.log(`I am in a subfolder ${result[i].path}/${result[i].name}`)
    
                            //let CommitDetails = GetCommitDetails(gituser, gitrepo, x.sha)
                            //let ShowFolderDetails = (getdataWithCallback(CommitDetails, (ShowFolderDetailsJSON) => {
    
                            //let ShowFolderDetailsDecoded = JSON.parse(ShowFolderDetailsJSON)
                            //console.log(ShowCommitDetailsJSON)
    
                            //let getPathToFolder = ShowFolderDetailsDecoded.tree
                            //console.log(getPathToFolder)
    
                            //}));
    
                        } else {
    
                            //console.log(`I am file ${result[i].name}`)
                            //console.log(x.path)
                        }
                    }
    
                }));
    
            }));
    
        }));