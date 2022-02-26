export default {
    getSessions: () => {
      return fetch("/session/sessions").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    },
    postSession: (session) => {
      return fetch("/session/addsession", {
        method: "post",
        body: JSON.stringify(session),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    delSession: (session) => {
      return fetch("/session/delsession", {
        method: "post",
        body: JSON.stringify(session),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
  };
  