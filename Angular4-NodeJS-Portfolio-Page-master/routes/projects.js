const express   = require('express'), 
mongoose        = require('mongoose'),
Project         = require('../models/project'),
sanitizer       = require('sanitizer'),
router          = express.Router();

//SHOW Route
router.get("/:id", (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if(err){
            console.log(foundProject);
        } else {
            res.send(foundProject);
        }
    });
});

//EDIT Route
router.get("/:id/edit", (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if(err){
            console.log(foundProject);
        } else {
            res.send(foundProject);
        }
    })
});

//DELETE Route
router.delete("/:id", (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err) => {
        console.log(req.params.id);
        if(err){
             res.json({success: false, msg:'Failed to delete project'});
        } else {
            res.json({success: true, msg:'Project deleted.'});
        }

    })
});

//UPDATE Route
router.put("/:id/edit", (req, res) => {

    req.body.title = sanitizer.escape(req.body.title);
    req.body.image = sanitizer.escape(req.body.image);
    req.body.description = sanitizer.escape(req.body.description);

      let newProject = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    };


    Project.findByIdAndUpdate(req.params.id, newProject, (err, foundProject) => {
         if(err)
        {   
            res.json({success: false, msg:'Failed to create project'});
        } else
        {
            res.json({success: true, msg:'Project uptadet.'});
        }
    }
)});

//Finds all Projects
router.get("", (req, res) => {
    Project.find({}, (err, projects) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(projects);
        }
    });
});

//NEW route
router.post("/new", (req, res) => {

    req.body.title = sanitizer.escape(req.body.title);
    req.body.image = sanitizer.escape(req.body.image);
    req.body.description = sanitizer.escape(req.body.description);

    let newProject = new Project({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    });

    Project.addProject(newProject, (err, newProject) => {
        if(err)
        {
            console.log(newProject);
            res.json({success: false, msg:'Failed to create project'});
        } else
        {
            res.json({success: true, msg:'Project created.'});
        }

    });

   
});

module.exports = router;