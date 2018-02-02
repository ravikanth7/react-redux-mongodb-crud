import Users from '../models/users';
import sanitizeHtml from 'sanitize-html';
import * as jwt from 'jsonwebtoken';
import * as Utils from "../utils/utils";

export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.email || !req.body.user.password) {
    res.status(403).send({ success: false, message: "Something Missing!!!"});
  } else {
    Users.findOne({ email : req.body.user.email }, { password : 0 }).exec((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (user) {
        return res.status(403).json({ success: false, message: "Email already registered!!!"}).end();
      } else {
        const newUser = new Users(req.body.user);

        newUser.name = sanitizeHtml(newUser.name);
        newUser.email = sanitizeHtml(newUser.email);  
        newUser.password = Utils.encrypt(req.body.user.password);  
        
        newUser.save((err, saved) => {
          if (err) {
            res.status(500).send(err);
          }
          const token = jwt.sign({ id: saved._id }, req.app.get('superSecret'), {
            expiresIn: 86400 // expires in 24 hours
          });
          const ret = saved.toObject();
          delete ret["password"];       
          res.json({ user: ret, token: token });
        });      
      }
    }); 
  }    
}

export function login(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).send({ success: false, message: "Something Missing!!!"});
  } else {
    Users.findOne({ email : req.body.user.email }).exec((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(403).json({ success: false, message: 'User not found.' });
      }

      if (Utils.decrypt(user.password) != req.body.user.password) {
        res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        const token = jwt.sign({ id: user._id }, req.app.get('superSecret'), {
          expiresIn: 2592000 // expires in 30 days
        });
        const ret = user.toObject();
        delete ret["password"];               
        res.json({ user: ret, token: token });        
      }
    });
  }
}

export function authenticate(req, res) {
  if (!req.body.token) {
    res.status(403).send({ success: false, message: "Something Missing!!!"});
  } else {
    const token = req.body.token

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {      
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        Users.findOne({ _id : decoded.id }, { password : 0 }).exec((err, user) => {
          if (err) {
            res.status(500).send(err);
          }

          res.json({ user: user, token: token });
        });        
      }
    });
  } 
}