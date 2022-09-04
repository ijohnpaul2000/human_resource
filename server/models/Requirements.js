module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define(
    "Requirement",
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
      pic2x2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      licenseCard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      neuroExam: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      trainingCertificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      openingClosingRep: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      transcriptRecord: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      firingCertificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      drugTestResult: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      brgyClearance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      policeClearance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      nbiClearance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      dilgClearance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hsCollegeCertificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      gkeResult: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      nsoCerfiticate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      otherGovId: {
        type: DataTypes.STRING,
      },
      completionStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Requirement.associate = (models) => {
    Requirement.belongsTo(models.Applicant, {
      foreignKey: "applicant_id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Requirement;
};
