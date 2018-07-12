const { reverseObject } = require('./helpers');

const wordsMaker = (wordList, prefixesList, suffixesList, medialsList) => {

    const homophones = {
        accept: 'except', affect: 'effect', ball: 'bawl', berry: 'bury', brake: 'break', fair: 'fare', grate: 'great',
        grown: 'groan', here: 'hear', heel: 'heal', heal: 'he"ll', 'he"ll': 'heel', knot: 'not', mail: 'male', main: 'mane',
        meat: 'meet', medal: 'meddle', missed: 'mist', peace: 'piece', plain: 'plane', rain: 'rein', rein: 'reign', reign: 'rain',
        scene: 'seen', weather: 'whether', whose: 'who"s'
    };

    const reversedHomophones = reverseObject(homophones);

    const sortedWords = wordList.sort();
    const filteredWords = sortedWords.filter((item, pos, arr) => arr.indexOf(item) == pos);

    return filteredWords.reduce((acc, word, index) => {

        acc.push({ word: word, categories: { suffixes: [], prefixes: [], medials: [], homophones: [] } });

        prefixesList.map((prefix) => {
            if (word.startsWith(prefix)) {
                acc[index].categories.prefixes.push(prefix);
            }
        });

        suffixesList.map((suffix) => {
            if (word.endsWith(suffix)) {
                acc[index].categories.suffixes.push(suffix);
            }
        });

        medialsList.map((medial) => {
            const num = word.search(medial);
            if (num > 0 && num < word.length - 1) {
                acc[index].categories.medials.push(medial);
            }
        });

        for (let key in homophones) {
            if (key === word) acc[index].categories.homophones.push(homophones[key]);
        }

        for (let key in reversedHomophones) {
            if (key === word) acc[index].categories.homophones.push(reversedHomophones[key]);
        }
        return acc;
    }, []);
};

const categoriesMaker = (prefixesList, suffixesList, medialsList, homophonesList, prefixesDescription, suffixesDescription, medialsDescription, homophonesDescription) => {
    
    const names = ['prefixes', 'suffixes', 'medials', 'homophones']
    const descriptions = [prefixesDescription, suffixesDescription, medialsDescription, homophonesDescription]
    const categories = [prefixesList, suffixesList, medialsList, homophonesList];

    return categories.reduce((acc, category, ind) => {
        acc.push({ category: names[ind], words: category, description: descriptions[ind].description });
        return acc;
    }, []);
};

module.exports = { wordsMaker, categoriesMaker };
