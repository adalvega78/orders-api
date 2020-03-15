# orders-api
test repository


DockerFile

docker build . -t orders-api
docker run --name=orders-api-instance -p 8080:3000 orders-api

DockerCompose

docker-compose up -d 

docker-compose down

Kubernetes -> minikube

sudo minikube start
kubectl apply -f ./kubernetes-orders-api-test.yaml

kubectl expose deployment ordres-api-test --type=LoadBalancer --name=my-orders-api

kubectl get services ( externalIP pending )

sudo minikube tunnel ( to simulate LoadBalancer in minikube )
