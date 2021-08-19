const express = require("express");
const router = express.Router();
const { Place, validatePlace } = require("../models/Place");

//POST: CREATE A NEW Place
router.post("/", async (req, res) => {
  const error = await validatePlace(req.body);
if(error.message) res.status(400).send(error.message);

  place = new Place({
    qr: req.body.qr,
    etage: req.body.etage,
    etat: req.body.etat,
      });

  place
    .save()  
    .then((place) => {
      res.send(place);
    })
    .catch((error) => {
      res.status(500).send("place was not stored in db");
    });
});

//GET ALL places
router.get("/", (req, res) => {
  Place.find()
    .then((places) => res.send(places))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});


//GET THE place BY ID

router.get ('/:placeId', async (req, res) => {
  const place = await Place.findById (req.params.placeId);
  if (!place) res.status (404).send ('place not found');
  res.send (place);
});

/*router.get ('/:id', (req, res) => {
  Place.findById (req.params.id)
    .then (place => {
      if (place) res.json ({etat: place.etat});
      res.status (404).send ('erreur:etat');
    })
    .catch (error => {
      res.status (500).send ('ERROR FOUND');
    });
});*/



//UPDATE place BASED ON ID
/*router.put("/:placeId", async (req, res) => {
  const updatedPlace = await Place.findByIdAndUpdate(
    req.params.placeId,
    {
    qr: req.body.qr,
    etage: req.body.etage,
    etat: req.body.etat,
    
    },
    { new: true }
  );

  if (!updatedPlace) res.status(404).send("place not found");
  res.send(updatedPlace);
});*/

router.put("/:placeId", async (req, res) => {
   const updatedPlace = await Place.findByIdAndUpdate( 
      req.params.placeId,
    { $set: { etat: 1 } },
    
    { new: false },
    function(err,model){

      if(err){
        console.log(err)
      }
      else{
        if(model.etat==='1') return "1";
        else return "0";
      }
    }
  );
  });

//DELETE place BASED ON ID
router.delete("/:placeId", async (req, res) => {
  const place = await Place.findByIdAndRemove(req.params.placeId);
  if (!place) res.status(404).send("place with id not found");
  res.send(place); 
});





module.exports = router;