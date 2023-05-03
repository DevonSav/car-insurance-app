const expect = require('chai').expect;
const request = require('supertest');	// Used for testing posting data

const APP = 'http://localhost:3000';

// Declare some example data for testing
const EXAMPLE_DISTANCE_ARRAY = [
    {"distance": 14},
    {"distance": 38},
    {"distance": 72},
    {"distance": 100},
    {"distance": 139}
];

/*
Kilometers driven	Insurance cost
0-20				R200
21-50				R200 + R1/km above 20km
51-100				R220 + R0.80/km above 50km
101+				R260 + R0.50/km above 100km
------------------------------------------------
Working:
14km	= R200				= R200
38km	= R200 + 18			= R218
72km	= R220 + 22*0.8		= R237.6
100km	= R220 + 50*0.8		= R260
139km	= R260 + 39*0.5		= R279.5
------------------------------------------------
Total						= R1195.1
*/
const EXPECTED_TOTAL_COST = 1195.1;

describe(`Insurance calculator page POST requests`, ()=>{
    it('should respond with a total cost', function(done) {
        request(APP)
            .post('/insurance')
            .send(EXAMPLE_DISTANCE_ARRAY)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                if (error) return done(error);	// rethrow to fail the test case
                expect(response.body).to.have.property('totalCost');
                return done();
            });
    });
    it(`total cost should be equal to '${EXPECTED_TOTAL_COST}'`, function(done) {
        request(APP)
            .post('/insurance')
            .send(EXAMPLE_DISTANCE_ARRAY)
            .end(function(error, response) {
                if (error) return done(error);
                expect(response.body.totalCost).to.equal(EXPECTED_TOTAL_COST);
                return done();
            });
    });
});

/** REFERENCES
 * Comment by javierfdezg / Gopesh: https://stackoverflow.com/questions/31176526/how-to-write-a-post-request-test-in-mocha-with-data-to-test-if-response-matches
 * How to fail the test case: https://github.com/ladjs/supertest
 */
