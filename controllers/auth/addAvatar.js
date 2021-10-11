const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../../models/user');
const { sendSuccessRes } = require('../../utils');

const uploadDir = path.join(__dirname, '../../', 'public');

const addAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { originalname, path: tempName } = req.file;

  const fileName = path.join(uploadDir, 'avatars', originalname);

  try {
    const newAvatar = await Jimp.read(tempName);
    await newAvatar.resize(250, 250);
    await newAvatar.writeAsync(tempName);

    const [extention] = originalname.split('.').reverse();
    const newFileName = `user-avatar_${_id}.${extention}`;
    await fs.rename(tempName, fileName);
    const avatarURL = path.join('/avatars', newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    sendSuccessRes(res, { avatarURL, message: 'Success' }, 200);
  } catch (error) {
    fs.unlink(tempName);
  }
};
module.exports = addAvatar;
