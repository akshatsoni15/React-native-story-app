const { User } = require("../models");
module.exports = {
  Query: {
    getUserDetails: async () => {
      try {
        const user = await User.findAll({
          where: {
            id: 1,
          },
        });
        // console.log(user);
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addProfilePicture: async (_, args) => {
      const { dp } = args;
      try {
        await User.update({ dp: dp }, { where: { id: 1 } });
        const user1 = await User.findAll({
          where: {
            id: 1,
          },
        });
        return user1;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
