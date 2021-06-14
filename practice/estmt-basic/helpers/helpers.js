const expressJwt = require('express-jwt');
const Organization = require('../models/organization');
const FinAccount = require('../models/finAccount');

function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(500).json({
      message: 'User is not authorized',
      error: err
    });
  }

  return res.status(500).json({ error: err });
}

function authJwt() {
  const jwtTokenSecret = process.env.JWT_SECRET;
  const api = process.env.API;

  return expressJwt({
    secret: jwtTokenSecret,
    algorithms: ['HS256'],
    isRevoked: isRevoked // isRevoked is true, if request is made by non-admin user
  }).unless({
    path: [
      `${api}/users/login`,
      `${api}/users/register`
    ]
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) // not admin
    done(null, true);

  // authorized and admin
  done();
}

// query helper functions
// Organization
async function getOrgIdsByOrgNames(orgNames) {
  let orgs = await Organization.find({org_uniquename: orgNames});
  if (orgs) {
    let orgIds = [];
    orgs.map(org => orgIds.push(org._id));
    return orgIds;
  }
  else {
    console.log('OrgIds not found');
    return null;
  }
}

// Fin_Account
async function getAcctIdsByOrgNames(orgNames) {
  let orgIds = await getOrgIdsByOrgNames(orgNames);
  if (orgIds) {
    let finAccts = await FinAccount.find({org_id: orgIds});
    if (finAccts) {
      let finAcctIds = [];
      finAccts.map(finAcct => finAcctIds.push(finAcct._id));
      return finAcctIds;
    }
    else {
      console.log('FinAccount not found');
      return null;
    }
  }
  else {
    console.log('OrgIds not found');
    return null;
  }
}

async function getAcctIdsByAcctNums(acctNums) {
  let accts = await FinAccount.find({acct_number: acctNums});
  if (accts) {
    let acctIds = [];
    accts.map(acct => acctIds.push(acct._id));
    return acctIds;
  }
  else {
    console.log('AcctIds not found');
    return null;
  }
}

module.exports = {
  errorHandler,
  authJwt, // Jwt
  getOrgIdsByOrgNames, // Organization
  getAcctIdsByOrgNames, getAcctIdsByAcctNums // FinAccount
};