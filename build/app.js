var app, control, express, fs, http, path, routes;

express = require("express");

routes = require("./routes");

control = require("./routes/control");

http = require("http");

path = require("path");

fs = require("fs");

app = express();

module.exports = app;

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, "public")));
});

app.configure("development", function() {
  return app.use(express.errorHandler());
});

app.get("/", routes.index);

app.get("/control", control);

app.get("/url", function(req, res) {
  return res.sendfile("" + __dirname + "/public/url.txt");
});

app.post("/update", function(req, res) {
  var url;
  url = req.body.url;
  return fs.writeFile("" + __dirname + "/public/url.txt", url, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("saved..:" + url);
    return res.send(url);
  });
});

http.createServer(app).listen(app.get("port"), function() {
  return console.log("Remote Preview server listening on port " + app.get("port"));
});
