import React from "react";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import { deleteUser } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
function UsersListItem({ user }) {
  const [deleteUserThunk, isLoadingDeleteUser, errorDeleteUser] =
    useThunk(deleteUser);
  const handleDeleteClick = () => {
    deleteUserThunk(user);
  };

  const header = (
    <>
      <Button loading={isLoadingDeleteUser} danger onClick={handleDeleteClick}>
        X
      </Button>
      {errorDeleteUser && <p>Error deleting user.</p>}
      <div className="text-xl font-bold">{user.name}</div>
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
