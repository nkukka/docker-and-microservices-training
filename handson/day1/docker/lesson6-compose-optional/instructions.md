# Docker Compose rocket.chat

1. Add a new docker-compose file in this folder

2. Set up rocket.chat application with e.g. this docker hub image: https://hub.docker.com/_/rocket.chat/

TIP: Use the rocket.chat docker hub page to look for what settings and other images you might need!

3. Check solution(initial_docker-compose.yml) for reference if you're having trouble


Things to try out:
* Find a way to check when the database is ready before actually starting rocket.chat
  -> TIP: Check healthchecks from Docker Compose version 2.1
  -> Command: `mongo --eval db.serverStatus()`can be used to check db health

* Create a volume for data persistence
  -> TIP: Check Mongo docker hub page for volume mount point on the container

* Both containers are in the default network
    -> add a separate network to use between chat application and db
