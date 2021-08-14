const express = require("express");
const router = express.Router();
const { Entite, validateEntite } = require("../models/Entite");

//POST: CREATE A NEW entite
router.post("/", async (req, res) => {
  const error = await validateEntite(req.body);
if(error.message) res.status(400).send(error.message);

  entite = new Entite({
    nom: req.body.nom,
      });

  entite
    .save()  
    .then((entite) => {
      res.send(entite);
    })
    .catch((error) => {
      res.status(500).send("entite was not stored in db");
    });
});

//GET ALL entites
router.get("/", (req, res) => {
  Entite.find()
    .then((entites) => res.send(entites))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

//GET THE entite BY ID
router.get("/:entiteId", async (req, res) => {
  const entite = await Entite.findById(req.params.entiteId);
  if (!entite) res.status(404).send("entite not found");
  res.send(entite);
});

//UPDATE entite BASED ON ID
router.put("/:entiteId", async (req, res) => {
  const updatedEntite = await Entite.findByIdAndUpdate(
    req.params.entiteId,
    {
    nom: req.body.nom,
    
    },
    { new: true }
  );

  if (!updatedEntite) res.status(404).send("entite not found");
  res.send(updatedEntite);
});

//DELETE entite BASED ON ID
router.delete("/:entiteId", async (req, res) => {
  const entite = await Entite.findByIdAndRemove(req.params.entiteId);
  if (!entite) res.status(404).send("entite with id not found");
  res.send(entite); 
});

module.exports = router;