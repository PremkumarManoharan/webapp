import app from "./src/api/v1/index.js";

const server  = app.listen(3000, ()=> { // move port to .env
    console.log("Server running on port 3000");
});

export default server; 
