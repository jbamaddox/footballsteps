docker build -t jeremybamaddox/footballsteps-client:latest -t jeremybamaddox/footballsteps-client:$SHA -f ./football-steps-client/Dockerfile ./football-steps-client
docker build -t jeremybamaddox/footballsteps-api:latest -t jeremybamaddox/footballsteps-api:$SHA -f ./football-steps-api/Dockerfile ./football-steps-api
docker build -t jeremybamaddox/footballsteps-simulations:latest -t jeremybamaddox/footballsteps-simulations:$SHA -f ./footballsteps-simulations/Dockerfile ./footballsteps-simulations
docker push jeremybamaddox/footballsteps-client:latest
docker push jeremybamaddox/footballsteps-api:latest
docker push jeremybamaddox/footballsteps-simulations:latest
docker push jeremybamaddox/footballsteps-client:$SHA
docker push jeremybamaddox/footballsteps-api:$SHA
docker push jeremybamaddox/footballsteps-simulations:$SHA
kubectl apply -f ./kubernetes
kubectl set image deployments/api-deployment api=jeremybamaddox/footballsteps-api:$SHA
kubectl set image deployments/client-deployment client=jeremybamaddox/footballsteps-client:$SHA
kubectl set image deployments/simulations-deployment simulations=jeremybamaddox/footballsteps-simulations:$SHA