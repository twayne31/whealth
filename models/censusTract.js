module.exports = function ( sequelize, DataTypes ) {

  var CensusTract = sequelize.define("CensusTract", {
    censusTract: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    State: {
      type: DataTypes.STRING
    },
    County: {
      type: DataTypes.STRING
    },
    Urban: {
      type: DataTypes.BOOLEAN
    },
    POP2010: {
      type: DataTypes.INTEGER
    },
    OHU2010: {
      type: DataTypes.INTEGER
    },
    PovertyRate: {
      type: DataTypes.STRING
    },
    MedianFamilyIncome: {
      type: DataTypes.INTEGER
    },
    lapop1: {
      type: DataTypes.INTEGER
    },
    lapop1share: {
      type: DataTypes.STRING
    },
    FoodDesert: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false
  });

  return CensusTract;

};