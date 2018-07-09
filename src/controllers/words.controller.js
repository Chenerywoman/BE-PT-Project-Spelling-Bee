//  getFree, getMixed

const { findAllWords, findPrefixes, findSuffixes, findMedials, findHomophones, findFree, findMixed } = require('../queries/words.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
        .then(words => res.status(200).send({ words }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.getPrefixes = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { prefix } = req.query;
    if (key !== 'prefix') throw {status: 400, message:`${key} is an invalid query string key - valid format is "?prefix=anti"`};
    return findPrefixes(prefix)
        .then(words => {
            if (!words.length) throw {status: 404, message: `prefix ${prefix} not found`};
            else return res.status(200).send({ words });
        })
        .catch(err => {
            if (err.status === 400 || err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

exports.getSuffixes = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { suffix } = req.query;
    if (key !== 'suffix') throw {status: 400, message:`${key} is an invalid query string key - valid format is "?suffix=ing"`};
    return findSuffixes(suffix)
        .then(words => {
            if (!words.length) throw {status: 404, message: `suffix ${suffix} not found`};
            else return res.status(200).send({ words });
        })
        .catch(err => {
            if (err.status === 400 || err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

exports.getMedials = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { medial } = req.query;
    if (key !== 'medial') throw {status: 400, message:`${key} is an invalid query string key - valid format is "?medial=sc"`};
    return findMedials(medial)
        .then(words => {
            if (!words.length) throw {status: 404, message: `medial ${medial} not found`};
            else return res.status(200).send({ words });
        })
        .catch(err => {
            if (err.status === 404) return next(err);
            return next({ status: 500, controller: 'words' });
        });
};

exports.getHomophones = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { homophone } = req.query;
    if (key !== 'homophone') throw {status: 400, message:`${key} is an invalid query string key - valid format is "?homophone=brake"`};
    return findHomophones(homophone)
        .then(words => {
            if (!words.length) throw {status: 404, message: `homophone ${homophone} not found`};
            else return res.status(200).send({ words });
        })
        .catch(err => {
            if (err.status === 404) return next(err);
            return next({ status: 500, controller: 'words' });
        });
};

