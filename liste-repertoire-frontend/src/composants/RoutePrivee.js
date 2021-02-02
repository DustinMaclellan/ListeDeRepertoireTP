import { Redirect, Route } from "react-router-dom";
import { UtiliserAuth } from "../context/auth";

function RoutePrivee({ component: Component, ...reste }) {
  const { authentification } = UtiliserAuth();

  return (
    <Route
      {...reste}
      render={(props) =>
        authentification ? (
          <Component {...props} />
        ) : (
          <Redirect to="/connexion" />
        )
      }
    />
  );
}

export default RoutePrivee;
