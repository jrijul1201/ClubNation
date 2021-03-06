import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import AdminRoute from "./hocs/AdminRoute";
import StudentRoute from "./hocs/StudentRoute";
import Home from "demos/Home.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AdminSession from "demos/AdminSession";
import StudentSession from "demos/StudentSession";
import AdminSessionEdit from "demos/AdminSessionEdit";
import EventView from "demos/EventView";
import AdminEvent from "demos/AdminEvent";
import StudentEvent from "demos/StudentEvent";
import AdminEventEdit from "demos/AdminEventEdit";
import SessionView from "demos/SessionView";
export default function App() {

  return (
    <Router>
      <Switch>
        <AdminRoute exact path="/admin_session" component={AdminSession} />
        <AdminRoute path="/admin_session_edit" component={AdminSessionEdit} />
        <AdminRoute exact path="/admin_event" component={AdminEvent} />
        <AdminRoute path="/admin_event_edit" component={AdminEventEdit} />
        <StudentRoute exact path="/sessions" component={StudentSession} />
        <StudentRoute path="/session" component={SessionView} />
        <StudentRoute exact path="/events" component={StudentEvent} />
        <StudentRoute path="/event" component={EventView} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
