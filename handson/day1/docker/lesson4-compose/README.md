# Dockerizing chat application
Derived from https://github.com/eficode/socket.io-example

For boring people, you can cheat and copy the solution from there. But don't be boring.

# Combining containers with docker-compose
Docker-compose is a tool that can be used for connecting containers together.

Start by navigating into project root. If you type `ls` you should now see frontend and backend directories, if not, you are in a wrong directory.)

Create a new file: docker-compose.yml with command

    nano docker-compose.yml

You can start with this template (line indentation does matter)

    version: '2'

    services:
        backend:
            build: backend

        frontend:
            build: frontend

It defines two services, frontend and backend, and determines build sections for those.

If you save the file with *ctrl+o* and run command

    docker-compose build

You should see it building the containers you created in previous step.

But let's open the file again with nano and add needed stuff there

## Database
Our chat application uses Postgresql-database to store its data. Luckily there exists ready-made image for this database: https://hub.docker.com/_/postgres/

* Add a new service into docker-compose.yml, let's call it db
* Instead of building it, use a ready made postgresql image. [image](https://docs.docker.com/compose/compose-file/#image)
* Postgresql image contains some logic to initialize the database. For this example, let's define everything from username to database created be "chat" [environment](https://docs.docker.com/compose/compose-file/#environment)
    - POSTGRES_DB: chat
    - POSTGRES_PASSWORD: chat
    - POSTGRES_USER: chat
* Add dependency for database container into backend container's definition. [depends_on](https://docs.docker.com/compose/compose-file/#depends_on)

## Connecting database to backend
Backend needs to know, how to connect to database.

* It wants to know environmental variable **DATABASE_URL** with format of **postgres://\<user\>:\<password\>@\<database address\>/\<database name\>**
    - in our case, that means `postgres://chat:chat@db/chat`
    - notice the address being db. It's the same as the database service's name

* When the backend is starting up, it also expects database to be up and listening. Having depends_on attribute doesn't mean that the database is actually responding, so we have included helper script to wait for database to start responding.
    - You can use it by specifying backend container's [command](https://docs.docker.com/compose/compose-file/compose-file-v2/#command) attribute to be `./wait-for db:5432 -- npm run dev`

## Rest of backend and frontend
We now have database configured and backend instructed on how to connect into it. We still need some configuration for backend and frontend

* Both, backend and frontend need one port to be exposed. [ports](https://docs.docker.com/compose/compose-file/#ports)
    * For frontend, it is **8000**
    * For backend, it is **9000**
* Frontend is a service that serves some javascript blob for the browser to execute. That blob includes address that browser can use to connect into another service: the backend. So in that sense, frontend and backend are not interconnected.
    - Frontend needs environmental variable *ENDPOINT* that points into address where the backend is listening.
    - For example `ENDPOINT: http://1.2.3.4:9000`
    - In our case, we want to use the ip of our server as a endpoint.
    - `ENDPOINT: http://<server ip here>:9000`

# Using docker-compose
Now save the file with *ctrl+o*

You should now be able to build and start the project with commands

    docker-compose build
    docker-compose up -d

After that, head to http://\<you machine ip\>:8000 to verify that your setup is working.

If it isn't, you can look into logs to see if there is some problem

    docker-compose logs backend
    docker-compose logs dev
    docker-compose logs db

When you want to shutdown your project, you can issue

    docker-compose down

# Data persistance
You have now packaged the application successfully, started it and stopped it with docker-compose.

Let's do a one test: ensure the application is not running:

    docker-compose down
    docker ps

`docker ps` -command should not list any running containers.

Now start the application again

    docker-compose up -d


If you now navigate to the application with your browser, all your messages are gone! (or atleast they should be) But wouldn't it be great to have the messages persist?

## Volumes
To have data persist, even when the container itself is destroyed, we can use volumes.

If we look at the postgresql container's documentation, we can see that it stores the database inside container in path `/var/lib/postgresql/data`

One way to have this data persist, is to mount it from host machine into container. When container is removed, the files remain in the machine that is running docker.

Create a named volume called `dbdata` that is then mounted inside the postgresql container into path `/var/lib/postgresql/data` by specifying it as a [volume](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes) in docker-compose.yml.

Now restart the containers once with this command, it will mount the volume.

    docker-compose down
    docker-compose up -d

Try to write some messages into the application, run the command above again, and no data should be lost.