process.env.NODE_ENV = 'test';
const server = require('../server');
const mongoose = require('mongoose');
const supertest = require('supertest')(server);
const expect = require('chai').expect;
const { seed } = require('../seed/seed');
const { testYears, testCategories, testPrefixes, testSuffixes, testMedials, testWords } = require('../seed/data/testData');

describe('API Spelling Bee', () => {
    let yearDocs, categoriesDocs, prefixesDocs, suffixesDocs, medialsDocs, wordsDocs;
    beforeEach(() => {
        return seed(testYears, testCategories, testPrefixes, testSuffixes, testMedials, testWords)
            .then(data => {
                [yearDocs, categoriesDocs, prefixesDocs, suffixesDocs, medialsDocs, wordsDocs] = data;
            });
    });
    after(() => {
        mongoose.disconnect();
    });

    describe('API requests to /api', () => {
        it('GETs an html page with a list of routes from /api', () => {
            return supertest
                .get('/api')
                .expect(200);
        });
        it('returns a 404 message if /api is not requested at the root', () => {
            return supertest
                .get('/banana')
                .expect(404)
                .then(res => {
                    expect(res.body.message).to.equal('404 not found');
                });
        });
        it('returns a 404 message if /api is not requested at the correct position in the path', () => {
            return supertest
                .get('/banana/words')
                .expect(404)
                .then(res => {
                    expect(res.body.message).to.equal('404 not found');
                });
        });
    });

    describe('API requests to /api/years', () => {
        it('GETs all years from /api/years', () => {
            return supertest
                .get('/api/years')
                .expect(200)
                .then(res => {
                    const { years } = res.body;
                    expect(years.length).to.equal(6);
                    expect(years[2].year).to.equal(yearDocs[2].year);
                    expect(years[2]).to.have.keys('_id', 'year');
                    expect(years[2]._id).to.equal(`${yearDocs[2]._id}`);
                });
        });
        it('GETs a year from /api/years/:year', () => {
            return supertest
                .get('/api/years/3')
                .expect(200)
                .then(res => {
                    const { year } = res.body;
                    expect(year.length).to.equal(1);
                    expect(year[0].year).to.equal(yearDocs[2].year);
                    expect(year[0].year).to.equal(3);
                    expect(year[0]).to.have.keys('_id', 'year');
                    expect(year[0]._id).to.equal(`${yearDocs[2]._id}`);
                });
        });
    });

    describe('API requests to /api/categories', () => {
        it('GETs all categories from /api/categories', () => {
            return supertest
                .get('/api/categories')
                .expect(200)
                .then(res => {
                    const { categories } = res.body;
                    expect(categories.length).to.equal(6);
                    expect(categories[2].description).to.equal(categoriesDocs[2].description);
                    expect(categories[2]).to.have.keys('_id', 'years', 'description', 'name');
                    expect(categories[2]._id).to.equal(`${categoriesDocs[2]._id}`);
                });
        });
        it('GETs all the categories for a year from /api/categories?year={year}', () => {
            return supertest
                .get('/api/categories')
                .query({year: 3})
                .expect(200)
                .then(res => {
                    const { categories } = res.body;
                    expect(categories.length).to.equal(6);
                    expect(categories[0].name).to.equal(categoriesDocs[0].name);
                    expect(categories[0].description).to.equal(categoriesDocs[0].description);
                    expect(categories[0]).to.have.keys('_id', 'years', 'name', 'description');
                    expect(categories[0]._id).to.equal(`${categoriesDocs[0]._id}`);
                    // expect(categories[0].years[0]._id).to.equal(`${categoriesDocs[0].years[0]}`);
                    expect(categories[0].years[0].year).to.equal(3);
                });
            });
        it('returns an appropriate error if an non-existent year is requested at /api/categories?year={year}', () => {
            return supertest
                .get('/api/categories')
                .query({year: 21})
                .expect(404)
                .then(res => {
                    expect(res.body.error).to.equal('year 21 not found');
                });
        });
        it('GETs a category from /api/categories/:categories', () => {
            return supertest
                .get('/api/categories/suffixes')
                .expect(200)
                .then(res => {
                    const { category } = res.body;
                    expect(category.length).to.equal(1);
                    expect(category[0].name).to.equal(categoriesDocs[1].name);
                    expect(category[0].description).to.equal(categoriesDocs[1].description);
                    expect(category[0]).to.have.keys('_id', 'years', 'name', 'description');
                    expect(category[0]._id).to.equal(`${categoriesDocs[1]._id}`);
                });
        });
    });

    describe('API requests to /api/words', () => {
        it('GETs all words from /api/words', () => {
            return supertest
                .get('/api/words')
                .expect(200)
                .then(res => {
                    const { words } = res.body;
                    expect(words.length).to.equal(54);
                    expect(words[10].word).to.equal(wordsDocs[10].word);
                    expect(words[10]._id).to.equal(`${wordsDocs[10]._id}`);
                    expect(words[10]).to.have.keys('_id', 'word', 'partials', 'years');
                    expect(words[10].partials[0]).to.have.keys('_id', 'letters', 'categories');
                    expect(words[10].partials[0].letters).to.equal('ea');
                    expect(words[10].partials[0].categories[0].name).to.equal('medials');
                    expect(words[10].years[0].year).to.equal(3);
                });
        });
        it('returns a 404 message if /words is not requested at /api', () => {
            return supertest
                .get('/api/banana')
                .expect(404)
                .then(res => {
                    expect(res.body.message).to.equal('404 not found');
                });
        });
        it('returns a 404 message if one of prefixes/suffixes/medials/homophones/freestyle is not requested at /api/words', () => {
            return supertest
                .get('/api/words/banana')
                .expect(404)
                .then(res => {
                    expect(res.body.message).to.equal('404 not found');
                });
        });
        it('POSTS a new word to /api/words - empty partials array', () => {
            const newWord = { word: 'banana', partials: [], years: [3, 4] };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(201)
                .then(res => {
                    const { new_word } = res.body;
                    expect(new_word.word).to.equal('banana');
                    expect(new_word).to.have.keys('word', 'partials', 'years', '_id', '__v');
                })
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(55);
                        expect(words[54].word).to.equal('banana');
                    }));
        });
        it('POSTS a new word to /api/words - partial in partials array', () => {
            const newWord = { word: 'antiauthoritarian', partials: ['anti'], years: [3, 4] };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(201)
                .then(res => {
                    const { new_word } = res.body;
                    expect(new_word.word).to.equal('antiauthoritarian');
                    expect(new_word).to.have.keys('word', 'partials', 'years', '_id', '__v');
                })
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(55);
                        expect(words[54].word).to.equal('antiauthoritarian');
                    }));
        });
        it('returns an appropriate error to a post request to /api/words - if the requested partial does not exist in the partials collection', () => {
            const newWord = { word: 'antiauthoritarian', partials: ['jemima'], years: [3, 4] };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(201)
                .then(res => {
                    const { new_word } = res.body;
                    expect(new_word.word).to.equal('antiauthoritarian');
                    expect(new_word).to.have.keys('word', 'partials', 'years', '_id', '__v');
                })
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(55);
                        expect(words[54].word).to.equal('antiauthoritarian');
                    }));
        });
        it('returns an appropriate error if an string is passed to partials instead of an array', () => {
            const newWord = { word: 'antidiluvial', partials: 'anti', years: [3, 4] };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(400)
                .then(res => expect(res.body.error).to.equal('please ensure partials & years are contained in an array'))
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(54);
                    }));
        });
        it('returns with a 400 error message if an invalid key is passed in the body of the post request', () => {
            const newWord = { word: 'banana', pineapple: [], years: [3, 4] };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(400)
                .then(res => expect(res.body.error).to.equal('pineapple is an invalid key'));
        });
        it('returns with a 400 error message if a duplicate word is passed in the body of a post request', () => {
            const newAppleWord = { word: 'apple', partials: [], years: [3, 4] };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newAppleWord)
                .expect(400)
                .then(res => expect(res.body.error).to.equal('apple already exists in the database'))
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(54);
                    }));
        });
        it('DELETEs a word & returns a copy of the deleted word when requested at /api/words', () => {
            const wordToDelete = { word: 'apple' };
            return supertest
                .delete('/api/words')
                .set('Accept', 'application/json')
                .send(wordToDelete)
                .expect(200)
                .then(res => {
                    expect(res.body).to.eql({ delete_message: 'apple successfully deleted' });
                })
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(53);
                    }));
        });
        it('returns an appropriate error message to a DELETE request for a word that doesn\'t exist in the database', () => {
            const wordToDelete = { word: 'banana' };
            return supertest
                .delete('/api/words')
                .set('Accept', 'application/json')
                .send(wordToDelete)
                .expect(404)
                .then(res => expect(res.body.error).to.equal('banana does not exist in the database'));
        });
        it('returns an appropriate error message to an incorrect DELETE request', () => {
            const wordToDelete = { giraffe: 'apple' };
            return supertest
                .delete('/api/words')
                .set('Accept', 'application/json')
                .send(wordToDelete)
                .expect(400)
                .then(res => expect(res.body.error).to.equal('invalid delete request.'));
        });
    });

    describe('API requests to /api/prefixes', () => {
        it('GETs the list of prefixes from /api/prefixes', () => {
            return supertest
                .get('/api/prefixes')
                .expect(200)
                .then(res => {
                    const { prefixes, partials } = res.body;
                    expect(prefixes.name).to.equal('prefixes');
                    expect(prefixes.years.length).to.equal(2);
                    expect(partials[0].letters).to.equal('im');
                    expect(partials[0]).to.have.keys('_id', 'letters', 'categories', 'description', 'years');
                });
        });
        it('GETs all words from /api/prefixes which match a query string', () => {
            return supertest
                .get('/api/prefixes')
                .query({ prefix: 'pos' })
                .expect(200)
                .then(res => {
                    const { words } = res.body;
                    expect(words.length).to.equal(4);
                    expect(words[0].word).to.equal('position');
                    expect(words[0]).to.have.keys('_id', 'word', 'partials', 'years');
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "prefix"', () => {
            return supertest
                .get('/api/prefixes')
                .query({ banana: 'anti' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?prefix=anti"'));
        });
        it('returns a 404 message when the user inputs a prefix not contained in the database', () => {
            return supertest
                .get('/api/prefixes')
                .query({ prefix: 'banana' })
                .expect(404)
                .then(res => expect(res.body.error).to.equal('prefix banana not found'));
        });
    });

    describe('API requests to /api/suffixes', () => {
        it('GETs the list of suffixes from api/suffixes', () => {
            return supertest
                .get('/api/suffixes')
                .expect(200)
                .then(res => {
                    const { suffixes } = res.body;
                    expect(suffixes.length).to.equal(5);
                    expect(suffixes[0].letters).to.equal('ure');
                    expect(suffixes[0]).to.have.keys('_id', 'letters', 'categories', 'description', 'years');
                });
        });
        it('GETs all words from /api/suffixes which match the query string', () => {
            return supertest
                .get('/api/suffixes')
                .query({ suffix: 'ly' })
                .expect(200)
                .then(res => {
                    const { words } = res.body;
                    expect(words.length).to.equal(4);
                    expect(words[0].word).to.equal('comically');
                    expect(words[0]).to.have.keys('_id', 'word', 'partials', 'years');
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "suffix"', () => {
            return supertest
                .get('/api/suffixes')
                .query({ banana: 'ing' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?suffix=ing"'));
        });
        it('returns a 404 message when the user inputs a suffix not contained in the database', () => {
            return supertest
                .get('/api/suffixes')
                .query({ suffix: 'banana' })
                .expect(404)
                .then(res => {
                    expect(res.body.error).to.equal('suffix banana not found');
                });
        });
    });

    describe('API requests to api/medials', () => {
        it('GETs the list of medials from api/medials', () => {
            return supertest
                .get('/api/medials')
                .expect(200)
                .then(res => {
                    const { medials } = res.body;
                    expect(medials.length).to.equal(3);
                    expect(medials[0].letters).to.equal('sc');
                    expect(medials[0]).to.have.keys('_id', 'letters', 'categories', 'description', 'years');

                });
        });
        it('GETs all words from /api/medials which match the query string', () => {
            return supertest
                .get('/api/medials')
                .query({ medial: 'sc' })
                .expect(200)
                .then(res => {
                    const { words } = res.body;
                    expect(words.length).to.equal(4);
                    expect(words[0].word).to.equal('crescent');
                    expect(words[0]).to.have.keys('_id', 'word', 'partials', 'years');
                    expect(words[0].partials[0].letters).to.equal('sc');
                    expect(words[0].years[0].year).to.equal(3);
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "medial"', () => {
            return supertest
                .get('/api/medials')
                .query({ banana: 'sc' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?medial=sc"'));
        });
        it('returns a 404 message when the user inputs a medial not contained in the database', () => {
            return supertest
                .get('/api/medials')
                .query({ medial: 'banana' })
                .expect(404)
                .then(res => expect(res.body.error).to.equal('medial banana not found'));
        });
    });

    describe('API requests to api/freestyle', () => {
        it('GETs all words which have empty arrays for prefixes, suffixes, medials & homophones from api/words/freestyle', () => {
            return supertest
                .get('/api/freestyle')
                .expect(200)
                .then(res => {
                    const { freestyle } = res.body;
                    expect(freestyle.length).to.equal(12);
                    expect(freestyle[0].word).to.equal('accept');
                    expect(freestyle[0]).to.have.keys('_id', 'word', 'partials', 'years');
                });
        });
    });

});
