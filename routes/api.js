const router = requrie("express").Router();
const Exercise = require("../models/exercise.js");

// post request to create new  exercise
// this should create the exercise collections in the database
router.post("/api/workouts", ({body}, res) => {
    Exercise.create(body)
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// put request to update exercise with new workout
// this should add values to the Exercise collection
router.put("/api/workouts/:id", ({body}, res) => {
    Exercise.insertMany(body)
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// get request get all exercise and workout data
// router.get("/api/workouts/range", (req, res) => {
//     Exercise.find({})
//         // add sorting here if needed
//         // may be able to do the propogation here
//         .sort({})
//         .then(dbExercise => {
//             res.json(dbExercise);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

// this is the aggregate attempt
router.get("/api/workouts/range", (req, res) => {
    Exercise.aggregate([{
        $addField: {
            totalDistance: {$sum: "$exercise.distance"},
            totalDuration: {$sum: "$exercise.duration"},
            totalWeight: {$sum: "$exercise.weight"},
            totalReps: {$sum: "$exercise.reps"},
            totalSets: {$sum: "$exercise.sets"}
        }
    }])
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});