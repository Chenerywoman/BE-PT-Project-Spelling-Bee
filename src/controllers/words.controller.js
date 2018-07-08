// getWords, getSuffixes, getPrefixes, getMedials, getHomophones, getFree, getMixed

const {findAllWords, findSuffixes, findPrefixes, findMedials, findHomophones, findFree, findMixed} = require('../queries/words.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
    .then(words => res.status(200).send({words}))
    .catch(() => next({status: 500, controller: 'words'}));
};

