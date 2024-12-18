import Cookies from "js-cookie";
interface ICookies {
  token: string;
  expiresIn: string;
}
export const saveAuthToken = ({ token, expiresIn }: ICookies) => {
  const durationMatch = expiresIn.match(/^(\d+)([dhms])$/); // Matches formats like "60d", "12h"

  if (!durationMatch) {
    console.error("Invalid expiresIn format");
    return;
  }

  const durationValue = parseInt(durationMatch[1], 10);
  const durationUnit = durationMatch[2];
  let expiresInDays;

  switch (durationUnit) {
    case "d":
      expiresInDays = durationValue;
      break;
    case "h":
      expiresInDays = durationValue / 24;
      break;
    case "m":
      expiresInDays = durationValue / (24 * 60);
      break;
    case "s":
      expiresInDays = durationValue / (24 * 60 * 60);
      break;
    default:
      console.error("Unsupported time unit in expiresIn");
      return;
  }

  Cookies.set("auth_token", token, {
    expires: expiresInDays,
    secure: true,
    sameSite: "Strict",
  });
};
export const getAuthToken = () => {
  return Cookies.get("auth_token");
};
export const clearAuthToken = () => {
  Cookies.remove("auth_token");
};
