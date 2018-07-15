const { findAllWords, findFree, createWord, checkforWord, deleteWord } = require('../queries/words.queries');
const { findYears } = require('../queries/years.queries');
const { findPostedPartials } = require('../queries/partials.queries');

exports.getWords = (req, res, next) => {
    return findAllWords()
        .then(words => res.status(200).send({ words }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.getFree = (req, res, next) => {
    return findFree()
        .then(freestyle => res.status(200).send({ freestyle }))
        .catch(() => next({ status: 500, controller: 'words' }));
};

exports.postNewWord = (req, res, next) => {
    const requiredKeys = ['word', 'partials', 'years'];
    const bodyKeys = Object.keys(req.body);
    requiredKeys.forEach((elem, ind) => { if (bodyKeys[ind] !== elem) throw { status: 400, message: `${bodyKeys[ind]} is an invalid key` }; });
    const requestedYears = req.body.years;
    const requestedPartials = req.body.partials;
    if (!Array.isArray(requestedYears) || !Array.isArray(requestedPartials)) throw { status: 400, message: 'please ensure partials & years are contained in an array'};

    return findYears(requestedYears)
        .then((years) => {
            if (!years) throw { status: 404, message: 'year(s) not found' };
            else if (requestedPartials.length) return Promise.all([years, findPostedPartials(requestedPartials)]);
            else return [years, requestedPartials];
        })
        .then(([years, partials]) => {
            if (!partials.length && requestedPartials.length) throw { status: 404, message: 'requested partials not found in the database' };
            else if (partials.length && requestedPartials.length) {
            const yearsIds = years.map(year => year[0]._id);
            const partialsIds = partials[0].map(partial => partial._id);
            return Promise.all([yearsIds, partialsIds, checkforWord(req.body.word)]);
            }
            else {
            const yearsIds = years.map(year => year[0]._id);
            const partialsIds = [];
            return Promise.all([yearsIds, partialsIds, checkforWord(req.body.word)]);
            }
        })
        .then(([yearsIds, partialsIds, word]) => {
            if (word.length) { throw { status: 400, message: `${req.body.word} already exists in the database`}; }
            else { return createWord(req.body.word, partialsIds, yearsIds); }
        })
        .then(word => res.status(201).send({ new_word: word }))
        .catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000) { return next({ status: 400, message: `${req.body.word} already exists in the database` }) }
            else if (err.status === 400) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

exports.removeWord = (req, res, next) => {
    const word = req.body.word;
    if (!word) throw { status: 400, message: 'invalid delete request.' };
    return checkforWord(word)
        .then(checkedWord => {
            if (checkedWord.length && checkedWord[0].word === word) return deleteWord(word);
            else { throw { status: 404, message: `${word} does not exist in the database` }; }
        })
        .then(deleteResponse => {
            if (deleteResponse.n === 1 && deleteResponse.ok === 1) return res.status(200).send({ delete_message: `${word} successfully deleted` });
        })
        .catch(err => {
            if (err.status === 400) return next(err);
            else if (err.status === 404) return next(err);
            else return next({ status: 500, controller: 'words' });
        });
};

