/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Nation = require('./models/Nation');
const Embassy = require('./models/Embassy');

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }  

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

const _nationListProjection = 'title creationDatetime viewPublic';

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET list of public nations starting in the future
  app.get('/api/nations', (req, res) => {
    // Nation.find({viewPublic: true, creationDatetime: { $gte: new Date() }}, _nationListProjection, (err, nations) => {
    Nation.find({viewPublic: true}, _nationListProjection, (err, nations) => {
      let nationsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (nations) {
        nations.forEach(nation => {
          nationsArr.push(nation);
        });
      }
      res.send(nationsArr);
    });
  });  

  // GET list of all nations, public and private (admin only)
  app.get('/api/nations/admin', jwtCheck, adminCheck, (req, res) => {
    Nation.find({}, _nationListProjection, (err, nations) => {
      let nationsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (nations) {
        nations.forEach(nation => {
          nationsArr.push(nation);
        });
      }
      res.send(nationsArr);
    });
  });  

 // GET nation by nation ID
  app.get('/api/nation/:id', jwtCheck, (req, res) => {
    Nation.findById(req.params.id, (err, nation) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!nation) {
        return res.status(400).send({message: 'Nation not found.'});
      }
      res.send(nation);
    });
  });

 // GET Embassies by nation ID
  app.get('/api/nation/:nationId/embassies', jwtCheck, (req, res) => {
    Embassy.find({eventId: req.params.eventId}, (err, embassies) => {
      let embassiesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (embassies) {
        embassies.forEach(embassy => {
          embassiesArr.push(embassy);
        });
      }
      res.send(embassiesArr);
    });
  });  

};