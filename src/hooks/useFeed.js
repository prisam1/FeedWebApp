import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getPosts, createPost } from "../services/feed/index";

export const useCreatePost = (fetchPosts) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePost = async (formData) => {
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
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePost, loading, error };
};

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      toast.error(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, fetchPosts };
};
