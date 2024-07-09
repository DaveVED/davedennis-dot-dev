"use client";

import { Session } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface NavbarAvatarProps {
  session: Session | null;
}

export const NavbarAvatar = ({ session }: NavbarAvatarProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="ui-relative ui-flex ui-items-center ui-space-x-4">
      <div className="ui-relative" onClick={toggleDropdown}>
        <Image
          className="ui-rounded-full ui-w-12 ui-h-12 ui-cursor-pointer"
          src={session!.user!.image as string}
          alt="Profile"
          width={50}
          height={50}
        />
        <span className="ui-absolute ui-bottom-0 ui-right-0 ui-bg-green-500 ui-rounded-full ui-w-3 ui-h-3 ui-border-2 ui-border-white"></span>
        {isDropdownVisible && (
          <div className="ui-absolute ui-right-0 ui-mt-2 ui-w-48 ui-rounded-md ui-shadow-lg ui-bg-white ui-ring-1 ui-ring-black ui-ring-opacity-5">
            <div
              className="ui-py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                onClick={() => signOut()}
                className="ui-block ui-px-4 ui-py-2 ui-text-sm ui-text-gray-700 ui-hover:bg-gray-100 ui-w-full ui-text-left"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
