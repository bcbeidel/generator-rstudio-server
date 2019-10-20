# Dockerfile
FROM <%= baseImage %>:<%= rVersion %>

# Set Environment Variables
ENV PROJECT_NAME <%= projectName %>

LABEL author="<%= authorName %> (<%= authorEmail %>)" \
      title="<%= projectName %>" \
      description="Development Environment For <%= projectName %> Project" 

WORKDIR /home/rstudio/<%= projectName %>

# Set base repos to `rvcran` and CRAN
RUN R -e "options(repos = c(CRAN = 'https://cloud.r-project.org'))"

# If installed, deactivate `renv`.  This prevents issue with the shim for `install.packages()`
RUN Rscript - e "if('renv' %in% rownames(installed.packages()) == TRUE) {renv::deactivate()}"

# Install `remotes` and `renv`
RUN Rscript -e 'install.packages("remotes"); library(remotes);'
RUN Rscript -e 'remotes::install_github("rstudio/renv"); library(renv)'

COPY ./renv.lock .
RUN Rscript -e 'renv::consent(provided = TRUE)'
RUN Rscript -e 'renv::hydrate()'

CMD ["/init"]
