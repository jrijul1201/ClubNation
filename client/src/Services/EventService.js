export default {
    getEvents: () => {
      return fetch("/event/events").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    },
    postEvent: (event) => {
      return fetch("/event/addevent", {
        method: "post",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    delEvent: (event) => {
      return fetch("/event/delevent", {
        method: "post",
        body: JSON.stringify(event),
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
  