# bunny4norwood.xyz

I don't know exactly when the need for a bunny was first mentioned in
the Norwood home, but I do know it became an important point. I mean,
who could say no to a cute bunny?

Development
-----------

Before running, do the following:

1. setup your AWS user credentials
2. setup a topic in SNS and make note of its arn
3. set environment variables for AWS_REGION and SNS_TOPIC
4. run `npm install`

To develop iteratively, use `npm run watch`.

Deployment
----------

Before deploying, you should setup an IAM policy and Role. First, open
the IAM console, and create a new policy using the `iam-policy.json` file
provided. Then create a new Role to allow EC2 instances to call AWS
services on your behalf, using the policy just created.

To deploy in production, zip up all the files in this directory,
but not the top level directory itself. Setup a web server instance
of elastic beanstalk and upload the zipped file. When you get to the
permissions page, set the instance profile to the role you created.
Be sure to setup the environment variables as well.
