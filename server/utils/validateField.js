const validateField = (field) => {
  if (field === undefined) {
    return existingApplicant[field];
  } else {
    return field;
  }
};

module.exports = validateField;
