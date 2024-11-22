
{ pkgs ? import (builtins.fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixpkgs-unstable.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-18_x
    awscli2
    pnpm
    bun
    nodePackages.aws-cdk
    nodePackages.typescript
  ];
}
