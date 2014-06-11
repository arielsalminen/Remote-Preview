fs      = require "fs"
request = require "supertest"
app     = require "../build/app"

txt = ->
	fs.readFileSync "build/public/url.txt",{encoding:"utf8"},(err,data)->
		throw err if err
		return data


describe "GET /url", ->
	it "should contain text in url.txt",(done)->
		fs.readFile "build/public/url.txt",{encoding:"utf8"},(err,data)->
			throw err if err
			request(app)
			.get("/url")
			.expect(data,done)
describe "POST /update", ->
	it "should update url.txt",(done)->
			request(app)
			.post("/update")
			.send(url:"http://ameblo.jp")
			.expect(txt(),done)
