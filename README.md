# generator-rstudio-server

Creates a set of files that allow for RStudio development within a local Docker container.

### Installation and Usage

1. Use npm to install `yo`
2. Install `generator-rstudio-server` from source
    ```bash
    npm install -g yo 
    npm install -g git+ssh://git@github.com/bcbeidel/generator-rstudio-server
    ```
3. Then within your project folder, generate your new project:
    ```bash
    yo rstudio-server
    ```
4. Answer the generators required questions
5. Modify the `Dockerfile` to meet your needs
6. Build your docker container, and start your `Docker` environment
    ```bash
    docker-compose up --build
    ```
7. Navigate to `http://localhost:8787/` in a browser window and log in with the following credentials
    - user: rstudio
    - pass: rstudio
8. Develop your R code
9. Stop your development environment with `Ctrl + c`

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).