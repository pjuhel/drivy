'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//Exercise 6 : Rental Modification

//----------Function----------

function getRentDuration(date_a, date_b){
  var date1 = new Date(date_a); //We create Date variable for computation
  var date2 = new Date(date_b);
  var time = 1 + (date2 - date1)/86400000; // Computation with date return a result in millisecond, i divide by 86400000 to convert in day time
  return time;
}

function computePrice(rentals){ //Compute all price
  for (var i = 0; i < rentals.length; i++) {
    var time = getRentDuration(rentals[i].pickupDate, rentals[i].returnDate);
    var priceTime = 0;
    var priceDistance = 0;
    var discount = 0;
    if(1<time){ //We set the discount regarding the time the car is rent
      discount = 0.10;
    }
    if(4<time){
      discount = 0.30;
    }
    if(10<time){
      discount = 0.50;
    }

    for (var j = 0; j < cars.length; j++) {
      if(cars[j].id == rentals[i].carId){ //We identify the selected car with its ID, and get the price per day and per km
        priceTime = cars[j].pricePerDay * (1-discount); //We apply the discount here
        priceDistance = cars[j].pricePerKm;
      }
    }

    rentals[i].price = rentals[i].distance*priceDistance + time*priceTime; // Set te price of the rent

    if(rentals[i].options.deductibleReduction == true){
      rentals[i].price = rentals[i].price + 4*time;
    }

    var carCommission = rentals[i].price*0.30; //30% of the price
    rentals[i].commission.insurance = carCommission/2;
    rentals[i].commission.assistance = time;
    rentals[i].commission.drivy = carCommission - rentals[i].commission.insurance - rentals[i].commission.assistance;
  }
}


function getRentalId(id){
  for (var i = 0; i < rentals.length; i++) {
    if(rentals[i].id == id){
      return rentals[i];
    }
  }
}

function computeDebt(actors){ //Exercise 5, compute every payment for each person
  for (var i = 0; i < actors.length; i++) {
    for (var j = 0; j < actors[i].payment.length; j++) {

    switch(actors[i].payment[j].who){ // Switch on every " type " of people
      case "driver":
        actors[i].payment[j].amount = getRentalId(actors[i].rentalId).price;
        break;
      case "owner":
        var rental = getRentalId(actors[i].rentalId);
        actors[i].payment[j].amount = rental.price - rental.commission.insurance - rental.commission.drivy - rental.commission.assistance;
        break;
      case "insurance":
        var rental = getRentalId(actors[i].rentalId);
          actors[i].payment[j].amount = rental.commission.insurance;
        break;
      case "assistance":
        var rental = getRentalId(actors[i].rentalId);
        actors[i].payment[j].amount = rental.commission.assistance;
        break;
      case "drivy":
        var rental = getRentalId(actors[i].rentalId);
        var time = getRentDuration(rental.pickupDate, rental.returnDate);
        actors[i].payment[j].amount = rental.commission.assistance + 4*time;
        break;
      default:
      }
    }
  }
}

function rentalUpdate(rentalModifications){ //Exercise 6 : Update of rentals with rentalModifications, navigating with the property name in the object to fastly replace it.
  for (var i = 0; i < rentalModifications.length; i++) {
    var rental = getRentalId(rentalModifications[i].rentalId);
    for(var property in rentalModifications[i]){
      if( property != "rentalId"){ // Exclude rentalId from things that have to be replace
        rental[property] = rentalModifications[i][property];
      }
    }
  }
}

//---------- Computation ---------
computePrice(rentals);
computeDebt(actors);

rentalUpdate(rentalModifications);

computePrice(rentals); //We compute again after modification
computeDebt(actors);



console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
