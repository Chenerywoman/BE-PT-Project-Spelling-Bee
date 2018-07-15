const {findAllYears, findYear} = require('../queries/years.queries');

exports.getYears = (req, res, next) => {
    return findAllYears()
        .then(years => res.status(200).send({ years }))
        .catch(() => next({ status: 500, controller: 'years' }));
};

exports.getYear = (req, res, next) => {
    return findYear(req.params.year)
        .then(year => res.status(200).send({ year }))
        .catch(() => next({ status: 500, controller: 'years' }));
};

