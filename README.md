# generator-rstudio-server

Scaffolds a `Docker` environment for RStudio Development

## Assumptions

It is assumed that you have the following software(s) installed and availible:

- [Node.js | Asynchronous event-driven JavaScript runtime](https://nodejs.org/en/)
- [npm | Node.js Package Manager](https://www.npmjs.com/get-npm)

### Installation and Usage

1. Use npm to install `yo`
    ```bash
    npm install -g yo 
    ```
2. Install `generator-rstudio-server` from source
    ```bash
    npm install -g https://github.com/bcbeidel/generator-rstudio-server
    ```
3. Then within your project folder, generate your new project:
    ```bash
    yo rstudio-server
    ```
4. Answer the generators quesions in the command line
5. Modify the `Dockerfile` or `docker-compose.yml` to meet your needs
6. Build your `Docker` container, and start your `Docker` environment
    ```bash
    docker-compose up --build
    ```
7. Navigate to `http://localhost:8787/` in a browser window and log in with the following credentials
    - user: rstudio
    - pass: rstudio
8. Develop your R code
9. Stop your development environment with `Ctrl + c`

## Resources

- [yeoman | Application Scaffodling Tool](https://yeoman.io/)
- [yo | CLI Tool for running yeoman generators](https://github.com/yeoman/yo)
- [node.js | Asynchronous event-driven JavaScript runtime](https://nodejs.org/en/about/)
- [npm | Node Package Manger](https://www.npmjs.com/get-npm)
- [docker | https://docs.docker.com/](https://docs.docker.com/)
- [docker-compose | A tool for defining and running multi-container Docker applications](https://docs.docker.com/compose/)
- [The Rocker Project | Docker Containers for the R Environment](https://www.rocker-project.org/)
- [renv | The renv package helps you create reproducible environments for your R projects](https://rstudio.github.io/renv/)
