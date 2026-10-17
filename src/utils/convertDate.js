export const formatDateId = (date, simpel, noTrim) => {
  const isValidDate = !isNaN(new Date(date));
  const trimDate = !noTrim
    ? isValidDate && date?.trim().replace(/^["']|["']$/g, "")
    : date;

  const chekingDate = trimDate || Date.now();

  const opsi = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const simpelOpsi = {
    month: "short",
    year: "numeric",
    day: "numeric",
  };
  const checkOpsi = simpel ? simpelOpsi : opsi;

  const convertDate = new Date(chekingDate);

  return new Intl.DateTimeFormat("id-ID", checkOpsi).format(convertDate);
};

export const dateToNumber = (date) => date && new Date(date).getTime();
