import { UseGetCategories } from "@/admin/AddNewCategories/UseCategories";

export const DEFAULT_RANGE = [0, 6000000];

export const GetParams = (paramsFilter) => {
  const { data } = UseGetCategories();
  const categories = data?.value || [];
  const getParams = (val) => paramsFilter?.get(val);

  const handleSplit = (val) => val?.split(",");

  const getDest = handleSplit(getParams("dest"));
  const getHotel = handleSplit(getParams("hotel"));
  const getNameTour = handleSplit(getParams("name"));

  const booking = getParams("booking");

  const getId = (val) =>
    Array.isArray(val)
      ? categories
          .filter((x) => val.includes(x.categoriesTour))
          ?.map((s) => s._id)
      : [];

  const categoriesDest = getId(getDest);
  const categoriesHotel = getId(getHotel);

  const NumberRangeValue = getParams("rangeNumber")
    ? handleSplit(getParams("rangeNumber"))?.map((x) => Number(x))
    : DEFAULT_RANGE;

  const value = {
    getDest,
    getHotel,
    NumberRangeValue,
    name: getNameTour?.[0] || "",
    categoriesDest,
    categoriesHotel,
    booking,
  };

  const check = paramsFilter?.size === 0 ? { NumberRangeValue } : value;

  return check;
};

export const GetParamsDateTour = (paramsFilter) => {
  const getParams = (val) => paramsFilter?.get(val);

  const filter = {
    guide: getParams("guideReady"),
    date: getParams("date"),
    booking: getParams("booking"),
    name: getParams("name"),
    guideAssigned: getParams("guideAssigned"),
  };

  return filter;
};

export const GetParamsBooking = (paramsFilter) => {
  const getParams = (val) => paramsFilter?.get(val);

  const filter = {
    date: getParams("date"),
    status: getParams("status"),
    totals: getParams("totals"),
    name: getParams("name"),
    group: getParams("group"),
  };

  return filter;
};

export const GetParamsAddNewGuide = ({ params }) => {
  const getParams = (val) => params?.get(val);

  const filter = {
    searchValue: getParams("searchValue"),
    role: getParams("role"),
  };

  return filter;
};
