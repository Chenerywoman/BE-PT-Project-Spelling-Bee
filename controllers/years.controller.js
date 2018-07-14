const {findAllYears} = require('./queries/years.queries');

exports.getYears = (req, res, next) => {
    return findAllYears()
        .then(years => res.status(200).send({ years }))
        .catch(() => next({ status: 500, controller: 'years' }));
};

