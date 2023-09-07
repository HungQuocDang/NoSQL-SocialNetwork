const { Vfriends, User } = require('../models');

module.exports = {
  async getVfriendss(req, res) {
    try {
      const vfriendss = await Vfriends.find();
      res.json(vfriendss);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleVfriends(req, res) {
    try {
      const vfriends = await Vfriends.findOne({ _id: req.params.vfriendsId })

      if (!vfriends) {
        return res.status(404).json({ message: 'No friends with that ID' });
      }

      res.json(vfriends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new vfriends
  async createVfriends(req, res) {
    try {
      const vfriends = await Vfriends.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { vfriendss: vfriends._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'friends created, but found no user with that ID',
        });
      }

      res.json('Created the vfriends 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateVfriends(req, res) {
    try {
      const vfriends = await Vfriends.findOneAndUpdate(
        { _id: req.params.vfriendsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!vfriends) {
        return res.status(404).json({ message: 'No friends with this id!' });
      }

      res.json(vfriends);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteVfriends(req, res) {
    try {
      const vfriends = await Vfriends.findOneAndRemove({ _id: req.params.vfriendsId });

      if (!vfriends) {
        return res.status(404).json({ message: 'No friends with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { vfriendss: req.params.vfriendsId },
        { $pull: { vfriendss: req.params.vfriendsId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Friends created but no user with this id!' });
      }

      res.json({ message: 'Friends successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a vfriends response
  async addVfriendsResponse(req, res) {
    try {
      const vfriends = await Vfriends.findOneAndUpdate(
        { _id: req.params.vfriendsId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      );

      if (!vfriends) {
        return res.status(404).json({ message: 'No friends with this id!' });
      }

      res.json(vfriends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove vfriends response
  async removeVfriendsResponse(req, res) {
    try {
      const vfriends = await Vfriends.findOneAndUpdate(
        { _id: req.params.vfriendsId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )

      if (!vfriends) {
        return res.status(404).json({ message: 'No friends with this id!' });
      }

      res.json(vfriends);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};