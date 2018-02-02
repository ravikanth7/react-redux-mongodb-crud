import { Router } from 'express';
const router = new Router();
import * as http from 'http';
import * as mime from 'mime';
import logger from '../utils/logger';
import * as jwt from 'jsonwebtoken';

const call_log = logger().getLogger('server');

http.globalAgent.maxSockets = 65530;
call_log.info('Server Has started..');

import * as usercontroller from '../controllers/usercontroller';
import * as productcontroller from '../controllers/productcontroller';

const isAuthenticated = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;  
        next();        
      }
    });
  } else {
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
  }
}

router.get('/ping', function(req, res) {
  res.send("pong")
});

router.post('/api/users', function(req, res) {
  usercontroller.addUser(req, res)
});

router.post('/api/login', function(req, res) {
  usercontroller.login(req, res)
});

router.post('/api/authenticate', function(req, res) {
  usercontroller.authenticate(req, res)
});

router.get('/api/products', isAuthenticated, function(req, res) {
  productcontroller.getProducts(req, res)
});

router.get('/api/product/:id', isAuthenticated, function(req, res) {
  productcontroller.getProduct(req, res)
});

router.post('/api/products', isAuthenticated, function(req, res) {
  productcontroller.addProduct(req, res)
});

router.post('/api/product/:id', isAuthenticated, function(req, res) {
  productcontroller.updateProduct(req, res)
});

router.delete('/api/product/:id', isAuthenticated, function(req, res) {
  productcontroller.deleteProduct(req, res)
});

module.exports = router;