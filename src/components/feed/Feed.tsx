import { ChangeEvent, FormEvent, useState } from "react";
import { usePosts, useCreatePost } from "../../hooks/useFeed";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { UserSelector } from "../../redux/slices/userSlice";

export const Feed = () => {
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { posts, loading, fetchPosts } = usePosts();
  const { handleCreatePost, loading: createPostLoading } = useCreatePost(fetchPosts);

  const user = useSelector(UserSelector);

  const addPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const photoBase64 = reader.result as string;
      const postData = { photo: photoBase64, caption };

      await handleCreatePost(postData);
      setCaption("");
      setFile(null);
      setPreview(null);
    };
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Only image files are allowed.");
      setFile(null);
      setPreview(null);
    }
  };

  const triggerFileInput = () => {
    const hiddenInput = document.getElementById("hiddenFileInput") as HTMLInputElement;
    if (hiddenInput) {
      hiddenInput.click();
    }
  };


  return (
    <div className="w-full lg:max-w-3xl max-w-md pb-20">
      <form onSubmit={addPost} className="flex flex-col gap-2 mt-2 w-full">
        <div className="relative lg:max-w-3xl max-w-md">
          <textarea
            placeholder="Enter a caption"
            rows={3}
            value={caption}
            className="w-full lg:px-4 px-2 lg:pt-2 pt-1 pb-11 lg:max-w-3xl max-w-md border rounded-md text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 flex items-end p-2 focus:outline-none">
            <button
              type="button"
              onClick={triggerFileInput}
              className="lg:py-[6px] lg:px-0 py-[6px]"
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
                  className="w-7 h-7 rounded-sm"
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="lg:h-10 px-4 py-2 lg:w-24 max-w-md bg-purple-500 rounded-md text-white"
        >
          {createPostLoading ? "Posting..." : "Post"}
        </button>
      </form>

      {loading && <p className="mt-2 text-green-500">Loading posts...</p>}

      <div className="w-full max-w-3xl mt-10">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="flex flex-col border-[1px] px-4 border-gray-300 rounded-md mt-3"
          >
            <div className="py-1 font-bold">
              {user?.name?.substring(0, 24)}
            </div>

            <img
              src={post.photoUrl}
              alt={post.caption}
              className="w-full lg:max-w-3xl max-w-md h-85 p-1"
            />
            <div className="p-0">
              <div className="w-full bg-slate-300 mt-2 h-[1px]" />
              <p className="font-semibold p-2 lg:text-base text-xs">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
