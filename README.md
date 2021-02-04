# Linux and MacOS installation
Install the following software through the following links or by using your favorite package manager:
- Docker Desktop (https://www.docker.com/products/docker-desktop)
- Minikube (https://minikube.sigs.k8s.io/docs/start/)
- Docker Compose (https://docs.docker.com/compose/install/)

# Windows installation

## Chocolatey
Instructions from: <https://chocolatey.org/docs/installation>
1. Open PowerShell as adminstrator (“Run as administrator”)
2. Run: `Get-ExecutionPolicy`
if restricted -> `Set-ExecutionPolicy Bypass -Scope Process`
3. `Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1’))`
4. Test: `choco list --local-only`

## Using Docker Toolbox
1. disable hyperV
    - https://www.poweronplatforms.com/enable-disable-hyper-v-windows-10-8/

2. Install everything
    `choco install --yes git.install rsync docker docker-machine virtualbox vagrant kubernetes-helm kubernetes-cli notepadplusplus docker-compose`

3. Setup Docker Machine
    - open Git Bash
    - Create docker-machine:

        ```bash
        docker-machine create --driver virtualbox dev
        docker-machine ls
        docker-machine ssh dev
        Exit
        ````

    - Connect your docker-cli with the docker-machine you created. See instructions: `docker-machine env dev`
       - remember to run the eval!!!
    - verify your installation `docker run hello-world`

4. Install Minikube
    - https://github.com/kubernetes/minikube
    - VT-x or AMD-v virtualization must be enabled in your computer’s BIOS.
    - Download <https://storage.googleapis.com/minikube/releases/latest/minikube-windows-amd64.exe> and rename to minikube.exe
    - add it to your path
        - <https://www.computerhope.com/issues/ch000549.htm>
    - open Git Bash and run `minikube start`

## Tip

Do not use IE, use Chrome instead. IE has problems accessing exposed docker containers.