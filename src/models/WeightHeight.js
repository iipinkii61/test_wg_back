module.exports = (sequelize, DataTypes) => {
  const WeightHeight = sequelize.define(
    "WeightHeight",
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  WeightHeight.associate = (db) => {
    WeightHeight.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return WeightHeight;
};
