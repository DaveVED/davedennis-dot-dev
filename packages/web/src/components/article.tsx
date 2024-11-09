import { formatDate, formatPostSlug } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export interface ArticleProps {
  post: {
    coverImage?: string
    title: string
    summary?: string
    date?: string
    path: string
    tags?: string[]
  }
  index: number
}

const Article = ({ post, index }: ArticleProps) => {
  return (
    <article className="group relative flex flex-col space-y-2">
      {post.coverImage && (
        <img
          src={`https://raw.githubusercontent.com/DaveVED/my-posts/main/${post.coverImage}`}
          alt={post.title}
          width={804}
          height={452}
          className="rounded-md border bg-muted transition-colors"
          loading={index <= 1 ? "eager" : "lazy"}
        />
      )}
      <h2 className="text-2xl font-extrabold">{post.title}</h2>
      {post.summary && (
        <p className="text-muted-foreground">{post.summary}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge 
              key={tag} 
              className="bg-purple-200 text-purple-800 hover:bg-purple-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {post.date && (
        <p className="text-sm text-muted-foreground">
          {formatDate(post.date)}
        </p>
      )}
      <Link to={`blog/${formatPostSlug(post.path)}`} className="absolute inset-0">
        <span className="sr-only">View article: {post.title}</span>
      </Link>
    </article>
  )
}

export default Article