import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Navbar = () => {
  const { toggleSidebar  } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 px-0 text-primary hover:bg-transparent hover:text-primary/80 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={toggleSidebar}
        >
          <Zap className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
