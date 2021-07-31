const mongoose = require("mongoose");
const yup = require("yup");

//PLACE SCHEMA
const PlaceSchema = new mongoose.Schema({
  qr: {
    type: String,
    required: true,
  },
  etage: {
    type: String,
    required: true,
  },
  etat: {
    type: String,
    required: true,
  },
  
});

const validatePlace = (place) => {
  const schema = yup.object().shape({
    qr: yup.string().required(),
    etage: yup.string().required(),
    etat: yup.string().required(),
    
  });

  return schema
    .validate(place)
    .then((place) => place)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Place = new mongoose.model("Place", PlaceSchema);
exports.validatePlace = validatePlace;

