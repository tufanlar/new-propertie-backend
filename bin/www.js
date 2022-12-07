#!/usr/bin/env node

require('dotenv').config();
const server = require('../index');

const PORT = process.env.PORT ?? 8082;

server.listen(PORT, () => console.log(`TfnSoft API is running ${PORT}`))
