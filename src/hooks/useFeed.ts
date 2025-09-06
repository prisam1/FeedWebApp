import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getPosts, createPost } from "../services/feed/index";
import { Post } from "../types/types";

export const useCreatePost = (fetchPosts: () => Promise<void>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePost = async (formData: { photo: string, caption: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createPost(formData);
      toast.success("Post created successfully!");

      // Refresh the posts feed
      if (fetchPosts) {
        fetchPosts();
      }
      return data;
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePost, loading, error };
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data : Post[] = await getPosts();
      setPosts(data);
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.error || "An unexpected error occurred. Please try again";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, fetchPosts };
};
