Url   = require "url"
mongodb = require "mongodb"

# sets up hooks to persist the brain into mongodb.
module.exports = (robot) ->
  info   = Url.parse process.env.MONGO_URL || 'http://127.0.0.1:27017'
  # define mongo server and client for hubot database.
  server = new mongodb.Server(info.hostname, (Number) info.port, {})
  client = new mongodb.Db("hubot", server);

  #open a connection
  client.open (err, connection) ->
    if err
      throw err
    else if connection
      # create or retrieve the collection "storage"
      client.createCollection "storage", (err, collection) ->
        #retrieve the one object from the database collection
        collection.findOne {}, (err, doc) ->
          # if an error ocurs, throw an exception
          if err 
            throw err
          else if doc
            # else, merge the document into the robot brain.
            robot.brain.mergeData doc

      # listen to the "save" event of the robot's brain.
      robot.brain.on 'save', (data) ->
        # retrieve the collection storage.
        connection.collection 'storage', (err, collection) ->
          # remove the object from the database.
          collection.remove {}
          # save the new data provided by the robot brain.
          collection.save data

      # listen to the "close" event of the robot's brain.
      robot.brain.on 'close', ->
        # close the connection
        connection.close
