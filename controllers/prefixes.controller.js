const { findCategory } = require('../queries/categories.queries');
const { findPrefixes } = require('../queries/prefixes.queries');
const { findPartialsByCategory, findPartial } = require('../queries/partials.queries')

exports.getPrefixes = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        return findCategory('prefixes')
            .then(prefixes => {
                const prefixesId = prefixes[0]._id;
                return Promise.all([prefixes, findPartialsByCategory(prefixesId)]);
            })
            .then(([prefixes, partials]) => {
            return res.status(200).send({ prefixes, partials });
    })
            .catch(() => next({ status: 500, controller: 'prefixes' }));

    } else {
        const key = Object.keys(req.query)[0];
        const { prefix } = req.query;
        if (key !== 'prefix') throw { status: 400, message: `${key} is an invalid query string key - valid format is "?prefix=anti"` };
        else return findPartial(prefix)
            .then(returnedPrefix => {
                if (!returnedPrefix.length) throw { status: 404, message: `prefix ${prefix} not found` };
                else {const prefixId = returnedPrefix[0]._id;
                return findPrefixes(prefixId);}
            })
        .then(words => {
                if (!words.length) throw { status: 404, message: `no words with prefix ${prefix}` };
                else return res.status(200).send({ words });
            })
            .catch(err => {
                if (err.status === 400 || err.status === 404) return next(err);
                else return next({ status: 500, controller: 'prefixes' });
            });
    }
};
