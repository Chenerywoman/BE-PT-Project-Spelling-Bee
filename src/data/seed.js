const mongoose = require('mongoose');
const {words, prefixes, suffixes, medial} = require('./devData');
const {reverseObject} = require('./helpers')

const seed = (wordList, prefixesList, suffixesList, medialList) => {

const homophones = {
accept: 'except', affect: 'effect', ball: 'bawl', berry: 'bury', brake: 'break', fair: 'fare', grate: 'great',
grown: 'groan', here: 'hear', heel: 'heal', heal: 'he\'ll', 'he\'ll': 'heel', knot: 'not', mail: 'male', main: 'mane',
meat: 'meet', medal: 'meddle', missed: 'mist', peace: 'piece', plain: 'plane', rain: 'rein', rein: 'reign', reign: 'rain',
scene: 'seen', weather: 'whether', whose: 'who\'s'
}

const reversedHomophones = reverseObject(homophones)

    const sortedWords  = wordList.sort();
    const filteredWords = sortedWords.filter((item, pos, arr) => arr.indexOf(item) == pos)

   return filteredWords.reduce((acc, word, index, arr) => {
    
   acc.push({word: word, suffixes: [], prefixes: [], medial: [], homophones:[]})
    
    prefixesList.map((prefix, ind) => {
        if (word.startsWith(prefix)){
            acc[index].prefixes.push(prefix)
        }
    })
    
    suffixesList.map((suffix, ind) => {
        if (word.endsWith(suffix)){
            acc[index].suffixes.push(suffix)
        }
    })
    
    medialList.map((medial, ind) => {
      const num =  word.search(medial)
        if (num > 0 && num < word.length-1){
           acc[index].medial.push(medial)
        }
    })

    for (let key in homophones) {
        if (key === word) acc[index].homophones.push(homophones[key])
    }

    for(let key in reversedHomophones) {
        if (key === word) acc[index].homophones.push(reversedHomophones[key])
    }


    return acc
}, [])
 }

 const seededData = seed(words, prefixes, suffixes, medial )

module.exports = seed;
