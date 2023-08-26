const express = require("express");
const router = express.Router();
const cntrl = require("../controller");
const {
  validationNewUser,
  validationRole,
  validateId,
  validationUpdate,
} = require("../midleware");

router.get("/", cntrl.getAllUsers);
router.get("/:role", validationRole, cntrl.getUsersByRole);
router.post("/", validationNewUser, cntrl.createUser);
router.put("/:id", validateId, validationUpdate, cntrl.userUpdate);
router.delete("/:id", validateId, cntrl.deleteUser);

module.exports = router;
