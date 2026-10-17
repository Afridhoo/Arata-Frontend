export const HandleQuery = (val) => {
  const params = new URLSearchParams();

  Object.entries(val).forEach(([key, val]) => {
    const checkArr = Array.isArray(val) ? val.join(",") : val;

    if (checkArr) params.set(key, checkArr);
  });
  return params.toString();
};
