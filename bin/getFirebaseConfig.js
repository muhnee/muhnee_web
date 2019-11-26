#!/usr/bin/env node

const firebase = require("firebase-tools");

/**
 * Execute this script with `node` to retrieve the Firebase
 * project config. Created for use with NPM scripts.
 *
 * Usage example:
 * `REACT_APP_FIREBASE_CONFIG=\"$(node ./bin/getFirebaseConfig.js)\" react-scripts start`
 *
 * This is for local development use ONLY. Ensure that you
 * have `firebase-tools` installed and that you are logged
 * in to the Firebase CLI with an appropriate account.
 *
 */
return firebase.setup
  .web({ project: process.env.REACT_APP_FIREBASE_PROJECT })
  .then(value => console.log(JSON.stringify(value)));
