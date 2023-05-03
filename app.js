const express = require('express');
const helmet = require("helmet");
const insuranceCalculator = require('./insurance_calc');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());

/**
 * Returns the total insurance cost from an array of distances in the posted json data (in the request body).
 */
app.post('/insurance', (request, response) => {
    const postedJson = request.body;

    if (postedJson === undefined || postedJson.length <= 0) {
        // Data is invalid, return early
        let errorMessage = `Error! Missing data.`;
        response.send({errMsg: errorMessage});
        return;
    }

    let carDistanceArray = [];
    postedJson.forEach(car => {
        // Read all the data and convert it to a simple number array
        carDistanceArray.push(car.distance);
    });

    let finalInsuranceCost = insuranceCalculator.calculateInsurance(carDistanceArray);
    // Return calculated insurance
    response.send({totalCost: finalInsuranceCost});
});

app.listen(PORT, ()=>console.log(`Insurance app listening on port ${PORT}!`));

/** REFERENCES
 *
 */
