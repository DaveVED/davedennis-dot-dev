#!/usr/bin/env node
import * as ace from "@dsqr/ace";
import { StaticSite } from "../lib/stacks/static-site";

// Define your AWS environment variables
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// Determine the current stage (default: development)
const stage = process.env.CDK_STAGE || "development";

// Create a new ACE app
const app = new ace.aws.App({
  name: "MyApplication",
  stage,
  region: env.region,
  account: env.account,
});

// Add the environment-specific stage dynamically
app.addStage("DaveDennisDotDev", (currentStage) => {
  new StaticSite(currentStage, "PersonalSite", { 
    env, 
    domainName: stage === "development" ? "dev.davedennis.dev" : "davedennis.dev"
  });
});

app.synth(); // Synthesize the app
