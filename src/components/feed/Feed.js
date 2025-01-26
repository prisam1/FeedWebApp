import React, { useState } from "react";
import { usePosts, useCreatePost } from "../../hooks/useFeed";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

export const Feed = () => {
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const { posts, loading, fetchPosts} = usePosts();
  const { handleCreatePost, loading: createPostLoading } =
    useCreatePost(fetchPosts);

  const addPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("caption", caption);

    await handleCreatePost(formData);
    setCaption("");
    setPhoto(null);
    setPreview(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL 
    } else {
      toast.error("Only image files are allowed.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("hiddenFileInput").click(); // Trigger the hidden file input
  };

  return (
    <div className="w-full pb-20">
      <h1 className="text-blue-600 text-2xl font-semibold">Feed</h1>

      <form onSubmit={addPost} className="flex flex-col gap-2 mt-2">
        <div className="relative w-full max-w-xl">
          <textarea
            type="text"
            placeholder="Enter a caption"
            rows="5"
            value={caption}
            className="w-full px-4 pt-2 pb-11 max-w-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 flex items-end p-2 focus:outline-none">
            <button
              type="button"
              onClick={triggerFileInput}
              className="py-2 px-2 rounded"
            >
              <ImagePlus className="w-7 h-7" />
            </button>

            <input
              type="file"
              id="hiddenFileInput"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

            {preview && (
              <div className="mb-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-7 h-7 rounded-sm "
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="h-10 px-4 py-2 w-24 bg-purple-500 rounded-md text-white"
        >
          {createPostLoading ? "Posting..." : "Post"}
        </button>
      </form>
      {loading && <p className="mt-2 text-green-500">Loading posts...</p>}
      <div className="w-full max-w-lg mt-8">
        {posts?.map((post) => {
          return (
            <div key={post._id} className="flex flex-col gap-1 w-full max-w-lg">
              <img
                src={post.photoUrl}
                alt={post.caption}
                className="w-full max-w-md rounded-sm"
              />
              <p className="font-semibold mb-4">{post.caption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
