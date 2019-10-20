'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path')

var projectName = '';
var rVersion = '';
var baseImage = '';

var DOCKERIGNORE_NAME = '.dockerignore';
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

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What do you want to name your project?',
            default: process.cwd().split(path.sep).pop().toLowerCase()
        },
        {
            type: 'list',
            name: 'baseImage',   
            message : 'What base image would you like to use?',
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
              {
                name: '3.6.0',
                value: '3.6.0',
                default: true
              }, {
                name: '3.5.3',
                value: '3.5.3'
              }
            ]
        },
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(DOCKERFILE_TEMPLATE_NAME),
      this.destinationPath(DOCKERFILE_NAME),
      {
        projectName: this.answers.projectName,
        baseImage: this.answers.baseImage,
        rVersion: this.answers.rVersion
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

      this.fs.copyTpl(
        this.templatePath(README_TEMPLATE_NAME),
        this.destinationPath(README_TEMPLATE_NAME),
        {
            projectName: this.answers.projectName
        }
      );
  }
};
