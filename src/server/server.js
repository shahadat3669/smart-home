
const app = require("./app");
//call the app.js module

const server = app.listen(8000, () => {
    console.log("server is connected");
});