import React from "react";
import { GoTrashcan } from "react-icons/go";
import { useDeletePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const [deletePhoto] = useDeletePhotoMutation();
  const handleDeletePhoto = () => {
    deletePhoto(photo);
  };
  return (
    <div onClick={handleDeletePhoto} className="relative cursor-pointer">
      <img src={photo.url} alt="random pic" className="h-30 w-30" />
      <div className="absolute flex inset-0 items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan onC className="text-4xl" />
      </div>
    </div>
  );
}

export default PhotosListItem;
