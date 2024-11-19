import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ace from "@dsqr/ace";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export interface StaticSiteProps extends cdk.StackProps {
  readonly domainName: string;
};

export class StaticSite extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StaticSiteProps) {
    super(scope, id, props);

    // not sure best way to handle certs. ideally it would just create it for them.
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "Certificate",
      "arn:aws:acm:us-east-1:381492130802:certificate/0cdbff1d-a71a-431d-a582-154bc8f8a9e9",
    );

    new ace.aws.StaticSite(this, "StaticSite", {
      indexPage: "index.html",
      build: {
        command: "bun run build",
        path: "../../packages/web",
        outputDir: "dist"
      },
      customDomain: {
        domainName: props.domainName,
        overrides: {
          certificate: certificate
        }
      }
    });
  }
}
