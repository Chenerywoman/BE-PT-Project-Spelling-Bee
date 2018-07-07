const {reverseObject} = require('./helpers');

const dataMaker = (wordList, prefixesList, suffixesList, medialList) => {

    const homophones = {
        accept: 'except', affect: 'effect', ball: 'bawl', berry: 'bury', brake: 'break', fair: 'fare', grate: 'great',
        grown: 'groan', here: 'hear', heel: 'heal', heal: 'he\'ll', 'he\'ll': 'heel', knot: 'not', mail: 'male', main: 'mane',
        meat: 'meet', medal: 'meddle', missed: 'mist', peace: 'piece', plain: 'plane', rain: 'rein', rein: 'reign', reign: 'rain',
        scene: 'seen', weather: 'whether', whose: 'who\'s'
    };

    const reversedHomophones = reverseObject(homophones);

    const sortedWords = wordList.sort();
    const filteredWords = sortedWords.filter((item, pos, arr) => arr.indexOf(item) == pos);

    return filteredWords.reduce((acc, word, index) => {

        acc.push({ word: word, rules: {suffixes: [], prefixes: [], medial: [], homophones: [] }});

        prefixesList.map((prefix) => {
            if (word.startsWith(prefix)) {
                acc[index].rules.prefixes.push(prefix);
            }
        });

        suffixesList.map((suffix) => {
            if (word.endsWith(suffix)) {
                acc[index].rules.suffixes.push(suffix);
            }
        });

        medialList.map((medial) => {
            const num = word.search(medial);
            if (num > 0 && num < word.length - 1) {
                acc[index].rules.medial.push(medial);
            }
        });

        for (let key in homophones) {
            if (key === word) acc[index].rules.homophones.push(homophones[key]);
        }

        for (let key in reversedHomophones) {
            if (key === word) acc[index].rules.homophones.push(reversedHomophones[key]);
        }

        return acc;
    }, []);
};

module.exports = dataMaker;
