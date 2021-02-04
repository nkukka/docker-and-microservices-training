

# Install Docker Registry to your K8s cluster using Helm
```bash
helm init
helm install stable/docker-registry --set service.type=NodePort

kubectl get services
```
