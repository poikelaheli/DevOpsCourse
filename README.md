# Instructions for the teaching assistant

## Implemented optional features:

There are no optiona features implemented

## Instructions for examiner to test the system.

The system is listening to two ports:
- Browser user Interface is available from port 8198
- API interface is available from port 8197

## Data about the platform you used in development

(hardware, CPU architecture, operating
system, version of docker and docker-compose)
- Computer: Lenovo laptop
- Operating system: Ubuntu 22.01
- Docker version: 27.5.0
- Docker compose version: 2.32.4

## Description of the CI/CD pipeline

**Briefly document all steps**
Version management: 
- only one branch -> project
Building tools:
- Docker runner
Testing; tools and test cases
Packing
Deployment
Operating; monitoring

## Example runs of the pipeline

Include some kind of log of both failing test and passing.

## Reflections

CICD-pipelines were really new for me at the start of the project. I had very little prior knowledge in them.For that reason learning and troubleshooting were timeconsuming for me. After a lot of trial and error and researching I turned to AI for help in understanding the error messages and helping in configuring mainly the Gitlab runner and gitlab-ci.yaml file. 

The tool I used was Cursor, an editor with a build in AI chat. With prompts like "What does X error mean?" and "Can you expalin following command: x" the AI provided explanations and possible solutions or causes of the errors. I found it really helpful in undersanding how to modify the configuration files for my needs and with the given explanations I gained knowledge of both the programming languages I used and the specific parts of the Gitlab cicd pipeline that where challenging for me and which I couldn't figure out with my own research. 

Overall I learned a lot during the project. However it was more timeconsuming than I had expected which resulted in 
me not finishing all features and having no time for optional features. 

Main learnings and worst difficulties
Especially, if you think that something should have been done differently, describe it here.

## Amount effort (hours) used
Approximately 60-70 hours