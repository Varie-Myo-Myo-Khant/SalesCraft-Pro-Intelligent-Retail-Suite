import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBoard } from '../Slice/userSlice';

const BoardUser = () => {
  const dispatch = useDispatch();
  const { loading, content, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserBoard());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;