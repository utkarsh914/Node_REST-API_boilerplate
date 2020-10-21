const mongoose = require("mongoose");

module.exports = () => {
  const uristring =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    "mongodb://localhost:27017/node-api";
  mongoose
    .connect(uristring, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Mongoose Connected!"));
};
