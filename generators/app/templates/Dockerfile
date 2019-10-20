# Dockerfile
FROM <%= baseImage %>:<%= rVersion %>

MAINTAINER <%= maintainerName %> "<%= maintainerEmail %>"

# Set Environment Variables
ENV PROJECT_NAME <%= projectName %>
ENV PROJECT_DIRECTORY /home/rstudio/<%= projectName %>
ENV RENV_VERSION <%= renvVersion %>

# Provide some basic labels for the image
LABEL org.label-schema.vendor="<%= orgName %>" \
      org.label-schema.url="<%= orgURL %>>" \
      org.label-schema.name="<%= projectName %>" \
      org.label-schema.description="<%= projectDescription %>" \    
      org.label-schema.version="<%= projectVersion %>" \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.docker.schema-version="1.0" 

WORKDIR ${PROJECT_DIRECTORY}

# Set base repos to `rvcran` and CRAN
RUN R -e "options(repos = c(CRAN = 'https://cloud.r-project.org'), warn = 2);" 

# If installed, deactivate `renv`.  This prevents issue with the shim for `install.packages()`
RUN Rscript - e "if('renv' %in% rownames(installed.packages()) == TRUE) {renv::deactivate()}"

# Install `remotes` and `renv`
RUN R -e "install.packages('remotes', repos = c(CRAN = 'https://cloud.r-project.org'))"
RUN R -e "remotes::install_github('rstudio/renv@${RENV_VERSION}'); library(renv);"

COPY ./renv.lock .
RUN R -e 'renv::consent(provided = TRUE);'
RUN R -e "renv::restore(library = '/usr/lib/R/site-library');"

CMD ["/init"]
