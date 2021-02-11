# Lesson 2

Goal:
  - Create a Dockerfile that creates a Docker image with a basic web service

1. Create an empty file with the name Dockerfile

2. This repository has a Node.js application under docker/server, but you can also use your own
  application. The Node.js application can be run e.g. inside a 'library/node' image, which has all
  the tools needed to install dependencies and run the application. Copy whatever application you
  use to the folder where your Dockerfile is.

3. For the application to run in the container you need to make sure that the Dockerfile you are creating will create an image that meets the following requirements:
  - Have node and npm available (comes with the image 'library/node')
  - Create a folder inside the image to store the application
  - Copy the application from this repository to the folder
  - Run 'npm install' to install all needed dependencies for the application
  - Set the container to run 'npm start' when started

4. Build your image with docker image build
  - To give the image a name use the -t flag

TIP: Check commands FROM, RUN, COPY, WORKDIR, CMD, ENTRYPOINT from documentation for help

5. Start a container from your image with docker container run
  - start the container in detached mode
  - expose port 8080 to a port on your docker-machine VM (e.g. 8080)
  - specify the container name

6. Check that your container can be found by using 'docker container ps'

7. Use a browser to see that the application responds by going to <machine_ip>:8080
  - Get <machine_ip> with: docker-machine ip <machine_name>

8. Try to stop and restart the container

9. Removing the container and image

10. You're done!
