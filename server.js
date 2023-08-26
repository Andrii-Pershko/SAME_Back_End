const app = require("./app");
const client = require("./db/db");

const PORT = process.env.PORT || 8080;

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => console.log(`server start on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error:", error);
  });
