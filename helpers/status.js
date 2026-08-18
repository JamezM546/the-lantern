export function formatStatus(status){
    const statusText = {
        RELEASING: "Ongoing",
        FINISHED: "Completed",
        NOT_YET_RELEASED: "Not yet released",
        CANCELLED: "Cancelled",
        HIATUS: "On hiatus",
      };
    
    return statusText[status] || status;
  };
