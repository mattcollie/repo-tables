let goBack = () => {
    window.history.go(-1); return false;
}

let showBack = () => {
    let ul = document.createElement('ul')
    let backli = document.createElement('li')
    backli.addEventListener('click', () => {goBack()})
    backli.style.cursor = 'pointer'
    backli.style.color = '#09c'
    let backtext = document.createTextNode("Go Back")
    backli.appendChild(backtext)
    ul.appendChild(backli)
    mainDiv.appendChild(ul)
}