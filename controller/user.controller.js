const db = require("../db/db");

const getAllUsers = async (req, res) => {
  try {
    const query = `
      SELECT * FROM users;
    `;

    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;

    const query = `
      SELECT * FROM users
      WHERE role = $1;
    `;

    const result = await db.query(query, [role]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const userUpdate = async (req, res) => {
  try {
    // отримуємо id з параметра запиту
    const idUser = req.params.id;

    // отримуємо тіло запиту
    const dataUser = req.body.user;
    const dataProfile = req.body.profile;

    // формуємо рядок запиту до db
    const queryUser = `
      SELECT * FROM users
      WHERE id = $1;
    `;

    // робимо пошук користувача за id
    const resultUser = await db.query(queryUser, [idUser]);
    // зберігаємо в змінну обєкт user
    const selectUser = resultUser.rows[0];

    // зберігаємо в змінну id профіля users
    const userProfileId = selectUser.profileid;

    // отримуємо профіль user
    const queryProfile = `
      SELECT * FROM profile
      WHERE id = $1;
    `;

    // робимо пошук profile за id
    const resultProfile = await db.query(queryProfile, [userProfileId]);

    // зберігаємо в змінну обєкт Profile
    const selectProfile = resultProfile.rows[0];

    // оновлюємо данні в обєкті user та profile
    const updateUser = { ...selectUser, ...dataUser };
    const updateProfile = { ...selectProfile, ...dataProfile };

    const updateUserQuery = `
      UPDATE users
      SET
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        role = COALESCE($3, role),
        profileId = COALESCE($4, profileId)
      WHERE id = $5;
    `;

    const updateProfileQuery = `
      UPDATE profile
      SET
        firstname = COALESCE($1, firstName),
        lastname = COALESCE($2, lastName),
        state = COALESCE($3, state)
      WHERE id = $4;
    `;

    await db.query(updateUserQuery, [
      updateUser.username,
      updateUser.email,
      updateUser.role,
      updateUser.profileid,
      idUser,
    ]);

    await db.query(updateProfileQuery, [
      updateProfile.firstname,
      updateProfile.lastname,
      updateProfile.state,
      userProfileId,
    ]);

    res.json({ message: "User and profile updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const createUser = async (req, res) => {
  const { username, firstname, lastname, email, role, state } = req.body;

  try {
    const insertProfileQuery = `
      INSERT INTO profile (firstName, lastName, state)
      VALUES ($1, $2, $3) 
      RETURNING id;
    `;

    const profileResult = await db.query(insertProfileQuery, [
      firstname,
      lastname,
      state,
    ]);
    const profileId = profileResult.rows[0].id;

    const insertUserQuery = `
      INSERT INTO users (userName, email, role, dataCreate, profileid)
      VALUES ($1, $2, $3, $4, $5);
    `;

    const valuesUsersData = [username, email, role, new Date(), profileId];

    await db.query(insertUserQuery, valuesUsersData);

    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const getProfileIdQuery = `
      SELECT profileid FROM users
      WHERE id = $1;
    `;
    const profileIdResult = await db.query(getProfileIdQuery, [userId]);
    const profileId = profileIdResult.rows[0].profileid;

    const deleteUserQuery = `
      DELETE FROM users
      WHERE id = $1;
    `;
    await db.query(deleteUserQuery, [userId]);

    const deleteProfileQuery = `
      DELETE FROM profile
      WHERE id = $1;
    `;
    await db.query(deleteProfileQuery, [profileId]);

    res.json({ message: "User and associated profile deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllUsers,
  getUsersByRole,
  userUpdate,
  createUser,
  deleteUser,
};
