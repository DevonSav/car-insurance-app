const express = require('express');
const insuranceCalculator = require('./insurance_calc');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

/**
 * Returns the total insurance cost from an array of distances in the posted json data (in the request body).
 */
app.post('/insurance', (request, response) => {
	const postedJSON = request.body;

	if (postedJSON === undefined || postedJSON.length <= 0) {
		// Data is invalid, return early
		const errMsg = `Error! Missing data.`;
		response.send({errMsg});
		return;
	}

	let carDistanceArray = [];
	postedJSON.forEach(car => {
		// Read all the data and convert it to a simple number array
		carDistanceArray.push(car.distance);
	});

	let finalInsuranceCost = insuranceCalculator.calculateInsurance(carDistanceArray);
	// Return calculated insurance
	response.send({totalCost: finalInsuranceCost});
});

app.listen(port, ()=>console.log(`Insurance app listening on port ${port}!`));

/** REFERENCES
 *
 */
