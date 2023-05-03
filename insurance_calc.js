/*
Calculates the insurance cost on a fleet of vehicles insured with pay-as-you-drive insurance.
Takes as input the kilometers driven for each vehicle.
For each item, calculates the insurance cost based on the kilometers driven,
before finally summing all the values and returning it as the result

Kilometers driven		Insurance cost
0-20					R200
21-50					R200 + R1/km above 20km
51-100					R220 + R0.80/km above 50km
101+					R260 + R0.50/km above 100km
*/

/**
 * Returns 'true' if the input value is within the two provided limits, else returns 'false'.
 * @param {int} num The integer value to check.
 * @param {int} lower The lower limit, inclusive.
 * @param {int} upper The upper limit, inclusive.
 */
function inRange(num, lower, upper)
{
    return lower <= num && num <= upper;
}

/**
 * Calculates insurance cost based on the provided distance driven.
 * @param {Number} kilometersDriven The kilometers driven of the vehicle
 * @returns The vehicle insurance cost, or -1 if an error occurs.
 */
function distanceToCost (kilometersDriven) {
    const kmDistance = parseFloat(kilometersDriven);

    if (inRange(kmDistance, 0, 20)) {
        return 200;
    }
    else if (inRange(kmDistance, 21, 50)) {
        let total = 200 + ((kmDistance - 20) * 1);
        return total;
    }
    else if (inRange(kmDistance, 51, 100)) {
        let total = 220 + ((kmDistance - 50) * 0.80);
        return total;
    }
    else if (kmDistance >= 101) {
        let total = 260 + ((kmDistance - 100) * 0.50);
        return total;
    }
    else {
        // Error occured
        return -1;
    }
}

/**
 * Calculates the total insurance cost for an array of vehicle distances.
 * @param {Number[]} vehicleDistanceArray An array of vehicle distances (kilometers driven).
 * @returns Total insurance cost for all vehicles.
 */
exports.calculateInsurance = function (vehicleDistanceArray) {
    let costTotal = 0;
    for (let i = 0; i < vehicleDistanceArray.length; i++) {
        // Calculate and add the cost for each provided distance
        costTotal += distanceToCost(vehicleDistanceArray[i]);
    }

    return costTotal;
}