const router = require("express").Router();
const path = require("path");
const Exercise = require("../models/exercise.js");

// sends home page (index)
router.get("/", (req, res) => {
    res.redirect("index.html");
});

// sends stats page
router.get("/stats", (req, res) => {
    res.redirect("stats.html");
});

// sends exercise page
router.get("/exercise", (req, res) => {
    res.redirect("exercise.html");
});

// post request to create new  exercise
router.post("/api/workouts", ({ body }, res) => {
    Exercise.create(body)
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// put request to update exercise with new workout
router.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    const newExercise = req.body;

    Exercise.updateOne({ _id: id }, { $push: { exercises: newExercise } })
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// route to get the previous workout
// uses .aggregate to find workouts and add the total duration to the object
router.get("/api/workouts", (req, res) => {
    Exercise.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// get request get all exercise and workout data
router.get("/api/workouts/range", (req, res) => {
    console.log("route 3 hit")
    Exercise.aggregate([{
        $addFields: {
            totalDuration: { 
                $sum: "$exercises.duration" 
            }
        }
    }])
    .sort({_id: -1})
    .limit(7)
    .exec((err, dbExercise) => {
        if (err) res.json(err);
        
        res.json(dbExercise);
    });
});

module.exports = router;