module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
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
      appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      appointment_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appointment_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appointment_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Applicant, {
      foreignKey: "applicant_id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return Appointment;
};
