Url   = require "url"
mongodb = require "mongodb"

# sets up hooks to persist the brain into redis.
module.exports = (robot) ->
  info   = Url.parse process.env.MONGO_URL || 'http://pepe:27017'
  server = new mongodb.Server(info.hostname, (Number) info.port, {})
  client = new mongodb.Db("hubot", server);

  client.open (err, connection) ->
    client.createCollection "storage", (err, collection) ->
      cursor = collection.findOne {}, (err, doc) ->
        if err 
          throw err
        else if doc
          robot.brain.mergeData doc

    robot.brain.on 'save', (data) ->
      connection.collection 'storage', (err, collection) ->
        collection.remove {}
        collection.save data

    robot.brain.on 'close', ->
      connection.close
