import React from "react";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  //user object that have name and id of that user
  //data : the data we got back from the api
  //error: null, object error
  //isLoading: true (if we are currently in the process of making the request ),false else
  const { data, error, isLoading } = useFetchAlbumsQuery(user); //fetch a list of albums for the user
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums...</div>;
  } else {
    content = data.map((album) => (
      <AlbumsListItem album={album} user={user} key={album.id} />
    ));
  }

  return (
    <div>
      <div className="flex  justify-between items-center mb-3">
        <h3 className="text-xl">Albums for {user.name}</h3>
        <Button primary loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
