import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dsqr from "dsqr";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export interface StaticSiteStackProps extends cdk.StackProps {
  domainName: string;
  certificateArn: string;
}

export class WebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props);

    new dsqr.aws.StaticSite(this, "Site", {
      indexPage: "index.html",
      /**
       * Build and upload assets to s3 for you.
       */
      build: {
        command: "bun run build",
        path: "../../packages/web",
        outputDir: "dist"
      },
      customDomain: {
        domainName: props.domainName,
        overrides: {
          certificate: acm.Certificate.fromCertificateArn(
            this,
            "Certificate",
            /**
             * Right now `dsqr` does not support creating certificates in your stacks. 
             * We assume you loaded up your domain, and can create a cert with it (you
             * can add * to that cert and use that as well.). Support for the API/Web
             * to create cert will come if anyone ohter than me ever uses this.
             */
            props.certificateArn,
          )
        },
      },
    });
  }
}