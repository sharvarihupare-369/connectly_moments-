const { createProfileService, getProfileService , editProfileService, deleteProfileService} = require("../services/ProfileService");
const { UserModel } = require("../models/UserModel")

async function createProfile(req, res) {
   try {
      const userId = req.userId
      const user = await UserModel.findById(userId);
      if (!user) {
         return res.status(404).send({ error: "User not found" });
      }
      const { email, username } = user
      const profileData = { userId, username, email, ...req.body };
      const profile = await createProfileService(profileData);
      res.status(201).send({ message: "Profile created successfully", profile });
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
}

async function getProfile(req, res) {
   try {
      const userId = req.userId
      const profile = await getProfileService(userId);
      if (!profile) {
         throw new Error("Profile not found");
      }
      res.status(200).send({ profile: profile });
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
}

async function editProfile(req,res) {
   try {
      const userId = req.userId;
      const updatedProfile = await editProfileService(userId,req.body);
      if (!updatedProfile) {
         throw new Error("Profile not found");
      }
      res.status(200).send({ "msg":"Profile updated successfully", profile: updatedProfile });
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
}

async function deleteProfile(req,res) {
   try {
      const userId = req.userId
      const deletedProfile = await deleteProfileService(userId)
      res.status(200).send({"msg":"Profile deleted successfully"})
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
}

module.exports = { createProfile, getProfile, editProfile, deleteProfile }