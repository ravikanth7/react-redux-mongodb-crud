import Products from '../models/products';
import sanitizeHtml from 'sanitize-html';

export function getProducts(req, res) {
  Products.find({}).exec((err, products) => {    
    if (err) {
      res.status(500).send(err);
    }
    res.json({ products });
  });  
}

export function getProduct(req, res) {
  Products.findOne({ _id : req.params.id }).exec((err, product) => {    
    if (err) {
      res.status(500).send(err);
    }
    res.json({ product });
  });  
}

export function addProduct(req, res) {
  if (!req.body.product.name || !req.body.product.code || !req.body.product.quantity || !req.body.product.expiry) {
    res.status(403).send({ success: false, message: "Something Missing!!!"});
  }

  const newProduct = new Products(req.body.product);

  newProduct.name = sanitizeHtml(newProduct.name);
  newProduct.code = sanitizeHtml(newProduct.code);  
  
  newProduct.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!saved) {
        res.status(403).send({ success: false, message: "Some Error Occured!!!"});
      } else {
        res.json({ product: saved });
      }
    }    
  });  
}

export function deleteProduct(req, res) {
  Products.findOne({ _id : req.params.id }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    product.remove(() => {
      res.send({message: "Deleted Successfully!!"});
    });
  });    
}

export function updateProduct(req, res) {
  Products.findOne({ _id : req.params.id }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    product.name = req.body.product.name
    product.code = req.body.product.code
    product.quantity = req.body.product.quantity
    product.expiry = req.body.product.expiry

    product.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ product: saved });
    }); 
  });  
}