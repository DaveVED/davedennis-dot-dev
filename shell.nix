{ pkgs ? import (builtins.fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixpkgs-unstable.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.awscli2
    pkgs.pnpm
  ];
}

