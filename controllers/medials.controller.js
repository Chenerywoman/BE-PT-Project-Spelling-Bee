const { findCategory} = require('../queries/categories.queries');
const { findMedials } = require('../queries/medials.queries');
const {findPartialsByCategory, findPartial} = require('../queries/partials.queries');

exports.getMedials = (req, res, next) => {
    if (!Object.keys(req.query).length) {
        return findCategory('medials')
            .then(medials => {
                const medialsId = medials[0]._id;
                return findPartialsByCategory(medialsId);
            })
            .then(medials => res.status(200).send({ medials }))
            .catch(() => next({ status: 500, controller: 'medials' }));
    } else {
        const key = Object.keys(req.query)[0];
        const { medial } = req.query;
        if (key !== 'medial') throw { status: 400, message: `${key} is an invalid query string key - valid format is "?medial=sc"` };
        else return findPartial(medial)
        .then(medial => {
            const medialId = medial[0]._id;
            return findMedials(medialId);
        })
            .then(words => {
                if (!words.length) throw { status: 404, message: `no words containing the medial ${medial} found` };
                else return res.status(200).send({ words });
            })
            .catch(err => {
                console.log('err in controller', err)
                if (err.status === 404) return next(err);
                return next({ status: 500, controller: 'medials' });
            });
    }
};
