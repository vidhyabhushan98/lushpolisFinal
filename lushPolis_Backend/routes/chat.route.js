const express = require("express");
//console.log("in chatRoutes");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chat.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").post( accessChat);
router.route("/fetch").get( fetchChats);
router.route("/group").post( createGroupChat);
router.route("/rename").put( renameGroup);
router.route("/groupremove").put( removeFromGroup);
router.route("/groupadd").put( addToGroup);

module.exports = router;
