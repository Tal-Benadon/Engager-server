
async function createNewCampaign(userId, body) {
    const {title, details , img}= body
    if (!isValidObjectId(userId)) throw { code: 401, msg: "inValid _id" };
    campName = title.trim();
    const nameIsExist = await campaignController.readOne({
      user: userId,
      title: campName,
    });
    if (nameIsExist) throw { code: 404, msg: "This name already exists" };
    const created = await campaignController.create({
      user: userId,
      title: campName,
      details: details,
      img: img
    });
    const updatedUser = await userController.updateOneByFilter({ _id: userId }, { $push: { campaigns: created._id } });
    if (updatedUser) console.log('update user', updatedUser);
    return created;
  }