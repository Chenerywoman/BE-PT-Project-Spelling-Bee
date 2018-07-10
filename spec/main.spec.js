process.env.NODE_ENV = 'test';
const server = require('../server');
const mongoose = require('mongoose');
const supertest = require('supertest')(server);
const expect = require('chai').expect;
const { seed } = require('../seed/seed');
const { testWords, testPrefixes, testSuffixes, testMedials, testHomophones } = require('../seed/data/testData');
const { wordsMaker, categoriesMaker } = require('../seed/dataMakers');
const wordsToSeed = wordsMaker(testWords, testPrefixes, testSuffixes, testMedials);
const categoriesToSeed = categoriesMaker(testPrefixes, testSuffixes, testMedials, testHomophones);

describe('API Spelling Bee', () => {
    let wordDocs, categoriesDocs;
    beforeEach(() => {
        return seed(wordsToSeed, categoriesToSeed)
            .then(data => {
                [wordDocs, categoriesDocs] = data;
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

    describe('API requests to /api/words', () => {
        it('GETs all words from /api/words', () => {
            return supertest
                .get('/api/words')
                .expect(200)
                .then(res => {
                    const { words } = res.body;
                    expect(words.length).to.equal(54);
                    expect(words[0].word).to.equal(wordDocs[0].word);
                    expect(words[0]).to.have.keys('_id', 'word', 'categories');
                    expect(words[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
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
        it('POSTS a new word to /api/words', () => {
            const newWord = { word: 'banana', categories: { prefixes: ['ban'], suffixes: ['ana'], medials: [], homophones: [] } };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(201)
                .then(res => {
                    const { new_word } = res.body;
                    expect(new_word.word).to.equal('banana');
                    expect(Object.keys(new_word.categories).length).to.equal(4);
                    expect(new_word.categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                })
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(55);
                        expect(words[54].word).to.equal('banana');
                    }));
        });
        it('casts a single string in the the categories object into an array containing the string', () => {
            const newWord = { word: 'banana', categories: { prefixes: 'ban', suffixes: ['ana'], medials: [], homophones: [] } };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(201)
                .then(res => {
                    const { new_word } = res.body;
                    expect(new_word.word).to.equal('banana');
                    expect(Object.keys(new_word.categories).length).to.equal(4);
                    expect(new_word.categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                })
                .then(() => supertest
                    .get('/api/words')
                    .then(res => {
                        const { words } = res.body;
                        expect(words.length).to.equal(55);
                        expect(words[54].word).to.equal('banana');
                    }));
        });
        it('returns with a 400 error message if an invalid key is passed in the body of the post request', () => {
            const newWord = { word: 'banana', pineapple: { prefixes: ['ban'], suffixes: ['ana'], medials: [], homophones: [] } };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(400)
                .then(res => expect(res.body.error).to.equal('pineapple is an invalid key'));
        });
        it('returns with a 400 error message if an invalid key is passed as a category in the body of the post request', () => {
            const newWord = { word: 'banana', categories: { pineapple: ['ban'], suffixes: ['ana'], medials: [], homophones: [] } };
            return supertest
                .post('/api/words')
                .set('Accept', 'application/json')
                .send(newWord)
                .expect(400)
                .then(res => expect(res.body.error).to.equal('pineapple is an invalid key'));
        });      
    //     it('returns with a 400 error message if a duplicate word is passed in the body of a post request', () => {
    //         const newAppleWord = { word: 'apple', categories: { prefixes: [], suffixes: [], medials: [], homophones: [] } };
    //         return supertest
    //             .post('/api/words')
    //             .set('Accept', 'application/json')
    //             .send(newAppleWord)
    //             .expect(400)
    //             .then(res => expect(res.body.error).to.equal('apple already exists in the database'))
    //             .then(() => supertest
    //             .get('/api/words')
    //             .then(res => {
    //                 const { words } = res.body;
    //                 expect(words.length).to.equal(54);
    //             }));     
    // });
});

    describe('API requests to /api/prefixes', () => {
        it('GETs the list of prefixes from /api/prefixes', () => {
            return supertest
                .get('/api/prefixes')
                .expect(200)
                .then(res => {
                    const { prefixes } = res.body;
                    expect(prefixes[0].words.length).to.equal(5);
                    expect(prefixes[0].words[0]).to.equal('im');
                    expect(prefixes[0]).to.have.keys('_id', 'words', 'category');
                });
        });
        it('GETs all words from /api/prefixes which match a query string', () => {
            return supertest
                .get('/api/prefixes')
                .query({ prefix: 'pos' })
                .expect(200)
                .then(res => {
                    const { prefixes } = res.body;
                    expect(prefixes.length).to.equal(4);
                    expect(prefixes[0].word).to.equal('position');
                    expect(prefixes[0]).to.have.keys('_id', 'word', 'categories');
                    expect(prefixes[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
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
                    expect(suffixes[0].words.length).to.equal(5);
                    expect(suffixes[0].words[0]).to.equal('ure');
                    expect(suffixes[0]).to.have.keys('_id', 'words', 'category');
                });
        });
        it('GETs all words from /api/suffixes which match the query string', () => {
            return supertest
                .get('/api/suffixes')
                .query({ suffix: 'ly' })
                .expect(200)
                .then(res => {
                    const { suffixes } = res.body;
                    expect(suffixes.length).to.equal(4);
                    expect(suffixes[0].word).to.equal('comically');
                    expect(suffixes[0]).to.have.keys('_id', 'word', 'categories');
                    expect(suffixes[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
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
                .then(res => expect(res.body.error).to.equal('suffix banana not found'));
        });
    });

    describe('API requests to api/words/medials', () => {
        it('GETs the list of medials from api/words/medials', () => {
            return supertest
                .get('/api/words/medials')
                .expect(200)
                .then(res => {
                    const { medials } = res.body;
                    expect(medials[0].words.length).to.equal(3);
                    expect(medials[0].words[0]).to.equal('sc');
                    expect(medials[0]).to.have.keys('_id', 'words', 'category');
                });
        });
        it('GETs all words from api/words/medials which match the query string', () => {
            return supertest
                .get('/api/words/medials')
                .query({ medial: 'sc' })
                .expect(200)
                .then(res => {
                    const { medials } = res.body;
                    expect(medials.length).to.equal(4);
                    expect(medials[0].word).to.equal('crescent');
                    expect(medials[0]).to.have.keys('_id', 'word', 'categories');
                    expect(medials[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "medial"', () => {
            return supertest
                .get('/api/words/medials')
                .query({ banana: 'sc' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?medial=sc"'));
        });
        it('returns a 404 message when the user inputs a medial not contained in the database', () => {
            return supertest
                .get('/api/words/medials')
                .query({ medial: 'banana' })
                .expect(404)
                .then(res => expect(res.body.error).to.equal('medial banana not found'));
        });
    });

    describe('API requests to api/words/homophones', () => {
        it('GETs the list of homophones from /api/words/homophones', () => {
            return supertest
                .get('/api/words/homophones')
                .expect(200)
                .then(res => {
                    const { homophones } = res.body;
                    expect(homophones[0].words.length).to.equal(14);
                    expect(homophones[0].words[0]).to.equal('accept');
                    expect(homophones[0]).to.have.keys('_id', 'words', 'category');
                });
        });
        it('GETs all words from api/words/homophones which match query string', () => {
            return supertest
                .get('/api/words/homophones')
                .query({ homophone: 'brake' })
                .expect(200)
                .then(res => {
                    const { homophones } = res.body;
                    expect(homophones.length).to.equal(1);
                    expect(homophones[0].word).to.equal('break');
                    expect(homophones[0]).to.have.keys('_id', 'word', 'categories');
                    expect(homophones[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "homophone"', () => {
            return supertest
                .get('/api/words/homophones')
                .query({ banana: 'brake' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?homophone=brake"'));
        });
        it('returns a 404 message when the user inputs a homophone not contained in the database', () => {
            return supertest
                .get('/api/words/homophones')
                .query({ homophone: 'banana' })
                .expect(404)
                .then(res => expect(res.body.error).to.equal('homophone banana not found'));
        });
    });

    describe('API requests to api/words/freestyle', () => {
        it('GETs all words which have empty arrays for prefixes, suffixes, medials & homophones from api/words/freestyle', () => {
            return supertest
                .get('/api/words/freestyle')
                .expect(200)
                .then(res => {
                    const { freestyle } = res.body;
                    expect(freestyle.length).to.equal(1);
                    expect(freestyle[0].word).to.equal('apple');
                    expect(freestyle[0]).to.have.keys('_id', 'word', 'categories');
                    expect(freestyle[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
    });
});
