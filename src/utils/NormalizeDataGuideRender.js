export const NormalizeDataGuideRender = (value) => {
  const format = value?.map((el) => ({
    name: el.name,
    email: el.email,
    photo: el.photo,
    assignedAt: el.guideDataHandle?.assignedAt,
    totalHandle: el.guideDataHandle?.finishedHandle,
    rating: el.guideDataHandle?.ratingsAverage,
    ratingsQuantity: el.guideDataHandle?.ratingsQuantity,
    telphone: el.telphone,
  }));

  return format;
};
