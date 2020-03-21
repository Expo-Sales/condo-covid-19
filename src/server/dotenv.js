const dotenv = require('dotenv')

function dotenvSetup() {
  dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })
}

module.exports = dotenvSetup
