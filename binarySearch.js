// const binSearch = (array, target) => {
//     let start = 0;
//     let end = (array.length) - 1
//     while (start <= end){
//         let mid = Math.round(start + (end - start) / 2)

//         if(array[mid] === target){
//             console.log(mid)
//             return mid
//         }else if(array[mid] > target){
//             end = mid - 1
//         }else{
//             start = start + 1
//         }
//     }
//     return -1
// }

// console.log(binSearch([1,2,3,4,5,6], 5))
// let signId = "345678923ijy76"

// let array = ['345678923ij', '345678923ijy76', '87y5654rfsgd43vg']
// let target = array.indexOf(signId)

// if(target === -1){
//     array.push(signId)
// }else if(target > -1){
//     array.splice(target, 1)
// }
// console.log(array)
// for(let i = 0; i <= array.length; i++){
//     if(array[i] === target){
//         array.pop[i]
//         console.log(array)
//     }else{
//         console.log("No")
//     }
// }

// const fs = require('fs');
// fs.readFile('foo.js', {encoding:'utf8'}, (err, fileContents) => {
// console.log('Then the contents are available', fileContents);
// });
// console.log('This happens first');

