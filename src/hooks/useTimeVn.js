import { DateTime } from "luxon";
import React from "react";

const useTimeVn = () => {
  const formattedVNTime = DateTime.now()
    .setZone("Asia/Ho_Chi_Minh")
    .toFormat("dd/MM/yyyy");
  return {
    formattedVNTime,
  };
};

export default useTimeVn;
