const { findCategory} = require('../queries/categories.queries');
const { findAllWords, findPrefixes, findSuffixes, findMedials, findHomophones, findFree, createWord } = require('../queries/words.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
        .then(words => res.status(200).send({ words }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.getPrefixes = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        const category = req.path.slice(1);
        return findCategory(category)
            .then(prefixes => res.status(200).send({ prefixes }))
            .catch(() => next({ status: 500, controller: 'words' }));

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
    if (!Object.keys(req.query).length) {
        const category = req.path.slice(1);
        return findCategory(category)
            .then(suffixes => res.status(200).send({ suffixes }))
            .catch(() => next({ status: 500, controller: 'words' }));
    } else {
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
    }
};

exports.getMedials = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        const category = req.path.slice(1);
        return findCategory(category)
            .then(medials => res.status(200).send({ medials }))
            .catch(() => next({ status: 500, controller: 'words' }));
    } else {
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
    }
};

exports.getHomophones = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        const category = req.path.slice(1);
        return findCategory(category)
            .then(homophones => res.status(200).send({ homophones }))
            .catch(() => next({ status: 500, controller: 'words' }));
    } else {
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
    }
};

exports.getFree = (req, res, next) => {
    return findFree()
        .then(freestyle => res.status(200).send({ freestyle }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.postNewWord = (req, res, next) => {
    const objectKeys = ['word', 'categories'];
    const body = Object.keys(req.body);
    objectKeys.forEach((elem, ind) => { if (body[ind] !== elem) throw { status: 400, message: `${body[ind]} is an invalid key`}; });
    const categoryKeys = ['prefixes', 'suffixes', 'medials', 'homophones'];
    const categories = Object.keys(req.body.categories);
    categoryKeys.forEach((elem, ind) => { if (categories[ind] !== elem) throw { status: 400, message: `${categories[ind]} is an invalid key` }; })

    return createWord(req.body.word, req.body.categories.prefixes, req.body.categories.suffixes, req.body.categories.medials, req.body.categories.homophones)
        .then(word => {
            return res.status(201).send({ new_word: word })
        })
        .catch((err) => {
            if (err.status === 400) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

