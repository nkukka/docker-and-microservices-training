# Lesson 1

## Running Containers

At any time, you can check the commands that docker provides by:
```
docker help
```

Use `docker run` to run containers. For an example, you can instantly run nginx:
```
docker run -d --name mynginx nginx
```
We ran a container with name mynginx that is based on an image called nginx.
Nginx is an official docker image, publicly downloadable from [docker hub](https://hub.docker.com/). When you told your docker client to run nginx,
the docker server searched docker hub for an image with name nginx, downloaded it (on the virtual machine), and launched a container based on that image. The official nginx image
documentation is [here](https://hub.docker.com/_/nginx/).

**Modes:**
You can run docker containers in two different modes:
Here, we specified (with option -d) that we'd like to run nginx in **detached mode**. This means that it runs in the background and we do not see 
the stdout of the container.
The alternative is to run in **interactive mode** and allocating a text terminal (with options -it). This way you can see the stdout. Pressing ctrl+C will stop it.
To see stdout of detached containers, use `docker logs`: `docker logs mynginx`

**List containers:**
```
docker ps -a
```

**Stopping and starting containers:**
```
docker stop mynginx
docker start mynginx
```

**Removing a container:**
```
docker rm mynginx
```
Docker prevents removal of running containers. Use -f (--force) option if you want to override.

**Port Forwarding:**
To access a containerized web application we need to use port forwarding. In this example, we forward port 8080 of the docker server into mygninx container's port 80:
```
docker run -d --name mynginx -p 8080:80 nginx
```

## Managing images

**Building your own image:**
It is very rare that you'd have to make a new image without a base. In this example, let's customize the nginx image. For this you must create a Dockerfile in this folder. As a reminder, Dockerfile is the definition of a docker image.
First, we want to start building on top of the official nginx image. Insert to Dockerfile:
```
FROM nginx
```
Second, we'd probably like to change our page to be the index page in nginx. For this, create a file called `index.html` and insert some valid html, like:
```
<p>This is my page</p>
```
Then, we must override the official index page within our own in Dockerfile:
```
COPY index.html /usr/share/nginx/html/index.html
```

Build your image and tag (-t) it with a name:
```
docker build -t custom-nginx .
```
The dot (this folder) is the build target. In this case, it tells docker to build an image based on the Dockerfile and files in this folder.

Run a container based on your custom image:
```
docker run -d --name mynginx -p 80:80 custom-nginx
```

**List images:**
```
docker images
```

**Removing images:**
```
docker rmi custom-nginx
```

**Downloading and uploading images:**
```
docker pull alpine
docker tag alpine myname/alpine
docker push myname/alpine # requires account at dockerhub
```

## Volume mounts

In the build example we overrode image content at build time. As a result, all containers launched from our custom image have a custom index page.
Alternatively, we might want to override content at runtime. This can be achieved with a volume mount.
```
docker run -d --name mynginx -p 80:80 -v $(pwd)/index.html:/usr/share/nginx/html/index.html:ro nginx
```
We mount our index page into the official nginx container at runtime. The mount is read only (ro), so the container may not modify the file. Use
read write (rw) to give container write permissions on mounts. Mount sources only accept absolute paths.
