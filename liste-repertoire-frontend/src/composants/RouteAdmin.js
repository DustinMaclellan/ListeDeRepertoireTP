import { Redirect, Route } from "react-router-dom";
import { UtiliserAuth } from "../context/auth";

function RouteAdmin({ component: Component, ...reste }) {
  const { authentificationAdmin } = UtiliserAuth();
 
  return (
    <Route
      {...reste}
      render={(props) =>
        authentificationAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/connexion" />
        )
      }
    />
  );
}

export default RouteAdmin;
