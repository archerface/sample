# Sample App - Simple Account creation / log in

For a sample application, I decided to throw together a somewhat simple Yarn/Webpack/Typescript/React/NodeJs/Docker/MongoDb app. The general functionality of the app is a web page that allows you to create an accout or log in. Once either of those actions have been taken, the user will be logged in for the next 12 hours or until they log out.

The build tools assume that you are using Yarn as your package manager. You can find information on how to set that up [here](https://classic.yarnpkg.com/en/docs/install).

_Side Note_: The log out functionality currently has a bug on the server. Some headers are being set on the Response after it is sent. I need to dig into what is setting those headers.

## Code Structure

### Source Code

```text
src/
  client/
    components/
    utils/
    index.tsx
  server/
    routes/
    models/
    controllers/
    utils/
    index.ts
```

The source code is all in Typescript and for the client side React.js with JSX. This requires a build step. So Webpack has been set up to compile the client and server code into their respective bundles in the following structure:

```text
dist/
  client/
    index.html
    main.css
    index.js
  server/
    index.js
```

### Dev Environment

When the dev build is ran, it will automatically rebuild the client and server bundles when the files change. This allows for much faster development iterations and is just cool!

Start a dev build with this command:

```bash
yarn build:dev
```

## Deployment Strategy

There are a few ways that this application could be deoployed.

The first method would be to use a managed container service. This would require finishing the container Dockerfile for the api that I started and then deploying the api container and the DB container to [Amazon Elastic Container Service](https://aws.amazon.com/ecs/). Then define an [Api Gateway](https://aws.amazon.com/api-gateway/) in AWS that routes the appropriate requests to the Api container in ECS. In place of ECS, you could use Kubernetes to achieve the same goal as it pertains to container orchestration.

Another option would be to deploy directly to AWS without using containers. This would have the api deployed to an [AWS Lambda Function](https://aws.amazon.com/lambda/), put all of the required assets (index.html, main.css, front end JS bundle) into an [S3 Bucket](https://aws.amazon.com/s3/), and then define an Api Gateway that would send requests to our previously created Lambda Function. Now what about MongoDb? You could either use [AWS's DocumentDb](https://aws.amazon.com/documentdb/) or you could deploy the MongoDb to an EC2 instance and create a [VPC](https://aws.amazon.com/vpc/) connection between the Lambda function and the EC2 instance. To manage the creation of all the necessary resources that come with this option, I would most likely use a framework like [Serverless](https://www.serverless.com) or an infrastructure as code type of solution like [Terraform](https://www.terraform.io/).
