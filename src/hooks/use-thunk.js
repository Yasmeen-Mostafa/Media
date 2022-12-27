import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunkName) {
  //useThunk(fetchUsers) OR useThunk(addUser)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunkName(arg))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunkName]
  );
  return [runThunk, isLoading, error];
}
