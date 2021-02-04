# Installing the prerequisites (Linux, MacOS, Windows)
Install the following software through the following links or by using your favorite package manager:
- Docker Desktop (https://www.docker.com/products/docker-desktop)
- Docker Compose (https://docs.docker.com/compose/install/)
- Minikube (https://minikube.sigs.k8s.io/docs/start/)

# Running Docker as non-root

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
su - $USER #refresh groups
id #check that group membership has been added
```