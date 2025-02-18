import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../Utils/hooks/useUser';


const ProtectedRoutes = (props) => {

  // eslint-disable-next-line react/prop-types
  const { Component } = props;
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  })

  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectedRoutes;