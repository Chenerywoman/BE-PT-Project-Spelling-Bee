// const { reverseObject } = require('./helpers');

const partialsMaker = (partials, category) => {

return partials.reduce((acc, partial) => {
acc.push({letters: partial, categories: [category], description: '', years: [] });
return acc;
}, []);

};

const wordsMaker = (wordList, prefixesList, suffixesList, medialsList) => {
    const sortedWords = wordList.sort();
    const filteredWords = sortedWords.filter((item, pos, arr) => arr.indexOf(item) == pos);

  const wordObjects =  filteredWords.reduce((acc, word, index) => {
        acc.push({ word: word, partials: [], years: []});

        prefixesList.map((prefix) => {
            if (word.startsWith(prefix)) {
                acc[index].partials.push(prefix);
            }
        });
        
        suffixesList.map((suffix) => {
            if (word.endsWith(suffix)) {
                acc[index].partials.push(suffix);
            }
        });
        
        medialsList.map((medial) => {
            const num = word.search(medial);
            if (num > 0 && num < word.length - 1) {
                acc[index].partials.push(medial);
            }
        });

        return acc;
}, []);

wordObjects.forEach(object => {
    object.partials.filter((item, pos, arr) => arr.indexOf(item) == pos);
});
    
return wordObjects;

};

// const homophonesMaker = (homophones) => {
//     const soundSames = {
//                 accept: 'except', affect: 'effect', ball: 'bawl', berry: 'bury', brake: 'break', fair: 'fare', grate: 'great',
//                 grown: 'groan', here: 'hear', heel: 'heal', heal: 'he"ll', 'he"ll': 'heel', knot: 'not', mail: 'male', main: 'mane',
//                 meat: 'meet', medal: 'meddle', missed: 'mist', peace: 'piece', plain: 'plane', rain: 'rein', rein: 'reign', reign: 'rain',
//                 scene: 'seen', weather: 'whether', whose: 'who"s'
//             };

//         const reversedHomophones = reverseObject(soundSames);

//         for (let key in soundSames) {
//             if (key === word) acc[index].categories.homophones.push(homophones[key]);
//         }

//         for (let key in reversedHomophones) {
//             if (key === word) acc[index].categories.homophones.push(reversedHomophones[key]);
//         }
  
// }

module.exports = { partialsMaker, wordsMaker };
