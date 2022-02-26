export default {
  getSlots: () => {
    return fetch("/slot/slots").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  postSlot: (slot) => {
    return fetch("/slot/addslot", {
      method: "post",
      body: JSON.stringify(slot),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  updSlot: (s, a, b, u) => {
    return fetch("/slot/updslot", {
      method: "post",
      body: JSON.stringify({ slot: s, isAvailable: a, isBooked: b, user: u }),
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
