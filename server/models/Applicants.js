module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define(
    "Applicant",
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
      suffix: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      birthplace: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      citizenship: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      educational_background: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      civil_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employment_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employment_notes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRequirementComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Applicant;
};
