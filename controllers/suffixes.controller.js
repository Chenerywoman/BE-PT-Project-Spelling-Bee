const { findCategory } = require('../queries/categories.queries');
const { findSuffixes } = require('../queries/suffixes.queries');
const { findPartialsByCategory } = require('../queries/partials.queries');

exports.getSuffixes = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        return findCategory('suffixes')
            .then(suffixes => {
                const suffixesId = suffixes[0]._id;
                return findPartialsByCategory(suffixesId);
            })
            .then(suffixes => res.status(200).send({ suffixes }))
            .catch(() => next({ status: 500, controller: 'suffixes' }));
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
                else return next({ status: 500, controller: 'suffixes' });
            });
    }
};
