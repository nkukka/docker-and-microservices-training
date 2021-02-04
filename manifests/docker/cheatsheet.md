
# First - quick look

docker run -d -p 8080:80 nginx
docker container ps
docker images
curl localhost:8080

# Second  - Show docker internals

docker container run --name mycontainer -it alpine:latest sh
ps
ctrl+PQ
pstree -s docker
docker run -it --rm --privileged --pid=host justincormack/nsenter1
pstree

# Third - Show how pid stuff works

docker container run --name mycontainer -it alpine:latest sh
ps
exit
docker container ps

docker container run --name mycontainer -it alpine:latest sh
ps
ctrl+PQ
docker container ps
docker exec -it df884a93e432 sh
ps
exit
docker container ps
docker kill sfsdsgsgag

# Docker compose

docker-compose up
ctrl + C
docker-compose up -d
docker-compose ps

```bash
esimerkki:
    image: nginx
    ports:
        - 8000:80
```

up ps start stop jne
