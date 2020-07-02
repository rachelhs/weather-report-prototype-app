//OBJECT DESTRUCTURING

// console.log('destructuring');

// const person = {
//     name: 'Rachel',
//     age: 50,
//     location: {
//         city: 'Bristol',
//         temp: 26
//     }
// };


// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (city && temperature) {

// console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'default'} = book.publisher;

// console.log(publisherName);

//ARRAY DESTRUCTURING

const address = ['1299 5 Juniper Street', 'Philedeplhia', 'Pennsylvania', '19474'];

//just leave a comma if e.g street not needed --> [, city, state]
//also can leave off anything after what you need eg postcode

const [ street, city, state = 'unknown', postcode ] = address;

console.log(`You are in ${city}, ${state}`)

const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [ name, small, medium, large ] = item;

console.log(`A medium ${name} costs ${medium}`);