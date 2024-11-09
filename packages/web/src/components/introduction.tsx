import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage } 
from "@/components/ui/avatar"

const Introduction = ({ avatar = "/placeholder.svg?height=128&width=128" }) => {
  return (
      <div className="max-w-2xl mx-auto text-center">
        <Avatar className="w-32 h-32 mx-auto mb-4 border-2 border-blue-200 shadow-sm">
          <AvatarImage src={avatar} alt="Dave's avatar" />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
          Hey, I'm Dave! 👋
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
          Cloud Development engineer at Goldman Sachs, tinkering with internal libraries, infrastructure, and services. 
          Welcome to my digital playground where I share my tech adventures!
        </p>
      </div>
  )
}

export default Introduction;