
import useSWR from 'swr'

const GITHUB_BASE_URI: string = "https://raw.githubusercontent.com/DaveVED/my-posts/main";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface FeedItem {
    title: string;
    summary: string;
    date: string;
    path: string;
    coverImage: string;
    tags: string;
};

export const usePosts = () => {
    const { data, error, isLoading } = useSWR<FeedItem[]>(`${GITHUB_BASE_URI}/feed.json`, fetcher);

    return {
        feed: data,
        isLoading,
        isError: error,
    };
};