const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();

const express = require('express')
const app = express()

// https://baseurl.com/ap/
exports.api = functions.region('europe-west1').https.onRequest(app)