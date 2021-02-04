# Docker layers & image optimization training

Requirements:
  - Working Docker installation
  - Internet connection

Ǵoals:
  - Understand how layers affect image size
  - Learn basic techniques to reduce the size of Docker images

1. Start by building the Dockerfile in this directory with 'docker image build -t IMAGE_NAME .'
  - The image itself is an untested mock image with a collection of tools for web testing

2. Check how large the image is with 'docker image ls'

3. You can see the layer structure of your image with 'docker image history IMAGE_NAME'. Check how
   layers in this image affect the size:
   - The final size of an image is roughly the sum of the size of the layers
   - Every command in the Dockerfile creates a new layer to the image
   - To get optimally small images, all unnecessary files a step creates should be removed during that step

4. Try change the Dockerfile to produce a smaller image, but:
  - Firefox, the robot framework tool set, Xvfb and python2.7 needs to be installed
  - Geckodriver executable will need to be available at /usr/bin/geckodriver and /opt/geckodriver/geckodriver
  - Container must be able to start with docker container run IMAGE_NAME --version and print robot version
  - All other aspects, including the base image can be changed

5. An example solution is availabe in Dockerfile-optimized:
  - But try to do it yourself first
  - Or do it better than in the example!

TIP: if you want to have shell access to a container based on this, image, you have to override the entrypoint

```
docker run -it --entrypoint "/bin/sh" lesson3
```