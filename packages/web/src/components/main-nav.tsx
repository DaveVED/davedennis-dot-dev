import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"

export function MainNav() {
  const location = useLocation()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const items = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
  ]

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <div className="h-6 w-6 bg-foreground rounded-full" />
        <span className="hidden font-bold sm:inline-block">
          Dave Cave
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                location.pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
        {/*<span className="font-bold">Menu</span>*/}
      </button>
      {showMobileMenu && <MobileNav items={items} />}
    </div>
  )
}