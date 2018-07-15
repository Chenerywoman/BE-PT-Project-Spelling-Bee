const {findAllCategories, findCategory} = require('../queries/categories.queries')

exports.getCategories = (req, res, next) => {
    return findAllCategories()
    .then(categories => res.status(200).send({categories}))
    .catch(() => next({status: 500, controller: 'categories'}));
};

exports.getCategory = (req, res, next) => {
    return findCategory(req.params.category)
        .then(category => res.status(200).send({ category }))
        .catch(() => next({ status: 500, controller: 'category' }));
};
