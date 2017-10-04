//Recursive function

let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

let recursiveFunction = (array, sum = 0, index = 0) => {

    return array.length == index ? sum : recursiveFunction(array, sum + array[index], ++index)

}

console.log(recursiveFunction(ar))