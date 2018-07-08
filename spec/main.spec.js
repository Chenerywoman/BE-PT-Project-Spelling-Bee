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
                    expect(words.length).to.equal(53);
                    expect(words[0].word).to.equal(wordDocs[0].word);
                    expect(words[0]).to.have.keys('_id', '__v', 'word', 'categories');
                    expect(words[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
                });
        });
    });

    describe('API requests to api/words/prefixes', () => {
    it('GETs all words from api/words/prefixes which match query string', () => {
        return supertest
            .get('/api/words/prefixes')
            .query({prefix: 'pos'})
            .expect(200)
            .then(res => {
                const { words } = res.body;
                expect(words.length).to.equal(4);
                expect(words[0].word).to.equal('position');
                expect(words[0]).to.have.keys('_id', '__v', 'word', 'categories');
                expect(words[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
            });
    });
});

    describe('API requests to api/words/suffixes', () => {
    it('GETs all words from api/words/suffixes which match query string', () => {
        return supertest
            .get('/api/words/suffixes')
            .query({suffix: 'ly'})
            .expect(200)
            .then(res => {
                const { words } = res.body;
                expect(words.length).to.equal(4);
                expect(words[0].word).to.equal('comically');
                expect(words[0]).to.have.keys('_id', '__v', 'word', 'categories');
                expect(words[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
            });
    });
});

    describe('API requests to api/words/medials', () => {
    it('GETs all words from api/words/medials which match query string', () => {
        return supertest
            .get('/api/words/medials')
            .query({medial: 'sc'})
            .expect(200)
            .then(res => {
                const { words } = res.body;
                expect(words.length).to.equal(4);
                expect(words[0].word).to.equal('cresent');
                expect(words[0]).to.have.keys('_id', '__v', 'word', 'categories');
                expect(words[0].categories).to.have.keys('suffixes', 'prefixes', 'medials', 'homophones');
            });
    });
});









});
