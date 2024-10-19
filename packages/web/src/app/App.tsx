import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Briefcase, ChevronDown, Menu, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/dave-cave-bar.png";

export default function Component() {
  const [open, setOpen] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(true);
  const contactRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (landingRef.current) {
        const landingRect = landingRef.current.getBoundingClientRect();
        setIsLandingPage(landingRect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const blogPosts = [
    {
      _id: "1",
      title: "The Art of Mixology",
      description: "Exploring the science and creativity behind craft cocktails",
      date: "2023-06-15",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      slug: "/blog/art-of-mixology"
    },
    {
      _id: "2",
      title: "Bar Etiquette 101",
      description: "Essential tips for being a great patron and making the most of your night out",
      date: "2023-06-01",
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      slug: "/blog/bar-etiquette-101"
    },
    {
      _id: "3",
      title: "The History of the Martini",
      description: "Tracing the origins and evolution of this classic cocktail",
      date: "2023-05-20",
      image: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      slug: "/blog/history-of-martini"
    }
  ]

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex h-16 items-center px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`${isLandingPage ? 'text-white hover:bg-white/20' : 'text-purple-800 hover:bg-purple-200'}`}
                aria-label="Toggle Sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Dave Cave</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                  <User className="mr-2 h-5 w-5" />
                  About Me
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Blog
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                  <Briefcase className="mr-2 h-5 w-5" />
                  Personal Projects
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div ref={landingRef} className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <main className="flex-grow"></main>
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
          <div className="flex space-x-4 mb-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#9146FF] transition-colors">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077B5] transition-colors">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110" 
            onClick={scrollToContact}
            aria-label="Scroll to contact section"
          >
            <ChevronDown className="h-16 w-16" />
          </Button>
        </div>
      </div>
      <div ref={contactRef} className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="container max-w-4xl py-6 lg:py-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                A blog built using Contentlayer. Posts are written in MDX.
              </p>
            </div>
          </div>
          <hr className="my-8" />
          {blogPosts?.length ? (
            <div className="grid gap-10 sm:grid-cols-2">
              {blogPosts.map((post, index) => (
                <article
                  key={post._id}
                  className="group relative flex flex-col space-y-2"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="rounded-md border bg-muted transition-colors aspect-video object-cover"
                      loading={index <= 1 ? "eager" : "lazy"}
                    />
                  )}
                  <h2 className="text-2xl font-extrabold">{post.title}</h2>
                  {post.description && (
                    <p className="text-muted-foreground">{post.description}</p>
                  )}
                  {post.date && (
                    <p className="text-sm text-muted-foreground">
                      {formatDate(post.date)}
                    </p>
                  )}
                  <Link to={post.slug} className="absolute inset-0">
                    <span className="sr-only">View Article</span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p>No posts published.</p>
          )}
        </div>
      </div>
    </div>
  )
}