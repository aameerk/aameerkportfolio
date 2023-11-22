const mongoose  = require('mongoose'),
config          = require('../config/database');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    description:  {
        type: String,
        required:true
    }
});

const Project = module.exports = mongoose.model("Project", projectSchema); 

//export functions

module.exports.getProjectById = function(id, callback){
    Project.findById(id, callback);
}

module.exports.getProjectByTitle = function(title, callback){
    const query = {title: title};
    Project.findOne(query, callback);
}

module.exports.addProject = function(project, callback){
     Project.create(project, callback) ;
}