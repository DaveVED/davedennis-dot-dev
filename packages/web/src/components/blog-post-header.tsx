import { formatDate } from "@/lib/utils";
import daveCaveAvatar from "../assets/dave-cave-avatar.png";

interface BlogPostHeaderProps {
  date?: string;
  title: string;
  image: string;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ date, title, image }) => {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-4xl leading-tight lg:text-5xl">{title}</h1>
      {date && (
        <time dateTime={date} className="block text-sm text-muted-foreground mt-2">
          Published on {formatDate(date)}
        </time>
      )}
      <div className="mt-4 flex items-center space-x-4">
        <a
          href="https://twitter.com/DaveVED_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-sm"
        >
          <img
            src={daveCaveAvatar}
            alt="Dave Dennis"
            width={42}
            height={42}
            className="rounded-full bg-white"
          />
          <div className="text-left leading-tight">
            <p className="font-medium">Dave Dennis</p>
            <p className="text-[12px] text-muted-foreground">@DaveVED_</p>
          </div>
        </a>
      </div>
      <img
        src={image}
        alt={title}
        className="mt-4 float-left mr-4 mb-4 rounded-md border bg-muted transition-colors max-w-full h-auto"
        style={{ width: '100%', maxWidth: '720px', maxHeight: '405px'}}
      />
    </div>
  );
};
