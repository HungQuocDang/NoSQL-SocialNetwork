const router = require('express').Router();
const {
  getVfriendss,
  getSingleVfriends,
  createVfriends,
  updateVfriends,
  deleteVfriends,
  addVfriendsResponse,
  removeVfriendsResponse,
} = require('../../controllers/vfriendsController');

// /api/vfriendss
router.route('/').get(getVfriendss).post(createVfriends);

// /api/vfriendss/:vfriendsId
router
  .route('/:vfriendsId')
  .get(getSingleVfriends)
  .put(updateVfriends)
  .delete(deleteVfriends);

// /api/vfriendss/:vfriendsId/responses
router.route('/:vfriendsId/responses').post(addVfriendsResponse);

// /api/vfriendss/:vfriendsId/responses/:responseId
router.route('/:vfriendsId/responses/:responseId').delete(removeVfriendsResponse);

module.exports = router;