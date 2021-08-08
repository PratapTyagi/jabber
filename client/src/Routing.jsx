import {
  SignUp,
  SignIn,
  DefaultChat,
  Chat,
  Sidebar,
  AllUsers,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const Routing = () => {
  const currentUser = localStorage.getItem("currentUser");

  return (
    <>
      <Router>
        <Switch>
          {currentUser ? (
            <>
              <Route exact path="/">
                <div className="app_body">
                  <Sidebar />
                  <DefaultChat />
                </div>
              </Route>

              <Route exact path="/rooms/:roomId">
                <div className="app_body">
                  <Sidebar />
                  <Chat />
                </div>
              </Route>

              <Route exact path="/rooms/:roomId/allusers">
                <div className="app_body">
                  <Sidebar />
                  <AllUsers />
                </div>
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};
