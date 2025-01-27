import React, { useState } from "react";
import { usePosts, useCreatePost } from "../../hooks/useFeed";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

export const Feed = () => {
  const [caption, setCaption] = useState("");
  const [photoBase64, setPhotoBase64] = useState(null);

  const [preview, setPreview] = useState(null);

  const { posts, loading, fetchPosts } = usePosts();
  const { handleCreatePost, loading: createPostLoading } =
    useCreatePost(fetchPosts);

  const addPost = async (e) => {
    e.preventDefault();

    if (!photoBase64) {
      toast.error("Please select an image.");
      return;
    }

    const postData = { photo: photoBase64, caption };

    await handleCreatePost(postData);
    setCaption("");
    setPhotoBase64(null);
    setPreview(null);
  };

  // Convert selected image file to Base64
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPhotoBase64(reader.result); // Save Base64 string
        setPreview(URL.createObjectURL(file)); // Show image preview
      };
    } else {
      toast.error("Only image files are allowed.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("hiddenFileInput").click(); // Trigger the hidden file input
  };

  return (
    <div className="w-full pb-20">
      <h1 className="text-blue-600 lg:text-2xl text-lg font-semibold">Feed</h1>

      <form onSubmit={addPost} className="flex flex-col gap-2 mt-2 w-full">
        <div className="relative w-full lg:max-w-xl max-w-52">
          <textarea
            type="text"
            placeholder="Enter a caption"
            rows="5"
            value={caption}
            className="w-full lg:px-4 px-2 lg:pt-2 pt-1 pb-11 lg:max-w-xl max-w-52  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 flex items-end p-2 focus:outline-none">
            <button
              type="button"
              onClick={triggerFileInput}
              className="lg:py-2 lg:px-2"
            >
              <ImagePlus className="lg:w-7 lg:h-7" />
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
          className="lg:h-10 px-4 py-2 lg:w-24 bg-purple-500 rounded-md text-white"
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
              <p className="font-semibold mb-4 lg:text-base  text-xs">
                {post.caption}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
