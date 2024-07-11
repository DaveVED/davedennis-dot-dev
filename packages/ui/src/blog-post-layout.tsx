"use client";

import { type ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, Heart, CornerDownRight } from "lucide-react";
import cn from "classnames";

export interface FrontMatter {
  title: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
}

interface Comment {
  commentId: string;
  userId: string;
  postId: string;
  parentCommentId?: string;
  content: string;
  createdAt: string;
  userName: string;
}

interface BlogLayoutProps {
  children: ReactNode;
  frontmatter: FrontMatter;
  likes: number | null;
  hasUserLiked: boolean | null;
  postId: string;
  userLoggedIn: boolean; // New prop to determine if user is logged in
  userId: string | undefined;
  userProfilePicutre: string;
}

export const BlogPostLayout = ({
  children,
  frontmatter,
  likes,
  hasUserLiked: initialHasUserLiked,
  postId,
  userLoggedIn, // Use this prop to determine if user is logged in
  userId,
  userProfilePicutre
}: BlogLayoutProps) => {
  const { title, author, date, coverImage } = frontmatter;
  const readTime = "5 min read";
  const [likesCount, setLikesCount] = useState(likes ?? 0);
  const [hasUserLiked, setHasUserLiked] = useState(initialHasUserLiked ?? false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(true); // Always true to show comments section

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        console.log('Fetched comments:', data); // Debug statement
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentClick = () => {
    setIsCommentSectionVisible(!isCommentSectionVisible);
  };

  const handleLikeClick = async () => {
    if (userId) {
      const action = hasUserLiked ? "remove-like" : "add-like";

      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, userId, postId }),
      });
  
      setLikesCount(likesCount + (hasUserLiked ? -1 : 1));
      setHasUserLiked(!hasUserLiked);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    if (userId) {
      e.preventDefault();
      setIsLoading(true);
  
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId, content: newComment, parentCommentId: replyTo }),
      });
  
      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
      setReplyTo(null);
      setIsLoading(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    if (userId) {
      e.preventDefault();
      setIsLoading(true);
  
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId, content: replyContent, parentCommentId: replyTo }),
      });
  
      const newReplyData = await response.json();
      setComments([...comments, newReplyData]);
      setReplyContent("");
      setReplyTo(null);
      setIsLoading(false);
    }

  };

  const handleReplyClick = (commentId: string) => {
    setReplyTo(commentId);
  };

  const renderComments = (comments: Comment[], parentCommentId: string | null = null) => {
    return comments
      .filter(comment => comment.parentCommentId === parentCommentId)
      .map(comment => (
        <div key={comment.commentId} className={parentCommentId ? "ui-ml-8 ui-mb-4" : "ui-mb-4"}>
          <div className="ui-flex ui-items-center ui-mb-2">
            <Image
              src={userProfilePicutre} // Replace with actual user image URL
              className="ui-w-8 ui-h-8 ui-rounded-full ui-mr-2"
              alt={comment.userName}
              width={32}
              height={32}
            />
            <div>
              <div className="ui-font-bold">{userId}</div>
              <div className="ui-text-sm ui-text-gray-600">
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <p>{comment.content}</p>
          <button
            onClick={() => handleReplyClick(comment.commentId)}
            className="ui-flex ui-items-center ui-text-sm ui-text-blue-500 ui-hover:underline"
          >
            <CornerDownRight className="ui-w-4 ui-h-4 ui-mr-1" />
            Reply
          </button>
          {replyTo === comment.commentId && (
            <form onSubmit={handleReplySubmit} className="ui-mt-2 ui-ml-8">
              <textarea
                className="ui-w-full ui-p-2 ui-border ui-border-gray-300 ui-rounded-md ui-mb-2"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Add a reply..."
                required
              />
              <button
                type="submit"
                className="ui-bg-blue-500 ui-text-white ui-py-2 ui-px-4 ui-rounded-md hover:ui-bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Posting..." : "Post Reply"}
              </button>
            </form>
          )}
          {renderComments(comments, comment.commentId)}
        </div>
      ));
  };

  return (
    <div className="ui-container ui-mx-auto ui-px-4 ui-sm:px-6 ui-lg:px-8">
      <div className="ui-max-w-2xl ui-mx-auto ui-py-8">
        <header className="ui-mb-8">
          <h1 className="ui-text-3xl ui-font-bold ui-mt-4">{title}</h1>
          <div className="ui-w-full ui-flex ui-justify-center ui-my-4">
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              className={cn(
                "ui-w-full ui-max-w-[800px] ui-rounded-md ui-object-cover",
                "ui-max-h-[400px] sm:ui-max-h-[300px] md:ui-max-h-[400px]"
              )}
              width={800}
              height={400}
            />
          </div>
          <div className="ui-flex ui-items-center ui-text-gray-600 ui-mt-2">
            <Image
              src={"/dave.jpg"}
              className="ui-w-10 ui-h-10 ui-rounded-full ui-mr-3"
              alt={author}
              width={40}
              height={40}
            />
            <div className="ui-ml-4">
              <div>{author}</div>
              <div className="ui-flex ui-items-center ui-text-sm">
                <span>{readTime}</span>
                <span className="ui-mx-1">•</span>
                <time>{new Date(date).toDateString()}</time>
              </div>
            </div>
          </div>
          <hr className="ui-my-4" />
          <div className="ui-flex ui-items-center ui-text-gray-600 ui-mt-2">
            <div className="ui-flex ui-items-center ui-mr-4">
              <MessageCircle
                className="ui-w-5 ui-h-5 ui-mr-1 ui-cursor-pointer hover:ui-text-blue-500"
                onClick={handleCommentClick}
              />
              <span>{comments.length}</span>
            </div>
            <div className="ui-flex ui-items-center">
              <Heart
                className={cn(
                  "ui-w-5 ui-h-5 ui-mr-1 ui-cursor-pointer",
                  hasUserLiked
                    ? "ui-fill-red-500 hover:ui-stroke-white"
                    : "hover:ui-fill-red-500",
                )}
                onClick={handleLikeClick}
              />
              <span>{likesCount}</span>
            </div>
          </div>
          <hr className="ui-my-4" />
        </header>
        {children}
        {isCommentSectionVisible && (
          <section className="ui-mt-8">
            <h2 className="ui-text-2xl ui-font-bold">Comments</h2>
            {userLoggedIn ? (
              <form onSubmit={handleCommentSubmit} className="ui-mt-4">
                <textarea
                  className="ui-w-full ui-p-2 ui-border ui-border-gray-300 ui-rounded-md ui-mb-2"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  required
                />
                <button
                  type="submit"
                  className="ui-bg-blue-500 ui-text-white ui-py-2 ui-px-4 ui-rounded-md hover:ui-bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Posting..." : "Post Comment"}
                </button>
              </form>
            ) : (
              <p className="ui-text-gray-600 ui-mt-4">You must be logged in to comment.</p>
            )}
            <div className="ui-mt-6">
              {renderComments(comments)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
