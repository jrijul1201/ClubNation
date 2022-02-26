export default {
    getSlotsBooked: () => {
      return fetch("/slotbooked/slotsbooked").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    }, 
  };
  