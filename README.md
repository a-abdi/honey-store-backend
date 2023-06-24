# Honey Store Backend
 store site created with Nodejs, Mongodb.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The site sells products related to beekeeping.
this repository developed backend api. 

Online Site [Honey Store](http://5.75.202.22:4173/)

Online Docs [Honey Docs]( http://5.75.202.22:2000/docs/)

For more information about frontend. see [Honey Store Fronted](https://github.com/a-abdi/honey-store-frontend/)

For more information about Docs. see [Honey Store Swagger](https://github.com/a-abdi/honey-swagger)
	
## Technologies
Project is created with:
* NodejS 
* NestJS
* MongoDB
* TypeScript
* RestApi
* Docker
* Docker-Compose
* Possport
	
## Setup
### To test, enter the admin username and password as follow:
###### User: 09394552776
###### Password: !QAZ1qaz
### To run this project:
#### First, configure .env file, and then choose one of the three options below to run the projec.
* run with docker-compose develop version
```
$ docker-compose -f docker-compose-develop.yaml up --build -d
```
* run with docker-compose in stable version
```
$ docker-compose -f docker-compose-production.yaml up --build -d
```
* run with npm in develop version
```
$ npm run build
$ npm run start:prod
```
