const mongoose = require('mongoose');
const {Year, Category, Partial, Word} = require('../models');
const {partialsMaker, wordsMaker} = require('./dataMaker');

exports.seed = (yearsData, categoriesData, prefixesData, suffixesData, medialsData, wordsData) => {
return mongoose.connection.dropDatabase()
.then(() => Year.insertMany(yearsData))
.then(yearsDocs => { const categoriesDocs = categoriesData.map(category => {
        category.years.push(yearsDocs[2]._id, yearsDocs[3]._id);
       return category;
   });
return Promise.all([yearsDocs, Category.insertMany(categoriesDocs)]);
})
.then(([yearDocs, categoryDocs]) => {
const prefixes = partialsMaker(prefixesData, 'prefixes');
const suffixes = partialsMaker(suffixesData, 'suffixes');

const duplicateMedials = medialsData.reduce((acc, medial) => {
    prefixesData.forEach(prefix => prefix === medial ? acc.push(medial) : acc);
    return acc;
}, []);

prefixes.map(prefix => {
        yearDocs.forEach(year => prefix.years.push(year.id));
        duplicateMedials.forEach(duplicate => {
             if (prefix.letters === duplicate) prefix.categories.push('medials');
         });
        categoryDocs.forEach(category => {
            prefix.categories.map((prefixCat, ind) => {
                if (category.name === prefixCat) prefix.categories.splice(ind, 1, category._id);
            });    
        });
    });

suffixes.map(suffix => {
    yearDocs.forEach(year => suffix.years.push(year.id));
    categoryDocs.forEach(category => {
        if (category.name === suffix.categories[0]) suffix.categories.splice(0, 1, category._id);
    });
});

const filteredMedials = [...medialsData];
duplicateMedials.forEach(duplicate => {
   filteredMedials.splice(filteredMedials.indexOf(duplicate), 1);
});

const medials = partialsMaker(filteredMedials, 'medials');

medials.map(medial => {
    yearDocs.forEach(year => medial.years.push(year.id));
    categoryDocs.forEach(category => {
        if (category.name === medial.categories[0]) medial.categories.splice(0, 1, category._id);
    });
});
  return Promise.all([yearDocs, categoryDocs, Partial.insertMany(prefixes), Partial.insertMany(suffixes), Partial.insertMany(medials)]);
})
.then(([yearDocs, categoryDocs, prefixesDocs, suffixesDocs, medialsDocs]) =>  {
    const words = wordsMaker(wordsData, prefixesData, suffixesData, medialsData);

    words.map(wordObj => {
        wordObj.years.push(yearDocs[2]._id, yearDocs[3]._id);
        prefixesDocs.forEach(prefix => {
            wordObj.partials.map((partial, ind) => {
                if (prefix.letters === partial) wordObj.partials.splice(ind, 1, prefix._id);
            });    
        });
        suffixesDocs.forEach(suffix => {
            wordObj.partials.map((partial, ind) => {
                if (suffix.letters === partial) wordObj.partials.splice(ind, 1, suffix._id);
            });    
        });
        medialsDocs.forEach(medial => {
            wordObj.partials.map((partial, ind) => {
                if (medial.letters === partial) wordObj.partials.splice(ind, 1, medial._id);
            });    
        });
    });

    return Promise.all([yearDocs, categoryDocs, prefixesDocs, suffixesDocs, medialsDocs, Word.insertMany(words)]);
});
};
 
