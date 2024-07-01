import { Twitter, Github, Twitch, Linkedin } from "lucide-react";

export const SocialIcons = () => {
  return (
    <div className="mt-4 flex gap-4">
    <a href="/twitter" target="_blank" rel="noopener noreferrer">
      <Twitter className="ui-w-6 ui-h-6 ui-text-white" />
    </a>
    <a href="/github" target="_blank" rel="noopener noreferrer">
      <Github className="ui-w-6 ui-h-6 ui-text-white" />
    </a>
    <a href="/twitch" target="_blank" rel="noopener noreferrer">
      <Twitch className="ui-w-6 ui-h-6 ui-text-white" />
    </a>
    <a href="/linkedin" target="_blank" rel="noopener noreferrer">
      <Linkedin className="ui-w-6 ui-h-6 ui-text-white" />
    </a>
  </div>
  );
};
