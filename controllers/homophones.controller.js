const { findCategory} = require('../queries/categories.queries');
const { findHomophones} = require('../queries/homophones.queries');

exports.getHomophones = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        return findCategory('homophones')
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
