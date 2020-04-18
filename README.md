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
sudo minikube addons enable metrics-server

kubectl apply -f ./kubernetes-orders-api-test.yaml

$ kubectl expose deployment jmeter-grafana --port=3000 --external-ip=$(minikube ip) --type=NodePort

kubectl expose deployment orders-api-test --type=LoadBalancer --name=my-orders-api

kubectl get services ( externalIP pending )

sudo minikube tunnel ( to simulate LoadBalancer in minikube )
