import api from "../api";

// Feed APIs
export const getPosts = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const createPost = async (formData) => {
  const { data } = await api.post("/posts", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
