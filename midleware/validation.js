const {
  newUserSchema,
  roleSchema,
  idSchema,
  updateSchema,
} = require("./schemas/schemas");

const db = require("../db");

const validateId = async (req, res, next) => {
  const id = req.params.id;
  const { error } = idSchema.validate(id);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const query = "SELECT id FROM users;";
    const result = await db.query(query);
    const userIds = result.rows.map((row) => String(row.id));

    if (userIds.includes(id)) {
      next();
      return;
    } else {
      res.status(404).json({ message: `User width id '${id}' not found` });
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
    return;
  }
  next();
};

const validationNewUser = async (req, res, next) => {
  const { error } = newUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validationRole = async (req, res, next) => {
  const role = req.params.role;
  const { error } = roleSchema.validate(role);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const validationUpdate = async (req, res, next) => {
  const updateData = req.body;
  const { error } = updateSchema.validate(updateData);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

module.exports = {
  validationNewUser,
  validationRole,
  validationUpdate,
  validateId,
};
