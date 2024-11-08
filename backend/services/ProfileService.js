const ProfileModel = require("../models/ProfileModel")

async function createProfileService(profileData) {
  try {
    const profileInfo = await ProfileModel.create(profileData)
    return profileInfo
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getProfileService(userId) {
  try {
    const profileData = await ProfileModel.findOne({ userId: userId })
    return profileData
  } catch (error) {
    throw new Error(error.message);
  }
}

async function editProfileService(userId, updatedData) {
  try {
    const editedProfile = await ProfileModel.findOneAndUpdate({ userId: userId }, updatedData, { new: true })
    return editedProfile
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteProfileService(userId) {
 try {
  const deletedProfile = await ProfileModel.findOneAndDelete({userId:userId})
  return deletedProfile
 } catch (error) {
  throw new Error(error.message);
 }
}

module.exports = { createProfileService, getProfileService , editProfileService, deleteProfileService}