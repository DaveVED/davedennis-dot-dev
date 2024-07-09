import { NavbarLoginButton } from "./navbar-login-button";
import { Session } from "next-auth";
import { NavbarAvatar } from "./navbar-avatar";

interface NavbarProps {
  session: Session | null;
}

export const Navbar = ({ session }: NavbarProps) => {
  return (
    <nav className="ui-absolute ui-w-full ui-z-50 ui-bg-transparent">
      <div className="ui-mx-auto ui-max-w-7xl ui-px-2 sm:ui-px-6 lg:ui-px-8">
        <div className="ui-relative ui-flex ui-h-16 ui-items-center ui-justify-end">
          {session ? <NavbarAvatar session={session} /> : <NavbarLoginButton />}
        </div>
      </div>
    </nav>
  );
};
