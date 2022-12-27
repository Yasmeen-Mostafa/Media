import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { addUser } from "../store/thunks/addUser";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";
import { FaUserPlus } from "react-icons/fa";
// responsible for showlist of users
function UsersList() {
  //rather than call useState four times, use a custom hook to wrap our thunk calls
  /******** SEPARATE STATES FOR EACH KIND OF REQUESTS-> GET, POST,DELETE ****************/
  //1- state for pending status=> fetchUsers <= isLoading, this means pending status of request
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  //1.1- status for keep track if an error occurs
  // const [loadingUsersError, setIsLoadingUsers] = useState(null);
  //2- state for pending status => addUsers <=  isLoading
  // const [isCreatingUser, setIsCreatingUser] = useState(false);
  //2.1- status for keeps track if an error occurs
  // const [creatingUserError, setCreatingUserError] = useState(null);
  const [addUserThunk, isLoadingAddUser, errorAddUser] = useThunk(addUser);
  const [fetchUsersThunk, isLoadingFetchUser, errorFetchUsers] =
    useThunk(fetchUsers);
  const { usersList } = useSelector(({ users }) => users);

  // useEffect(()=>{
  //    setIsLoadingUsers(true);
  //    dispatch(fetchUsers).unwrap().then(()=>setIsLoadingUsers(false)).catch((err)=>{setIsLoadingUsers(false);setIsLoadingUsers(err)})
  // },[])
  useEffect(() => {
    //dispatch here return a promise, which doesnot behave as expected, so we must call on it unwrap to make it work as expected ehavior
    //finally will  be called no matter what, if the req succeded or failed
    fetchUsersThunk();
  }, [fetchUsersThunk]);
  const handleUserAdd = () => {
    addUserThunk();
  };

  return (
    <div>
      <div className="flex justify-between m-3">
        <h1 className="m-2 text-xl text-gray-700 font-bold  ">Users</h1>
        <Button primary loading={isLoadingAddUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {errorAddUser && "error..."}
        {}
      </div>
      {isLoadingFetchUser ? (
        <Skeleton className="h-10 w-full" times={7} />
      ) : errorFetchUsers ? (
        <h1>Error fetching data</h1>
      ) : usersList.length === 0 ? (
        <div className="ml-5 flex items-center gap-4 justify-center ">
          <FaUserPlus className="text-4xl text-blue-700" />
          <p className="text-xl text-blue-700 font-bold">
            Please add new user !
          </p>
        </div>
      ) : (
        usersList.map((user) => <UsersListItem key={user.id} user={user} />)
      )}
    </div>
  );
}

export default UsersList;
