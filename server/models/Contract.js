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
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contract_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      contract_status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Active",
      },
      contract_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Contract.associate = (models) => {
    Contract.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Contract;
};
