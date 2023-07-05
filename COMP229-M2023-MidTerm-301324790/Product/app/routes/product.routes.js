module.exports = app => {

  const products = require("../controllers/product.controller.js");

 

  var router = require("express").Router();

 

  // Create a new Product

  router.post("/", products.create);
  const product = new Products({

    name: req.body.name,

      description: req.body.description,

      price: req.body.price,

      category: req.body.category,

      published: req.body.published ? req.body.published : false

  });

 

  // Retrieve all Products

  router.get("/", products.findAll);
  exports.findAll = (req, res) => {

    const name = req.query.name;
 
   var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
 
  
 
   Products.find(condition)
 
     .then(data => {
 
       res.send(data);
 
     })
 
     .catch(err => {
 
       res.status(500).send({
 
         message:
 
           err.message || "Some error occurred while retrieving products."
 
       });
 
     });
 
  
 
 };

 

  // Retrieve all published Products

  router.get("/published", products.findAllPublished);
  exports.findAllPublished = (req, res) => {

 

  };
 
  
 
 

 

  // Retrieve a single Product with id

  router.get("/:id", products.findOne);
  exports.findOne = (req, res) => {

    const id = req.params.id;
  
   
  
    Products.findById(id)
  
      .then(data => {
  
        if (!data)
  
          res.status(404).send({ message: "Not found Product with id " + id });
  
        else res.send(data);
  
      })
  
      .catch(err => {
  
        res
  
          .status(500)
  
          .send({ message: "Error retrieving Product with id=" + id });
  
      });
  
   
  
  };

 

  // Update a Product with id

  router.put("/:id", products.update);
  exports.update = (req, res) => {

 

  };

 

  // Delete a Product with id

  router.delete("/:id", products.delete);
  exports.delete = (req, res) => {

 

  };
 

  // Delete all Products

  router.delete("/", products.deleteAll);
  exports.delete = (req, res) => {

 

  };
 

  app.use('/api/products', router);

};