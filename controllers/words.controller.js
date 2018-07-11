const { findAllWords, findFree, createWord, checkforWord, deleteWord } = require('../queries/words.queries');

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
    const objectKeys = ['word', 'categories'];
    const body = Object.keys(req.body);
    objectKeys.forEach((elem, ind) => { if (body[ind] !== elem) throw { status: 400, message: `${body[ind]} is an invalid key` }; });
    const categoryKeys = ['prefixes', 'suffixes', 'medials', 'homophones'];
    const categories = Object.keys(req.body.categories);
    categoryKeys.forEach((elem, ind) => { if (categories[ind] !== elem) throw { status: 400, message: `${categories[ind]} is an invalid key` }; });

    return checkforWord(req.body.word)
        .then(word => {
            if (word.length) { throw { status: 400, message: `${word[0].word} already exists in the database` }; }
            else { return createWord(req.body.word, req.body.categories.prefixes, req.body.categories.suffixes, req.body.categories.medials, req.body.categories.homophones); }
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
        else { throw { status: 404, message: `${word} does not exist in the database`}; }
    })
    .then(deleteResponse => {
        if (deleteResponse.n === 1 && deleteResponse.ok === 1) return res.status(200).send({delete_message:`${word} successfully deleted`});
    })
    .catch(err => {
        if (err.status === 400) return next(err);
        else if (err.status === 404) return next(err);
        else return next ({status: 500, controller: 'words'});
    });
};

