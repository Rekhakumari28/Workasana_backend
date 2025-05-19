const Project = require("./../models/project.model.js");

//addProject
exports.addProject =async (req, res) => {
  try {
    const project = new Project(req.body);
    const saveProject = await project.save();
    res.status(201).json({ message: "New Project created.", saveProject });
  } catch (error) {
    res.status(500).json({ error: "Failed to create new project.", error });
  }
}

//getProject

exports.getProject =async (req, res) => {
  const { status } = req.query;
  
  let filter = {};
  if (status) {
    filter.status = status;
  }
  try {
    const project = await Project.find(filter);
   if(! project){
res.status(404).json({error:"No project found."})
   }
    res.status(200).json({message:"All projects", project});
  } catch (error) {
    res.status(500).json({ error: "Failed to get project.", error });
  }
}

//update project

exports.updateProject =async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project.", error });
  }
}

//getProjectById

exports.getProjectById =async (req, res) => {
  try {
    const projectById = await Project.findById(req.params.id);
    res.status(200).json(projectById);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project.", error });
  }
}

//deleteProject

exports.deleteProject =async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project.", error });
  }
}
