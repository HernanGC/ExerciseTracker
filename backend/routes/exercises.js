const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get( (req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .then(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post( (req, res) => {
    const exercise = req.body.exercise;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);


    const newExericse = new Exercise({
        exercise, 
        description, 
        duration, 
        date,
    });

    newExericse.save()
        .then( () => res.json('Exercise added!'))
        .then(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get( (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post( (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.exercise = req.body.exercise;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then( () => res.json('Exercise updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;