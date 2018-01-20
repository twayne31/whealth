module.exports = function ( sequelize, DataTypes ) {

  var foodChoice = sequelize.define("foodChoice", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },  

    Qty:{
      type: DataTypes.INTEGER,
       
    },
    Unit: {
      type: DataTypes.STRING
    },
    Meal: {
      type: DataTypes.STRING
    },
    Food: {
      type: DataTypes.STRING
    },
    Calories: {
      type: DataTypes.INTEGER
    },
    Weight: {
      type: DataTypes.INTEGER
    },
    Food_Group: {
      type: DataTypes.INTEGER
    },
   }, {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    
  });

  return foodChoice;

};