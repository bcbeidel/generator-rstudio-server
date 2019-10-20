'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

var DOCKERFILE_NAME = 'Dockerfile';
var DOCKERFILE_TEMPLATE_NAME = 'Dockerfile'

var DOCKERCOMPOSE_NAME = 'docker-compose.yml';
var DOCKERCOMPOSE_TEMPLATE_NAME = 'dockerfile-compose.yml';

var RENVLOCK_NAME = "renv.lock"
var RENVLOCK_TEMPLATE_NAME = "renv.lock"

var RPROFILE_NAME = ".Rprofile"
var RPROFILE_TEMPLATE_NAME = ".Rprofile"

var README_NAME = "README.md"
var README_TEMPLATE_NAME = "README.md"

var CURRENT_FOLDER = process.cwd().split(path.sep).pop().toLowerCase()

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What do you want to name your project?',
            default: CURRENT_FOLDER
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: 'What does your project do?',
            default: "Dockerized Rstudio Development Environment for " + CURRENT_FOLDER
        },
        {
            type: 'input',
            name: 'projectVersion',
            message: 'What is the current version number of your project?',
            default: "1.0.0"
        },
        {
            type: 'input',
            name: 'orgName',
            message: 'What is your organization`s name?',
            store: true
        },
        {
            type: 'input',
            name: 'orgURL',
            message: 'What is your organization`s url?',
            store: true
        },
        {
            type: 'input',
            name: 'maintainerName',
            message: 'What is your name?',
            default: this.user.git.name()
        },
        {
            type: 'input',
            name: 'maintainerEmail',
            message: 'What is your email?',
            default: this.user.git.email()
        },
        {
            type: 'list',
            name: 'baseImage',   
            message : 'What docker image would you like to use?',
            choices: [
              {
                name: 'rocker/tidyverse',
                value: 'rocker/tidyverse',
                default: true
              },
              {
                name: 'rocker/rstudio',
                value: 'rocker/rstudio',
              },
              {
                name: 'rocker/rstudio-stable',
                value: 'rocker/rstudio-stable',
              },
  
            ]
        },
        {
            type: 'list',
            name: 'rVersion',   
            message : 'What version of R would you like to use?',
            choices: [
              "3.6.0",
              "3.5.3",
              "3.5.2",
              "3.5.1",
              "3.5.0",
              "3.4.4",
              "3.4.3",
              "3.4.2",
              "3.4.1",
              "3.4.0",
              "3.3.3",
              "3.3.2",
              "3.3.1",
              "3.3.0",
              "3.2.5",
              "3.2.4",
              "3.2.3",
              "3.2.2",
              "3.2.1",
              "3.2.0",
              "3.1.3",
              "3.1.2",
              "3.1.0"
            ]
        },
        {
            type: 'list',
            name: 'renvVersion',   
            message : 'What version of `renv` would you like to use?',
            choices: [
              "master",
              "0.7.1-20",
              "0.7.1-19",
              "0.7.1-18",
            ]
      },
    ]);
  }

  writing() {

    this.fs.copyTpl(
        this.templatePath(README_TEMPLATE_NAME),
        this.destinationPath(README_TEMPLATE_NAME),
        {
            projectName: this.answers.projectName,
            projectDescription: this.answers.projectDescription,
        }
    );

    this.fs.copyTpl(
      this.templatePath(DOCKERFILE_TEMPLATE_NAME),
      this.destinationPath(DOCKERFILE_NAME),
      {
        baseImage: this.answers.baseImage,
        rVersion: this.answers.rVersion,
        renvVersion: this.answers.renvVersion,
        maintainerName: this.answers.maintainerName,
        maintainerEmail: this.answers.maintainerEmail,
        orgName: this.answers.orgName,
        orgURL: this.answers.orgURL, 
        projectName: this.answers.projectName,
        projectDescription: this.answers.projectDescription,
        projectVersion: this.answers.projectVersion    
      }
    );

    this.fs.copyTpl(
      this.templatePath(DOCKERCOMPOSE_TEMPLATE_NAME),
      this.destinationPath(DOCKERCOMPOSE_NAME),
      {
        projectName: this.answers.projectName
      }
    );

    this.fs.copyTpl(
        this.templatePath(DOCKERCOMPOSE_TEMPLATE_NAME),
        this.destinationPath(DOCKERCOMPOSE_NAME),
        {
          projectName: this.answers.projectName
        }
      );

      this.fs.copyTpl(
        this.templatePath(RENVLOCK_TEMPLATE_NAME),
        this.destinationPath(RENVLOCK_NAME),
        {
            rVersion: this.answers.rVersion
        }
      );

      this.fs.copy(
        this.templatePath(RPROFILE_NAME),
        this.destinationPath(RPROFILE_NAME),
      );

  }

  end(){
    this.log('\nYour project is now ready to run in a Docker container!');
    this.log('Run ' + chalk.green("docker-compose up --build") + ' to start RStudio.');
    this.log('Once started, navigate to ' + chalk.green("http://localhost:8787") + ' in any browser.');
    this.log('Access the RStudio with the following credentials:')
    this.log('\tUSERNAME: ' + chalk.green("rstudio"));
    this.log('\tPASSWORD: ' + chalk.green("rstudio") + '\n');
  }
};
