const { findCategory} = require('../queries/categories.queries');
const { findPrefixes } = require('../queries/prefixes.queries');

exports.getPrefixes = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        return findCategory('prefixes')
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
