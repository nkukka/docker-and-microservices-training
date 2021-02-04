
# Preqequisite

```
minikube docker-env
# run also the eval of its output
```


# Lesson 1

- Create your own namespace with your own name or something unique:

    ```bash
    kubectl create namespace <your-namespace>
    ```

- Check from master that namespace is active:  
    ```bash
    kubectl get namespaces
    ```

- Check the kube config (located in ~/.kube/config)
    ```bash
    kubectl config view
    ```

- change the default namespace
    ```bash
    kubectl config set-context $(kubectl config current-context) --namespace=<your-namespace>
    ```

- you can also create a new context
    ```bash
    kubectl config set-context k8s-training --namespace=<your-namespace> --cluster=<cluster-name> --user=<user>
    ```

- and change to that context
    ```bash
    kubectl config use-context k8s-training
    ```

- Check the kube config (located in ~/.kube/config)

    ```bash
    kubectl config view
    ```

- Check from master that nodes are available and your namespace is running:  

    ```bash
    kubectl get nodes
    kubectl get pods --all-namespaces
    ```

- Deploy the project echoserver on master:

    ```bash
    kubectl run hello-node --image=hello-node:v1 --port=8080 --record
    ```

- Inspect that the container is running:

    ```bash
    kubectl get deployments
    kubectl get pods --output wide
    ```

- Wait what, seems like there are some problems, to debug this run

    ```bash
    kubectl describe pod <podname>
    ```
    What seems to be the problem here?


- Solution
    The image "hello-node" doesnt seem to exist in the docker registry. 
    If you already haven't, create your own private docker registry (see registry.md for instructions)
    ```bash
    kubectl describe pod <podname>
    ```

    Then build the hello-node container, and upload the image to your registry
    ```bash
    cd hello-node
    docker build . -t hello-node:v1
    ```

    But wait, how do we deploy the image to our own registry?
    ```bash
    docker tag hello-node:v1 127.0.0.1:<PORT_OF_REGISTRY>/hello-node:v1
    docker push 127.0.0.1:<PORT_OF_REGISTRY>/hello-node:v1
    ```
- Let's try again and update the previous deployment image
    NOTE: see which image we now refer to
    ```bash
    kubectl set image deployment/hello-node hello-node=127.0.0.1:<PORT_OF_REGISTRY>/hello-node:v1  --record

    kubectl rollout status deployment/hello-node
    kubectl describe deployment hello-node
    kubectl get pods --output wide
    ```

- Expose the service so we can access it:

   ```bash
   kubectl expose deployment hello-node --type=NodePort --port=8080 --target-port=8080
   kubectl get services
   kubectl cluster-info
   ```

   Test accessing the service:

  `[MasterPublicIP]:[NodePort]`

- Next you can scale your deployment to 2 replicas:

    ```bash
    kubectl scale deployments/hello-node --replicas=2
    ```

    To list your deployments give command:
    ```bash
    kubectl get deployments
    kubectl describe deployment hello-node
    ```

   Check also if number of Pods have been changed:
    ```bash
    kubectl get pods --output wide
    ```
- Try to make a change to the hello-node source code (e.g. index.html), and deploy it with the tag "v2"

- Check, what replication controllers exist in the cluster, do you understand why?

- Try to rollback to version v1

    ```bash
    kubectl rollout history deployment/hello-node
    kubectl rollout undo deployment/hello-node

    kubectl describe deployment hello-node
    ````

- Delete the service and deployment:

   ```bash
   kubectl delete service,deployment hello-node
   kubectl get pods
   kubectl get services
   ```

# Lesson 2 - Creating pods and deployments by using manifests

Requirements:
  - kubectl installed
  - Docker image for hello-node available.

 Step 1. Add a new manifest file for pod creation in this folder. Give the file a name of your choice. Extension for the file is yaml. Note! Changes to the manifests can be applied without deleting the instance by "kubectl apply -file <manifest_file>".

Syntax of the yaml file is like this:

```bash
apiVersion:
kind:
metadata:
  name:
  labels:
    app:
spec:
  containers:
    - name:
      image:
      ports:
        - containerPort:
```

  This is a simple example for creating pod. You need to define also the other fields when making manifest file for deployment and service.

Step 2. When creating a pod use apiVersion v1, port information is the same 8080 which was used earlier exercise.

Step 3. After you are ready with creating the pod file make a new manifest file for creating a deployment. For deployments you need to use apiVersion extensions/v1beta1.

Step 4. In order to make your application accessible from outside, create one more manifest file for a service.

Step 5. After your manifest files are ready give the command `kubectl apply -f [directory_name e.g. manifest]` which creates your pod, deployment and service. You can also use
command kubectl create -f [your_file].yaml,[your_second_file].yaml,[your_third_file].yaml in manifest folder.

Step 6. Check that service is available (MasterPublicIP:NodePort).

Step 7. Delete the pod created/managed by the deployment, what happens?

Step 8. Delete your pods, deployments and services.  

References:

- Link to Introduction to YAML <https://www.mirantis.com/blog/introduction-to-yaml-creating-a-kubernetes-deployment/>
- Kubernetes Deployments: <https://kubernetes.io/docs/tutorials/k8s201/#deployments>
- Kubernetes Service-objects: <https://kubernetes.io/docs/tutorials/k8s201/#services>

# Lesson 3 - Persistent Volumes

Step 1. Create yaml file for persistent volume:

```bash
kind: PersistentVolume
apiVersion: v1
metadata:
  name: pv01
  labels:
    type: local
spec:
  storageClassName: training
  capacity:
    storage: 10Mi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/tmp/data/mydata"
```

Step 2. Execute create command for persistent volume:

```bash
kubectl create -f <persistent_volume>.yaml
```

Persistent volume type is hostPath which means that it is a file or directory on a single Node cluster to emulate network-attached storage.

Step 3. View persistent volume.

```bash
kubectl get persistentvolume

```

Step 4.Create an index.html file to your kubernetes host inside the hostPath-folder

When using minikube:

```bash
minikube ssh
sudo su
mkdir -p /tmp/data/mydata
echo 'Hello from Kubernetes storage' > /tmp/data/mydata/index.html
```

Step 5. Create yaml file for persistent volume claim.

```bash
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: pv-claim
spec:
  storageClassName: training
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Mi

```  

Step 6. Execute create command for persistent volume claim.

```bash
kubectl create -f <persistent_volume_claim>.yaml
```

Step 7. View persistent volume claim.

```bash
kubectl get pvc
```

Step 8. Create yaml file for Pod using the persistent volume claim.

```bash
kind: Pod
apiVersion: v1
metadata:
  name: pv-pod
  labels:
    app: pv-pod
spec:
  volumes:
    - name: pv-storage
      persistentVolumeClaim:
        claimName: pv-claim
  containers:
    - name: pv-container
      image: nginx
      ports:
        - containerPort: 80
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: pv-storage
```

Step 9. Execute the create command for the Pod using persistent volume claim.

```bash
kubectl create -f <pod_persistent_volume_claim>.yaml
```

Step 10. View Pod using persistent volume claim.

```bash
kubectl get pod pv-pod
```

Step 11. Expose the running pod using kubectl expose command (or by creating a .yaml-file)

Step 12. Open your browser to `http://[MasterPublicIP]:[NodePort]`

Step 13. Try to modify the index.html file again on your kubernetes host machine and see that the content also changes

Step 14. Delete the created resources from your k8s cluster

# Want to try more?
If you like have more exercise with Kubernetes you can check tutorials from https://kubernetes.io/docs/tutorials/
