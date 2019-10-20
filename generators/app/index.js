'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path')

var projectName = '';
var baseImage = 'rocker/tidyverse:3.6.0'
var DOCKERIGNORE_NAME = '.dockerignore';
var DOCKERFILE_NAME = 'Dockerfile';
var DOCKERFILE_TEMPLATE = 'Dockerfile.template'
var DOCKERCOMPOSE_NAME = 'docker-compose.yml';

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
                name: 'rocker/rstudio',
                value: 'rocker/rstudio',
              },
              {
                name: 'rocker/rstudio-stable',
                value: 'rocker/rstudio-stable',
              },
              {
                name: 'rocker/tidyverse',
                value: 'rocker/tidyverse',
                default: true
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
              }, {
                name: '3.5.2',
                value: '3.5.2'
              },
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
  }
};
