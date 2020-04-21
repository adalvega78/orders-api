# Orders-Api
This project contains a REST API developed in NodeJs to manage customer data for a small shop. 

The API implement  two  endpoints:  
* One to place an order 
* Another one to read an order given an ID

## Starting 🚀
_These instructions allow you to have the project running in your local machine for developing and testing purposes_

Clone this repository

The repository is structured in the next folders
* **.circleci** - contains CircleCI CI and CD yaml
* **src**
    * **api**   - contains API code
    * **application** - contains the code of use cases
    * **business** - business lawyer
    * **persistence** - contains write-model repository code
    * **queries** - contains the readmodel queries
    * **tests** - contains tests
    * **utils** - contains helpers

The entrypoint is the file ***src/server.ts***

### Pre-requisites 📋

_What do you need installed previously and how_
- [Node.js v12.16.1 LTS or later](https://nodejs.org/es/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker-Compose](https://docs.docker.com/compose/install/)

If you prefer **NPM** as package manager you can ignore the ***Yarn*** installation.

### Installation 🔧
_Step by step examples to have a develop environment running_

The API uses MongoDB to persist the orders created.

For developing you can get a local MongoDb instance running 

```
-- login in docker hub images repository
docker login
-- getting a mondodb image and starting a local container
docker-compose up -d
-- you can stop the containers running
docker-compose down
```
Docker-Compose starts a container with the Orders API listening in the port **8080**, too ([API documentation](http://localhost:8080/docs/))

If you want change the port, edit the file **docker-compose.yml** placed in the repository root folder and modify the ports section.

```yml
    ports:
      - "8080:3000"
```
But if really you want contribute to the project, you must install the project dependences. 
Open a console, move to the repository root folder and run the command

```bash
yarn install
npm install
```

Finally, starts the API  

```bash
npm start
or
npm run dev -- hot reloading
```

By default the API is listening in the port 3000. You can configure it in the file **.env** placed in the root folder.

## Running the tests ⚙️

_How run the tests_

The tests are placed inside the folder **src/tests**

For run them execute the command

```bash
npm run test
```

## Deployment 📦

_Add additional notes about the deployment_

The Orders API Continuous Integration is running in CircleCI [![CircleCI](https://circleci.com/gh/adalvega78/orders-api.svg?style=svg&circle-token=8e739bcf6affc98f4982f1896da2740635858424)](https://circleci.com/gh/adalvega78/orders-api) triggered on each push to master branch.

Additionally, when the CI finish successfully, the API have configured Continuous Deployment on Azure Kubernetes Services, accessible in the uri [Azure Orders API](http://my-orders-api.d2e77c3c873f4da0b8d7.eastus.aksapp.io/docs/)

On the other hand

You can find the pipeline inside the folder **.circleci**

DockerFile

docker build . -t orders-api
docker run --name=orders-api-instance -p 8080:3000 orders-api

DockerCompose

docker-compose up -d 

docker-compose down

Kubernetes -> minikube

sudo minikube start
sudo minikube addons enable metrics-server

kubectl apply -f ./kubernetes-orders-api-test.yaml

$ kubectl expose deployment jmeter-grafana --port=3000 --external-ip=$(minikube ip) --type=NodePort

kubectl expose deployment orders-api-test --type=LoadBalancer --name=my-orders-api

kubectl get services ( externalIP pending )

sudo minikube tunnel ( to simulate LoadBalancer in minikube )

-->
Separar los yaml
->
url donde está el servicio CD

http://my-orders-api.d2e77c3c873f4da0b8d7.eastus.aksapp.io/docs/ 


Token
https://dev-697175.okta.com/oauth2/default/v1/token


## Build with 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [AspNetCore 3.1](https://docs.microsoft.com/es-es/aspnet/core/?view=aspnetcore-3.1) - El framework web usado
* [NuGet](https://www.nuget.org/) - Manejador de dependencias

## Contributing 🖇️

Para contribuir, deberás sacar una nueva rama de `master` para hacer tus cambios y posteriormente una Pull Request de esa rama hacia `master`. El equipo **Cross Cutting** tratará de revisarla en cuanto le sea posible.

- En la carpeta [SequenceDiagrams](./SequenceDiagrams) podrás encontrar diagramas de flujo para entender internamente la organización del código.

## Versioned 📌

Usamos [SemVer](http://semver.org/) para el versionado. En el [CHANGELOG.md](./CHANGELOG.md) podrás ver las distintas versiones así como sus changelogs.

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* etc.


Template de README.md ❤️ por [Villanuevand](https://gist.github.com/Villanuevand/6386899f70346d4580c723232524d35a) 😊