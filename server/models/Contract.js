/*
* sorry boss, recheck mo na lng
*/

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "Contract",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      applicant_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );
  Contract.associate = (models) => {
    Contract.belongsTo(models.Applicant, {
      foreignKey: "applicant_id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  };
  return Contract;
}