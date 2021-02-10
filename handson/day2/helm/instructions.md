# Helm
In this exercise you will install Odoo, an open source ERP and CRM software on you Kubernetes cluster.

1. Familiarize yourself with <https://helm.sh/docs/intro/quickstart/#install-an-example-chart> as well as <https://helm.sh/docs/intro/using_helm/>.
    
    The most important Helm commands are as follows:

    ```
    helm search
    helm list
    helm install
    helm uninstall
    ```

2. Open a new terminal or a Git Bash window

3. Add the bitnami repository to Helm
    ```
    helm repo add bitnami https://charts.bitnami.com/bitnami

    ```

4. Install the Odoo chart
    ```
    helm install odoo bitnami/odoo --set serviceType=NodePort
    ```
    Note that the LoadBalancer service created on a cluster running on minikube will never leave the pending state, since it cannot get an external IP.
5. Monitor the installation progress:
    ```
    kubectl get pods,deployments,services
    kubectl logs <pod-name>
    ```    

6. verify the installation
    ```
    helm list
    helm status <release-name>
    ```
    open browser to kube-machine:NodePort
