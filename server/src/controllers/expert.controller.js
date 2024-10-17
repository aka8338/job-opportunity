const {
    addExpert,
    loginExpert,
    getExpertProfile,
    updateExpert,
    
   
  } = require("../models/expert.model");
  // expert sign up by providing basic information
  const signup = async (req, res) => {
    try {
      const { email, password, firstName, lastName, phone } =
        req.body;
      await addExpert(
        email,
        password,
        firstName,
        lastName,
        phone
      )
        .then((result) => {
          res.status(201).json({ message: "Expert added successfully", result });
        })
        .catch((error) => {
          res.status(400).json({ message: "Expert not added", error });
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      await loginExpert(email, password)
        .then((result) => {
          res
            .status(200)
            .json({ message: "Expert logged in successfully", result });
        })
        .catch((error) => {
          res.status(400).json({ message: "Expert not logged in", error });
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  const expertProfile = async (req, res) => {
    try {
      const { expertId } = req.body;
      await getExpertProfile(expertId)
        .then((result) => {
          res
            .status(200)
            .json({ message: "Expert profile retrieved successfully", result });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "Expert profile not retrieved", error });
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  const editProfile = async (req, res) => {
    try {
      const { email, password, firstName,lastName } = req.body;
      await updateExpert(email, password, firstName,lastName)
        .then((result) => {
          res
            .status(200)
            .json({ message: "Expert profile updated successfully", result });
        })
        .catch((error) => {
          res.status(400).json({ message: "Expert profile not updated", error });
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };


  
 
  
  module.exports = {
    signup,
    login,
    expertProfile,
    editProfile,
   
  };
  