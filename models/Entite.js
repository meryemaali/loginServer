const mongoose = require("mongoose");
const yup = require("yup");

//Entite SCHEMA
const EntiteSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  
  
});

const validateEntite = (entite) => {
  const schema = yup.object().shape({
    nom: yup.string().required(),
    
  });

  return schema
    .validate(entite)
    .then((entite) => entite)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Entite = new mongoose.model("Entite", EntiteSchema);
exports.validateEntite = validateEntite;

