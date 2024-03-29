# introduction
this is an dummy repository for `bpmn-server` developer test the implementation in nestjs

# Environment
1. mongodb cluster (docker)
2. nodejs 20+
3. nestjs (https://docs.nestjs.com)

Follow next step to run the environment


# setup project
1. setup mongodb cluster with docker
```bash
#create network
docker network create mongoCluster
#prepare node1
docker run -d -p 27017:27017 --name mongo1 --network mongoCluster mongo:6 mongod --replSet myReplicaSet --bind_ip localhost,mongo1
#prepare node2
docker run -d  -p 27018:27017 --name mongo2 --network mongoCluster mongo:6 mongod --replSet myReplicaSet --bind_ip localhost,mongo2
#prepare node3
docker run -d  -p 27019:27017 --name mongo3 --network mongoCluster mongo:6 mongod --replSet myReplicaSet --bind_ip localhost,mongo3


# build cluster
docker exec -it mongo1 mongosh --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"mongo1\"},
   {_id: 1, host: \"mongo2\"},
   {_id: 2, host: \"mongo3\"}
 ]
})"

# set mongod1 high priority as primary server
docker exec -it mongo1 mongosh --eval "cfg = rs.conf()
cfg.members[0].priority = 50
cfg.members[1].priority = 1
cfg.members[2].priority = 1
rs.reconfig(cfg)"

#check cluster status
docker exec -it mongo1 mongosh --eval "rs.status()"
```
2. append this to /etc/hosts
```
127.0.0.1 mongo1 mongo2 mongo3
````
3. git clone and start project
```bash
git clone https://github.com/kstan79/bpmn-server-innest.git
cd bpmn-server-innest
pnpm install 
pnpm run start:dev # leave console open
# if port crash, try change .env
```
4. browse to http://localhost:8000/api#/CAT/runCreate, authorize using xorg: "MC0wLTA", oauth2 empty
5. try create below data via `post /cat`:
```
{
  "categoryCode": "aaa",
  "categoryName": "aaaa", 
  "active": true,
  "categoryType": "class",  
  "description": ""
}
```
6. you may change `categoryCode` avoid uniquekey crash (remain categoryType unchange)


# Elaborate Issue
1. during execute create category api, console appear alot of logs
2. work service start, it show mongodb connection string which is sensitive

# Code Tracking
1. workflow init via hook category `beforeCreate`, store at `src/simpleapp/services/cat.service.ts`
3. the startWorkflow execute `event2` at nestjs framework, then it trigger workflow service `startWorkflow()` at `src/simpleapp/generate/workflow/workflow.service.ts`
4. the bpmnserver instance initiated at `constructor`, in `src/simpleapp/generate/workflow/workflow.service.ts`
5. the config of bpmn at `workflow.config.ts` in same folder
6. I can't hide logs at constructor in `workflow.service.ts`.

** if u feel interested on where is the bpmn and executor, you may check:
  `src/simpleapp/workflows/bpmn` and `src/simpleapp/workflows/listeners`

