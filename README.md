# Honey Store Backend
 store site created with Nodejs, Mongodb.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The site sells products related to beekeeping.
this repository developed backend api. 

###### Admin User: 09394552776
###### Admin Password: !QAZ1qaz
#### Admin Link: [http://5.75.202.22:4173/admin/login](http://5.75.202.22:4173/admin/login)

#### Demo: [http://5.75.202.22:4173/](http://5.75.202.22:4173/)

#### Swagger Demo: [http://5.75.202.22:2000/docs/]( http://5.75.202.22:2000/docs/)

#### Frontend Repo: [Honey Store Fronted](https://github.com/a-abdi/honey-store-frontend/)

#### Swagger Repo [Honey Store Swagger](https://github.com/a-abdi/honey-swagger)
	
## Technologies
* NodejS 
* NestJS
* MongoDB
* TypeScript
* RestApi
* Docker
* Docker-Compose
* Possport
	
## Setup
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
