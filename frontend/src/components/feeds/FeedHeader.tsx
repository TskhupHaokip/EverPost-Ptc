interface ProfileProps {
  ProfileimageUrl: string;
}

function FeedHeader({ ProfileimageUrl }: ProfileProps) {
  return (
    <div className="flex flex-1 w-full rounded-2xl p-2 items-center gap-2 bg-sky-800">
      {" "}
      <div className="w-13 h-13 rounded-full bg-white">
        {ProfileimageUrl && <img src={ProfileimageUrl} alt="ProfilePic" className=" w-full h-full rounded-full" />}
      </div>
      <form className="flex flex-1 gap-1 ">
        <input
          type="text"
          placeholder="What'S On Your Mind ?"
          name="Caption"
          required
          className="p-2 border-amber-50 border-2 rounded-2xl w-full "
        />
        <input
        aria-label="Upload Image Post"
        type="file"
        id="image-upload"
        name="image"
        accept="image/*"
        hidden
      />

      <label htmlFor="image-upload" className="   justify-center p-2 items-center hover:bg-green-300 rounded-3xl">
        <img src="./Uploadimage.png" alt="Upload image" className="w-8 h-8" />
      </label>
       
        
        <button type="submit" className="ml-auto rounded-2xl mb-1 hover:bg-green-500 font-semibold p-2 text-lg">Upload</button>
      </form>
    </div>
  );
}

export default FeedHeader;
