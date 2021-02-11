# Cloning this repository
In order to get a copy of the hands-on materials, clone this repository on your local machine with the following command:
```
git clone https://github.com/nkukka/docker-and-microservices-training.git
```


# Installing the prerequisites (Linux, MacOS, Windows)
Install the following software through the following links or by using your favorite package manager:
- Docker Desktop (https://www.docker.com/products/docker-desktop)
- Docker Compose (https://docs.docker.com/compose/install/)
- Minikube (https://minikube.sigs.k8s.io/docs/start/)
- Helm (https://helm.sh/docs/intro/quickstart/, https://helm.sh/docs/intro/install/)

# Running Docker as non-root

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
su - $USER #refresh groups
id #check that group membership has been added
```