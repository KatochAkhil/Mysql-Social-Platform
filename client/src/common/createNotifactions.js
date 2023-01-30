import { NotificationManager } from "react-notifications";

export const createNotification = (type, title, message, delay) => {
  switch (type) {
    case "info":
      NotificationManager.info(message, title, 5000);
      break;
    case "success":
      NotificationManager.success(message, title, 1000);
      break;
    case "warning":
      NotificationManager.warning(message, title, 3000);
      break;
    case "error":
      NotificationManager.error(message, title, delay || 1000);
      break;
    default:
      return <></>;
  }
};
