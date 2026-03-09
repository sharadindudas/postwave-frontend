import { OLTP_BASE_URL } from "@/config";
import ky from "ky";

export const kyClient = ky.create({
  prefixUrl: OLTP_BASE_URL + "api/v1",
  credentials: "include",
  hooks: {
    beforeError: [
      (error) => {
        return error;
      }
    ]
  }
});
