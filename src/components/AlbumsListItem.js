import React from "react";
import Button from "./Button";
import { useDeleteAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";

function AlbumsListItem({ album }) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();
  const handleDeleteAlbum = () => {
    deleteAlbum(album);
  };
  const header = (
    <>
      <Button loading={results.isLoading} onClick={handleDeleteAlbum} danger>
        X
      </Button>
      <h3>{album.title}</h3>
    </>
  );
  return (
    <div>
      <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album} />
      </ExpandablePanel>
    </div>
  );
}

export default AlbumsListItem;
