const router = require('express').Router();
const { Animal } = require('../../models');
// const checkLogin = require('../../utils/checkLogin');

//Add animal
//add middleware
router.post('/', async (req, res) => {
    // console.log("checkpoint 1")
    try {
      const newAnimal = await Blog.create({
      ...req.body,
        user_id: req.session.user_id,
        
      // ...console.log(req.session)
  
      });
      // console.log("checkpoint 2")
  
      // res.render('dashboard', {
      //   newAnimal,
      //   logged_in: req.session.logged_in
      // });
      res.status(200).json(newAnimal);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //delete animal when its adopted
  //add middleware
  router.delete('/:id', async (req, res) => {
    try {
      const animalData = await Animal.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!animalData) {
        res.status(404).json({ message: 'No animal found with this id' });
        return;
      }
  
      res.status(200).json(animalData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;