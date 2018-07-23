const { findAllCategories, findCategoriesByYear, findCategory } = require('../queries/categories.queries');
const { findYear } = require('../queries/years.queries');

exports.getCategories = (req, res, next) => {
    if (req.query.year) {
        const yearRequested = req.query.year;
        return findYear(yearRequested)
            .then(([year]) => {
                if (!year) throw { status: 404, message: `year ${yearRequested} not found` };
                else {
                    const yearId = year._id;
                    return findCategoriesByYear(yearId);
                }
            })
            .then(categories => {
                res.status(200).send({ categories });
            })
            .catch(err => {
                if (err.status === 400 || err.status === 404) return next(err);
                else return next({ status: 500, controller: 'categories' });
            });
    } else {
        return findAllCategories()
            .then(categories => res.status(200).send({ categories }))
            .catch(() => next({ status: 500, controller: 'categories' }));
    }
};

exports.getCategory = (req, res, next) => {
    return findCategory(req.params.category)
        .then(category => res.status(200).send({ category }))
        .catch(() => next({ status: 500, controller: 'category' }));
};
