const { findCategory} = require('../queries/categories.queries');
const { findAllWords, findMedials, findHomophones, findFree, createWord } = require('../queries/words.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
        .then(words => res.status(200).send({ words }))
        .catch(() => next({ status: 500, controller: 'words' }));
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
            return res.status(201).send({ new_word: word });
        })
        .catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000) {return next({status: 400, message: `${req.body.word} already exists in the database`})}
            else if (err.status === 400) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

// exports.deleteWord = (req, res, next) => {
//     return 
    

// }

