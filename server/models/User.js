module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middlename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_added: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
