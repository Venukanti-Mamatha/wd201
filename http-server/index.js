const http = require("http");
const fs = require("fs");
const url = require("url");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

let homeContent = "";
let projectContent = "";
let registrationContent="";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html",(err,registration)=>{
  if(err){
    throw err;
  }
  registrationContent = registration;
});

http.createServer((request, response) => {
      let urlPath = url.parse(request.url).pathname;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch ( urlPath ) {
       case "/project":
        response.write(projectContent);
        response.end();
        break;

        case "/registration":
            response.write(registrationContent);
            response.end();
            break;

        default:
            response.write(homeContent);
            response.end();
            break;
    }
  })
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
