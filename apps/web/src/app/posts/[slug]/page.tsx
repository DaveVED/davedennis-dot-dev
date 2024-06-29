import {MDXWrapper} from "@repo/ui/mdx-wrapper";
import {PostLayout} from "@repo/ui/post-layout";
import { fetchGitMdxData } from "@repo/ui/utili";

type Post = {
  content: string;
  date: string;
  path: string;
  title: string;
};

export async function generateStaticParams() {
  const response = await fetch(
    "https://raw.githubusercontent.com/DaveVED/my-posts/master/feed.json",
  );
  const body = await response.text();

  let posts: Post[];

  try {
    posts = JSON.parse(body) as Post[];
    posts = posts.map((item) => ({
      ...item,
      path: item.path.substring(0, item.path.lastIndexOf(".")),
    }));
  } catch (e) {
    throw new Error("Unable to parse TIL Feed", { cause: e });
  }

  return posts.map((post) => ({ slug: post.path }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const mdxSource = await fetchGitMdxData(slug);

  return (
    <PostLayout>
      <article className="prose prose-lg prose-gray text-gray-800">
        <MDXWrapper mdxSource={mdxSource} />
      </article>
    </PostLayout>
  );
}

