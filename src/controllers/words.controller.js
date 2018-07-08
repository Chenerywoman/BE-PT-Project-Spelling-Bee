// getMedials, getHomophones, getFree, getMixed

const { findAllWords, findPrefixes, findSuffixes, findMedials, findHomophones, findFree, findMixed } = require('../queries/words.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
        .then(words => res.status(200).send({ words }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.getPrefixes = (req, res, next) => {
    const { prefix } = req.query;
    return findPrefixes(prefix)
        .then(words => {
            res.status(200).send({ words });
        })
        .catch(err => {
            if (err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

exports.getSuffixes = (req, res, next) => {
    const { suffix } = req.query;
    return findSuffixes(suffix)
        .then(words => {
            res.status(200).send({ words });
        })
        .catch(err => {
            if (err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

exports.getMedials = (req, res, next) => {
    const { medial } = req.query;
    console.log('medial', req.query)
    return findMedials(medial)
        .then(words => {
            console.log('res in getMedials', res)
            res.status(200).send({ words });
        })
        .catch(err => {
            console.log('err in getMedials', err)
            if (err.status === 404) return next(err);
            return next({ status: 500, controller: 'words' });
        });
};

