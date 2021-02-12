

# Install Docker Registry to your K8s cluster
```bash
minikube start
echo "{     
  \"insecure-registries\" : [\"$(minikube ip):5000\"]
}" | sudo tee -a /etc/docker/daemon.json
sudo systemctl restart docker
minikube start
minikube addons enable registry
```
Restarting minikube will set kubectl settings to default, so you can re-apply the context settings from the exercises with the following commands:
```bash
kubectl config use-context k8s-training
```