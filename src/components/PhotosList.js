import React from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";

function PhotosList({ album }) {
  const { data, error, isLoading } = useFetchPhotosQuery(album);
  //   console.log(data);
  //   console.log(album);
  const [addPhoto, results] = useAddPhotoMutation();
  const handleAddPhoto = () => {
    addPhoto(album);
  };
  let content;
  if (isLoading) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} album={album} />;
    });
  }
  return (
    <div>
      <div className="m-2 flex justify-between items-center">
        <h3>Photos in {album.title}</h3>
        <Button primary loading={results.isLoading} onClick={handleAddPhoto}>
          + Add photo
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">{content}</div>
    </div>
  );
}

export default PhotosList;
