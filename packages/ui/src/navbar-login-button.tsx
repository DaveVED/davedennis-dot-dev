"use client";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export const NavbarLoginButton = () => (
  <button
    onClick={() => signIn("auth0")}
    className="ui-text-yellow-400 ui-bg-transparent ui-hover:text-yellow-300 ui-flex ui-items-center ui-px-3 ui-py-2 ui-rounded-md"
  >
    <LogIn className="ui-mr-2" />
    Login
  </button>
);
