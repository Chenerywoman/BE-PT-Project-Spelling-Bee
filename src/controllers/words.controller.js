//  getMixed

const {findCategory} = require('../queries/categories.queries');
const { findAllWords, findPrefixes, findSuffixes, findMedials, findHomophones, findFree, findMixed } = require('../queries/words.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
        .then(words => res.status(200).send({ words }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.getPrefixes = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        const category = req.path.slice(1);
        return findCategory(category)
        .then(prefixes => res.status(200).send({prefixes}))
        .catch(() => next({status:500, controller: 'words'}));

    } else { 
    const key = Object.keys(req.query)[0];
    const { prefix } = req.query;
    if (key !== 'prefix') throw { status: 400, message: `${key} is an invalid query string key - valid format is "?prefix=anti"` };
    return findPrefixes(prefix)
        .then(prefixes => {
            if (!prefixes.length) throw { status: 404, message: `prefix ${prefix} not found` };
            else return res.status(200).send({ prefixes });
        })
        .catch(err => {
            if (err.status === 400 || err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
    }
};

exports.getSuffixes = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { suffix } = req.query;
    if (key !== 'suffix') throw { status: 400, message: `${key} is an invalid query string key - valid format is "?suffix=ing"` };
    return findSuffixes(suffix)
        .then(suffixes => {
            if (!suffixes.length) throw { status: 404, message: `suffix ${suffix} not found` };
            else return res.status(200).send({ suffixes });
        })
        .catch(err => {
            if (err.status === 400 || err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

exports.getMedials = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { medial } = req.query;
    if (key !== 'medial') throw { status: 400, message: `${key} is an invalid query string key - valid format is "?medial=sc"` };
    return findMedials(medial)
        .then(medials => {
            if (!medials.length) throw { status: 404, message: `medial ${medial} not found` };
            else return res.status(200).send({ medials });
        })
        .catch(err => {
            if (err.status === 404) return next(err);
            return next({ status: 500, controller: 'words' });
        });
};

exports.getHomophones = (req, res, next) => {
    const key = Object.keys(req.query)[0];
    const { homophone } = req.query;
    if (key !== 'homophone') throw { status: 400, message: `${key} is an invalid query string key - valid format is "?homophone=brake"` };
    return findHomophones(homophone)
        .then(homophones => {
            if (!homophones.length) throw { status: 404, message: `homophone ${homophone} not found` };
            else return res.status(200).send({ homophones });
        })
        .catch(err => {
            if (err.status === 404) return next(err);
            return next({ status: 500, controller: 'words' });
        });
};

exports.getFree = (req, res, next) => {
    return findFree()
        .then(freestyle => res.status(200).send({ freestyle }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

// exports.getMixed = (req, res, next) => {
// return findMixed()
// const keys = Object.keys(req.query);
// console.log('keys', keys)
// if (!keys   )
// .then(mixed => {

//     return res.status(200).send({mixed})
// });
// .catch(() => next({status: 500, controller: 'words'}));
// };

