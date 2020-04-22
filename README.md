# Orders-Api
This project contains a REST API developed in NodeJs to manage customer data for a small shop. 

The API implement  two  endpoints:  
* One to place an order 
* Another one to read an order given an ID

## Starting 🚀
_These instructions allow you to have the project running in your local machine for developing and testing purposes_

Clone this repository

The repository is structured in the next folders
* **.circleci** - contains CircleCI Continuous Integration and Continuous Deployment yaml
* **src**
    * **api**   - contains API code
    * **application** - contains the code of use cases
    * **business** - business lawyer
    * **persistence** - contains write-model repository code
    * **queries** - contains the readmodel queries
    * **tests** - contains tests
    * **utils** - contains helpers
* **examples** - contains Postman collection with API requests examples
* **images** - contains the images used in this document

The project entrypoint is the file ***src/server.ts***

### Pre-requisites 📋

_What do you need installed previously and how_
- [Node.js v12.16.1 LTS or later](https://nodejs.org/es/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [Docker](https://www.docker.com/products/docker-desktop) optional
- [Docker-Compose](https://docs.docker.com/compose/install/) optional
- [Minikube](https://kubernetes.io/es/docs/tasks/tools/install-minikube/) optional
- [Apache JMeter](http://jmeter.apache.org/download_jmeter.cgi) for loading tests
- [MongoDB Atlas](https://cloud.mongodb.com/v2/5e54fbad6c2a64558dcfbc81#clusters) Cloud MongoDB service for "production" database


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
# or
npm install
```

Finally, starts the API  

```bash
npm start
# or
npm run dev # for hot reloading
```

By default the API is listening in the port 3000. You can configure it in the file **.env** placed in the root folder.

The API is authenticated with OAuth2 flow using [Okta](https://www.okta.com/) as authorization's token provider.

In order to obtain a valid token you can use Postman or similar program to require a token specifying the next client credentials

* Access token url: https://dev-697175.okta.com/oauth2/default/v1/token
* ClientID: **0oa35a16zxMyF9QXk4x6**
* ClientSecret: **1ZUsLj2hK66pKyx2Irqock0TkaiaL9UQJO1fIBKk**
* Scope: **orders-api**
* Grant Type: **Client Credentials**

You can find attached an example using Postman

![Authorization](images/authorization%20credentials.PNG)

## Running the tests ⚙️

_How run the tests_

### Unit and Integration tests
The tests are placed inside the folder **src/tests**

For run them execute the command

```bash
npm run test
```
### Loading tests
Additionally, exists a **JMeter** project containing API **loading tests**. To run it, open the JMeter IDE executing bin/jmeter.bat inside the jmeter installation folder.
After that, open the file **src/tests/LoadTests.jmx**, configure the **ServerName or IP** and **Port** for the Http Requests **Get Order** and **Create Order** if it is necessary and finally, execute it.

You can run the tests from command line too executing
```bash
jmeter -n -t src/tests/LoadTests.jmx -l /path/to/results/file.jtl
```
## Deployment 📦

_Add additional notes about the deployment_

The Orders API Continuous Integration is running in CircleCI [![CircleCI](https://circleci.com/gh/adalvega78/orders-api.svg?style=svg&circle-token=8e739bcf6affc98f4982f1896da2740635858424)](https://circleci.com/gh/adalvega78/orders-api) triggered on each push to master branch.

Additionally, when the CI finish successfully, the API have configured Continuous Deployment on Azure Kubernetes Services, accessible in the uri [Azure Orders API](http://my-orders-api.d2e77c3c873f4da0b8d7.eastus.aksapp.io/docs/)

You can find the pipeline inside the folder **.circleci**

### Docker
For build manually the API image and container without use docker-compose you can execute the next commands

```bash
docker build . -t orders-api
docker run --name=orders-api-instance -p 8080:3000 orders-api -d
```
After that the API should be exposed in the uri [http://localhost:8080](http://localhost:8080).

In this case, MongoDB container is not configured, so you must configure the environment variable **MONGODB_URI** 
to connect with MongoDB Cloud database.

A command example is

```bash
docker run --name=orders-api-instance -p 8080:3000 -e "MONGODB_URI=mongodb+srv://testDbUser:mxnROwuOZ9HpllKD@cluster0-wojvy.mongodb.net/test?retryWrites=true&w=majority" orders-api -d 
```

### Docker-Compose
You can run a full devops stack with API and MongoDB containers running then commands

```bash
docker-compose up -d # start the containers

docker-compose down # stop the containers
```
### Kubernetes (Minikube)
Additionally you can deploy the API in a kubernetes cluster.

For simulate the cluster in a local machine you can use minikube.

```bash
minikube start
# activate the metrics
minikube addons enable metrics-server
# create deployment, pod and service
kubectl apply -f ./minikube-orders-api-test.yaml

# get services running in cluster and default namespace
kubectl get services # externalIP pending

# to expose service in local machine and obtain a valid external IP
# we have configured the LoadBalancer type but minikube not support it
# You can simulate this behaviour executing the command
minikube tunnel
```

If kubectl can not pulling the images from private repository, we must configure the credentials for kubectl running the command

```bash
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
```
If the **.docker/config.json** not exists, run the command
```bash
docker login
```
to create it.

## Other considerations :blush:
The API is auto documented with **Swagger** and the documentation endpoint is exposed in **/docs** route. For example
```
http://localhost:3000/docs
```
The OAuth2 acces token flow is configured, but swagger-ui-express is ignoring [**usePkceWithAuthorizationCodeGrant**](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/oauth2.md) setting, adding *Origin* header in the request, so Okta provider is returning an error related with *Proof Key for Code Exchange*.

You can find a Postman collection with valid API requests inside the **examples** folder in the repository root path.

For real production environment, we must configure Kubernetes Ingress service with Let´s Encrypt certificate generation exposing the API in secure protocol HTTPS.

## Build with 🛠️
_Tooling used to create the project_

* [Visual Studio Code](https://code.visualstudio.com/) - IDE
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) - Dependences manager

## Contributing 🖇️
To contribute, please create a new branch from `master` origin and later, create a pull request in order to merge the new branch to  `master` again.

- In the folder [sequenceDiagrams](./sequenceDiagrams) you can find the source of the next sequence diagrams showing the code organization and relationships.

##### FindOrderById

![FindOrderById](images/findOrderByIdSequenceDiagram.PNG)

##### PlaceOrder
![PlaceOrder](images/placeOrderSequenceDiagram.PNG)

Template de README.md ❤️ by [Villanuevand](https://gist.github.com/Villanuevand/6386899f70346d4580c723232524d35a) 😊