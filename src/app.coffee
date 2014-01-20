# module
express = require("express")
routes = require("./routes")
control = require("./routes/control")
http = require("http")
path = require("path")
fs = require "fs"

app = express()
module.exports = app

app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  # app.use express.bodyParser()
  app.use express.json()
  app.use express.urlencoded()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))

app.configure "development", ->
  app.use express.errorHandler()

app.get "/", routes.index
app.get "/control", control
app.get "/url", (req, res) ->
  res.sendfile "#{__dirname}/public/url.txt"

app.post "/update", (req, res) ->
  url = req.body.url

  fs.writeFile "#{__dirname}/public/url.txt", url, (err)->
    console.log err if err
    console.log "saved..:#{url}"
    res.send url

http.createServer(app).listen app.get("port"), ->
  console.log "Remote Preview server listening on port " + app.get("port")



