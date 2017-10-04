let clientID2 = 'f670b87406e5de31bf43'
let secretKey2 = '36f96a2ae199dd383554e9cdd4c1bbc226a6ecc0'
let tempsha = '818dcdc6735314be2d7be084803e3d3e437196c1'


let commitURL = (sha) => {
    
    ///repos/:owner/:repo/git/commits/:sha
    let apiurl = `https://api.github.com/repos/bcsjk11/course-electron/git/commits/`

    if (sha == '' || sha == null) {
        return apiurl+`?client_id=${clientID2}&client_secret=${secretKey2}`
    } else {
        return apiurl+`${sha}?client_id=${clientID2}&client_secret=${secretKey2}`
    }
} 

let getdata2 = (url) => {
    let output
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        
        console.log(`${this.status} & ${this.readyState}`)
        
        if (this.readyState == 4 && this.status == 200) {
            
            let result = JSON.parse(this.responseText)
            
            for(let x of result) {
                console.log(x.committer.date)
                console.log(x.message)
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

window.addEventListener('load',() => {
    console.log('SHA!')
    getdata2(commitURL(tempsha,))
}, false)