import { toast } from "sonner";



export const toastError = ({ message, title }) =>
toast.error(title)

export const toastSucsess = ({ message, title }) =>
  toast.add({
    type: "success",
    title: title,
    description: message,
  });

  