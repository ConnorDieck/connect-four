function isNotEmpty(element, ind, arr){
    return element > 0;
}

const arr = [[1,1,1], [1,1,1]];

const result = arr.every(isNotEmpty);
console.log(result);