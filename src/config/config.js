require('dotenv').config();

const config = {
  ENV: process.env.NODE_ENV,
  TEAM_IDS: process.env.TEAM_IDS?.split(',') || [],
};

module.exports = config;
