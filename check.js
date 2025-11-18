var foo = 10;
function bar() {
  console.log(foo); // undefined
  var foo = 26;
}

bar();

// const data = { name: 'bhanu', age: 25, admin: false };
// const fetchData = () => {
//   let success = true;

//   return new Promise((resolve, reject) => {
//     if (success) {
//       setTimeout(() => {
//         console.log('Resolving with data:', data);
//         resolve(data);
//       }, 2000);
//     } else {
//       reject('data not found');
//     }
//   });
// };

// fetchData()
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

//! async await
// const data = { name: 'bhanu', age: 25, admin: false };

// const fetchData = (api) => {
//   let success = true;

//   return new Promise((resolve, reject) => {
//     if (success) {
//       resolve(
//         fetch(api)
//           .then((response) => {
//             return response;
//           })
//           .catch((err) => console.error(err))
//       );
//     } else reject('data not found');
//   });
// };

// (async () => {
//   try {
//     let data = await fetchData('https://fakestoreapi.com/products');
//     let resdata = await data.json();
//     console.log('final result:', resdata);
//   } catch (error) {
//     console.error(error);
//   }
// })();

//! call {
// function cook(ind1, ind2) {
//   let name = 'aman';
//   console.log(`${this.name} is having dinner with ${ind1} and ${ind2}`);
// }

// const user = { name: 'bhanu' };

// cook('roti', 'sabzi')
// cook.call(user, 'palak', 'roti');

//! apply

// function cook(ind1, ind2) {
//   console.log(`${this.name} is having dinner with ${ind1} and ${ind2}`);
// }

// const user = { name: 'bhanu' };

// cook.apply(user, ['palak', 'roti']);

//! bind
// function cook(ind1, ind2) {
//   console.log(`${this.name} is having dinner with ${ind1} and ${ind2}`);
// }

// const user = { name: 'bhanu' };

// let result = cook.bind(user, 'palak', 'roti');

// console.log(result());

// document
//   .getElementById('newBtn')
//   .addEventListener('click', () => console.log('button is called'), true);

//!  promise vs async await

// fetchData()
//   .then((result1) => fetchData1(result1))
//   .then((result2) => console.log(result2));

// async function fetchData() {
//   try {
//     const result1 = await fetchData1(result);
//     const result2 = await fetchData2(result1);
//     console.log(result2);
//   } catch (error) {
//     console.error(error);
//   }
// }

//! reduce
// let arr = [55, 34, 78, 12, 90];

// let ans = arr.reduce((acc, curVal) => acc + curVal, 0);
// console.log(ans);
// console.log(arr)

//! currying

// function add(a) {
//   return function second(b) {
//     return a + b;
//   };
// }

// let ans = add(5)
// let data= ans(6)
// console.log(data)

//! shallow and deep copy

const original = {
  name: 'John',
  age: 25,
  address: {
    city: 'New York',
    country: 'USA',
  },
  hobbies: ['reading', 'gaming'],
};

const shallow1 = { ...original };

const shallow2 = Object.assign({}, original);

let arr = [1, 2, 3, [4, 5]];
const shallow3 = arr.slice();

//! express js server

// import express from 'express';
// const app = express();

// const PORT = 4000;

// app.use((req, res, next) => {
//   next();
// });

// app.use((err, req, res, next) => {
//   res.json({ messsage: 'false', status: 500 });
// });

// app.get('user', (req, res)=>{
//   res.json()
// })

// app.get('/healthCheck', (req, res) => res.send('data recieved'));
// app.listen(PORT, () => console.log('server is running'));

//! functional component

// function greeting() {
//   return <h1>data</h1>;
// }

// const greeting1 = () => {
//   return <h1>data</h1>;
// };

//! creating index in mongodb

// db.myCOllection.createIndex({ email: 1 });

//! define schema
// const userSchema = new mongoose.Schema(
//   { name: { type: string, required: true } },
//   { timeStamp: true }
// );

// const User = mongoose.model("User", userSchema)

//! .env
// import dotenv from 'dotenv';
// dotenv.conifg();

//! sesion managment

// const sesion = require('express- sesion');
// app.use(
//   sesion({
//     secret: 'secret-key',
//     reSave: false,
//   })
// );

//! JOI validation
// const Joi = require('joi');

// // Define schema
// const userSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   age: Joi.number().integer().min(18).max(120),
// });

// // Validate data
// const result = userSchema.validate({
//   name: 'John Doe',
//   email: 'john@example.com',
//   age: 25,
// });

// if (result.error) {
//   console.log(result.error.details);
// } else {
//   console.log('Validation passed!');
// }

//! use Reducer syntax
// const [state, dispatch] = useReducer(reducer,initialState);

//! multer file upload
// import multer from 'multer';

// const upload = multer({ dest: 'uploads/' });

// app.post('upload', upload.single('file'), (req, res) => {
//   res.send('file uploaded');
// });

//! DOcker file for backend

// FROM node:18
// WORKDIR /app
// COPY package*.json./
// RUN npm install
// COPY...
// RUN npm run build
// EXPOSE 3000
// CMD ['npx', 'serve', 'build']

//! DOCKERFILE for forntend
// FROM node:18
// WORKDIR /app
// COPY package*.json./
// RUN npm install
// COPY...
// RUN npm run build
// EXPOSE 3000
// CMD ['node' 'server.js']

//! password encryption
//bcrypt, argon, passport
// bcrypt.hash('password', salt);
