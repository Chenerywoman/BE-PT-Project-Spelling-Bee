process.env.NODE_ENV = 'test';
const server = require('../server');
const mongoose = require('mongoose');
const supertest = require('supertest')(server);
const expect = require('chai').expect;
const { seed } = require('../seed/seed');
const { testWords, testPrefixes, testSuffixes, testMedials } = require('../seed/data/testData');
const dataMaker = require('../seed/dataMaker');
const wordsToSeed = dataMaker(testWords, testPrefixes, testSuffixes, testMedials)

describe('API Spelling Bee', () => {
    let wordDocs;
    beforeEach(() => {
        return seed(wordsToSeed)
            .then(words => wordDocs = words);
    });
    after(() => {
        mongoose.disconnect();
    });

    describe('API requests to api/words', () => {
        it('GETs all words from api/words', () => {
            return supertest
                .get('/api/words')
                .expect(200)
                .then(res => {
                    const { words } = res.body;
                    expect(words.length).to.equal(54);
                    expect(words[0].word).to.equal(wordDocs[0].word);
                    expect(words[0]).to.have.keys('_id', '__v', 'word', 'categories');
                    expect(words[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
    });

    describe('API requests to api/words/prefixes', () => {
        it('GETs all words from api/words/prefixes which match the query string', () => {
            return supertest
                .get('/api/words/prefixes')
                .query({ prefix: 'pos' })
                .expect(200)
                .then(res => {
                    const { prefixes } = res.body;
                    expect(prefixes.length).to.equal(4);
                    expect(prefixes[0].word).to.equal('position');
                    expect(prefixes[0]).to.have.keys('_id', '__v', 'word', 'categories');
                    expect(prefixes[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "prefix"', () => {
            return supertest
                .get('/api/words/prefixes')
                .query({ banana: 'anti' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?prefix=anti"'));
        });
        it('returns a 404 message when the user inputs a prefix not contained in the database', () => {
            return supertest
                .get('/api/words/prefixes')
                .query({ prefix: 'banana' })
                .expect(404)
                .then(res => expect(res.body.error).to.equal('prefix banana not found'));
        });
    });

    describe('API requests to api/words/suffixes', () => {
        it('GETs all words from api/words/suffixes which match the query string', () => {
            return supertest
                .get('/api/words/suffixes')
                .query({ suffix: 'ly' })
                .expect(200)
                .then(res => {
                    const { suffixes } = res.body;
                    expect(suffixes.length).to.equal(4);
                    expect(suffixes[0].word).to.equal('comically');
                    expect(suffixes[0]).to.have.keys('_id', '__v', 'word', 'categories');
                    expect(suffixes[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
        it('returns a 400 message when the user inputs a query string where the key is not "suffix"', () => {
            return supertest
                .get('/api/words/suffixes')
                .query({ banana: 'ing' })
                .expect(400)
                .then(res => expect(res.body.error).to.equal('banana is an invalid query string key - valid format is "?suffix=ing"'));
        });
        it('returns a 404 message when the user inputs a suffix not contained in the database', () => {
            return supertest
                .get('/api/words/suffixes')
                .query({ suffix: 'banana' })
                .expect(404)
                .then(res => expect(res.body.error).to.equal('suffix banana not found'));
        });
    });

    describe('API requests to api/words/medials', () => {
        it('GETs all words from api/words/medials which match the query string', () => {
            return supertest
                .get('/api/words/medials')
                .query({ medial: 'sc' })
                .expect(200)
                .then(res => {
                    const { medials } = res.body;
                    expect(medials.length).to.equal(4);
                    expect(medials[0].word).to.equal('crescent');
                    expect(medials[0]).to.have.keys('_id', '__v', 'word', 'categories');
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
        it('GETs all words from api/words/homophones which match query string', () => {
            return supertest
                .get('/api/words/homophones')
                .query({ homophone: 'brake' })
                .expect(200)
                .then(res => {
                    const { homophones } = res.body;
                    expect(homophones.length).to.equal(1);
                    expect(homophones[0].word).to.equal('break');
                    expect(homophones[0]).to.have.keys('_id', '__v', 'word', 'categories');
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

    describe ('API requests to api/words/freestyle', () => {
        it('GETs all words which have empty arrays for prefixes, suffixes, medials & homophones from api/words/freestyle', () => {
            return supertest
            .get('/api/words/freestyle')
            .expect(200)
            .then(res => {
                const {freestyle} = res.body;
                expect (freestyle.length).to.equal(1);
                expect(freestyle[0].word).to.equal('banana');
                expect(freestyle[0]).to.have.keys('_id', '__v', 'word', 'categories');
                expect(freestyle[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
            });
        });
    });





});
