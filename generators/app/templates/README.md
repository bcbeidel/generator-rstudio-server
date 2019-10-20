# <%= projectName %>

## Development

For development environment consistency, a `Docker` environment has been created.  To access this environment you can use `docker-compose` commands to spin the environment up or down.  The required commands have been consolidated into the following shell scripts.  To start an environment run:

```bash
docker-compose up --build
```

Then you can navigate to `http://localhost:8787/` and log-in to an RStudio server instance with the username and password specified in the `docker-compose.yml`.   While developing, it is highly recommended you use `renv` to manage your packages, and take advantage of the globally shared cache on your system.


To stop the container press `ctrl + C`. Once stopped, clean up your resources with:

```bash
$ docker-compose down
```