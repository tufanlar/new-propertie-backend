const  axios = require('axios');

const instance = axios.create({
  baseURL: 'https://www.google.com/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'json': true }
});

module.exports = instance
