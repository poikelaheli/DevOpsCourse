# Instructions for the teaching assistant

## Implemented optional features:

Due to timeconstraints I didn't have time to implement any optional features. Additionally some basic features didn't get finished for the same reason. Here are a list of featues that were implemented:
- Load balancing and authentication using nginx
- Request logic for requesting information from the servers and printing that on the screen
- API interface with following endpoints:
    - /run-log
    - /request
    - /state 
        - GET: returns current state
        - PUT: updates state
            - The system has logic got PAUSED and RUNNING states, state management handles other states too, but the system does not respond as fully as expected

## Instructions for examiner to test the system.

The system is listening to two ports:
- Browser user Interface is available from port 8198
- API interface is available from port 8197

The system can be run locally as instructed in the Project instructions

## Data about the platform you used in development

(hardware, CPU architecture, operating
system, version of docker and docker-compose)
- Computer: Lenovo laptop
- Operating system: Ubuntu 22.04
- Docker version: 27.5.0
- Docker compose version: 2.32.4

## Description of the CI/CD pipeline

**Briefly document all steps**

- Version management: 
    - only one branch -> project
- Building tools:
    - Docker runner
- Testing: 
    - jest and supertests
        - testing http requests
    - curl commands
        - testing http requests
- Packing
- Deployment
- Operating; monitoring

## Example runs of the pipeline

Failin test log:

$ echo "Testing state callouts"
Testing state callouts
$ curl -s -S -X PUT http://docker:8197/state -d "PAUSED"
State has been updated. New state: PAUSED$ curl -s -S -X PUT http://docker:8197/state -d "RUNNING"
State has been updated. New state: RUNNING$ curl -s -S -X GET http://docker:8197/state
INIT$ curl -s -S -X GET http://docker:8197/state | ( grep -q "PAUSED")
$ curl -s -S -X GET http://docker:8197/state | ( grep -q "RUNNING")
$ curl -s -S -X GET http://docker:8197/state | ( grep -q "INIT")
$ curl -s -S -X PUT http://docker:8197/state -d "RUNNING"
State has been updated. New state: RUNNING$ curl -s -S -X GET http://docker:8197/state
RUNNING$ curl -s -S -X GET http://docker:8197/state
INIT$ curl -s -S -X GET http://docker:8197/state | ( grep -q "RUNNING")
$ curl -s -S -X GET http://docker:8197/state | ( grep -q "RUNNING")
$ curl -s -S -X GET http://docker:8197/state
INIT$ echo "Testing callouts to paused server"
Testing callouts to paused server
$ curl -s -S -X PUT http://docker:8197/state -d "PAUSED"
State has been updated. New state: PAUSED$ curl -s -S -X PUT http://docker:8197/state -d "PAUSED"
State has been updated. New state: PAUSED$ curl -s -S -X GET http://docker:8197/state
INIT$ curl -f -u "$USERNAME:$PASSWORD" http://docker:8198/request | ( grep -q "")
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
Cleaning up project directory and file based variables
00:04
ERROR: Job failed: exit code 1

Successful test log:



## Reflections

When starting this project I had practically no prior knowledge in how to implement and configure cicd-pipelines. I had used then for other courses, but the used configurations  I did were fairly simple. For that reason learning and troubleshooting were timeconsuming for me. After a lot of trial, error and researching I turned to AI for help in understanding the error messages and helping in configuring mainly the Gitlab runner and gitlab-ci.yaml file. 

The tool I used was Cursor, an editor with a build in AI chat. With prompts like "What does X error mean?" and "Can you explain following command: X" the AI provided explanations and possible solutions or causes for the errors. I found it really helpful in undersanding how to modify the configuration files for my needs and with the given explanations I gained knowledge of both the programming languages I used and the specific parts of the Gitlab cicd pipeline that where challenging for me and which I couldn't figure out with my own research. 

Overall I learned a lot during the project. However it was more timeconsuming than I had expected which resulted in me not finishing all features and having no time for optional ones. 

## Amount effort (hours) used
Approximately 70-80 hours