//Turn AniList status codes into readable labels
export function formatStatus(status: string){
    const statusText: Record<string, string> = {
        RELEASING: "Ongoing",
        FINISHED: "Completed",
        NOT_YET_RELEASED: "Not yet released",
        CANCELLED: "Cancelled",
        HIATUS: "On hiatus",
      };
    
    return statusText[status] || status;
  }
