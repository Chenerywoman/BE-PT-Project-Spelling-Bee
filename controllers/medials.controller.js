const { findCategory} = require('../queries/categories.queries');
const { findMedials } = require('../queries/medials.queries');

exports.getMedials = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        return findCategory('medials')
            .then(medials => res.status(200).send({ medials }))
            .catch(() => next({ status: 500, controller: 'medials' }));
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
                return next({ status: 500, controller: 'medials' });
            });
    }
};