const app = require("./app");
const http = require("http");
const server = http.createServer(app);

//make server run on port 3001, hardcoded for now
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
