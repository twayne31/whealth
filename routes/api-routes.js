
var models = require("../models/");

module.exports = function(app) {

//display all of ones history of logging in foods
  app.get("/api/all", function(req, res) {
      models.foodChoice.findAll({}).then(function(results) {
      res.json(results);
      
    });
   });

  app.get("/api/foodChoices/createdAt/:createdAt", function(req, res) {
    db.Post.findAll({
      where: {
        createdAt: req.params.createdAt
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/foodChoices/Meal/:Meal", function(req, res) {
    db.Post.findAll({
      where: {
        Meal: req.params.Meal
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });



  app.post("/api/foodChoices", function(req, res) {
      console.log(req.body);
      db.foodChoice.create({
        Qty: req.body.QTY,
        Unit: req.body.Unit,
        Meal: req.body.Meal,
        Food: req.body.Food,
        Calories: req.body.Calories,
        Weight: req.body.Weight,
        Food_Group: req.body.Food_Group  
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
    });   

  app.put("/api/foodChoices", function(req, res) {
    db.foodChoice.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/foodChoices/:id", function(req, res) {
    db.foodChoice.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });
};



 