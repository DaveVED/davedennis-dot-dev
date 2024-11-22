#!/usr/bin/env node
import * as dsqr from "dsqr";
import { WebStack } from "../stacks/web-stack";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const stage = process.env.CDK_STAGE || "development";

const app = new dsqr.aws.App({
  name: "DSQR",
  stage,
  region: env.region,
  account: env.account,
});

app.addStage("DSQR", (currentStage) => {
  new WebStack(currentStage, "AssetCDN", {
    domainName:stage === "development"
    ? "dev.davedennis.dev"
    : "davedennis.dev",
    /**
     * TODO: REPLACE ME...
     */
    certificateArn: "arn:aws:acm:us-east-1:381492130802:certificate/0cdbff1d-a71a-431d-a582-154bc8f8a9e9"
  });
});

app.synth();