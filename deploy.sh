docker build -t jeremybamaddox/footballsteps-client:latest -t jeremybamaddox/footballsteps-client:$SHA -f ./football-steps-client/Dockerfile ./football-steps-client
docker build -t jeremybamaddox/footballsteps-api:latest -t jeremybamaddox/footballsteps-api:$SHA -f ./football-steps-api/Dockerfile ./football-steps-api
docker build -t jeremybamaddox/footballsteps-simulations:latest -t jeremybamaddox/footballsteps-simulations:$SHA -f ./football-steps-simulations/Dockerfile ./football-steps-simulations
docker push jeremybamaddox/footballsteps-client:latest
docker push jeremybamaddox/footballsteps-api:latest
docker push jeremybamaddox/footballsteps-simulations:latest
docker push jeremybamaddox/footballsteps-client:$SHA
docker push jeremybamaddox/footballsteps-api:$SHA
docker push jeremybamaddox/footballsteps-simulations:$SHA
kubectl apply -f ./kubernetes
kubectl set image deployment/api-deployment api=jeremybamaddox/footballsteps-api:$SHA
kubectl set image deployment/client-deployment client=jeremybamaddox/footballsteps-client:$SHA
kubectl set image deployment/simulations-deployment simulations=jeremybamaddox/footballsteps-simulations:$SHA