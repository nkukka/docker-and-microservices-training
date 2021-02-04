# Helm+services


```
helm init
helm search
helm list
helm install
helm delete
```

1. Familiarize yourself with <https://github.com/kubernetes/helm/tree/master/docs/examples/nginx>

2. Open new Git Bash window

3. Clone the repo
    ```
    git clone https://github.com/kubernetes/helm.git
    cd helm
    ```

4. Install the nginx-example
    ```
    helm install docs/examples/nginx --set service.type=NodePort
    ```
5. verify the installation
    ```
    helm list
    helm status <release-name>
    ```
open browser to <kube-machine>:<NodePort>


6. What version of nginx are we actually running?
    Hint: it is visible e.g. in the deployment yaml

7. Does this match to the default version defined in <https://github.com/kubernetes/helm/tree/master/docs/examples/nginx>
    HINT: yes

8. Lets upgrade to a newer nginx version:
    ```
    helm upgrade <helm-release-name> docs/examples/nginx --set service.type=NodePort --set image.tag=1.15
    ```

Verify that 1.15 is actually running

9. Try to list the release revision history for your nginx installation
- Hint, run `helm` to see available commands

10. Try to upgrade and change the content of the served html

11. Make a rollback

12. Create another separate nginx-deployment using helm and check that two separate nginx-setups are up and running

13. clean up the environment using helm
