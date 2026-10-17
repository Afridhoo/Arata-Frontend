export const handleCoords = (value, typeLocation) =>
  value?.map((el) => ({
    lat: el.geometry?.coordinates[1],
    lon: el.geometry?.coordinates[0],
    description: el.properties?.name,
    id: el?.properties?.place_id,
    address: el?.properties?.address_line2,
    categories: el?.properties?.datasource?.raw?.tourism,
    type: el?.type || null,
    typeLocation: el.typeLocation || typeLocation,
  }));

export const displayResultSearch = (value) => {
  const format = {
    coordinates: [Number(value.lon), Number(value.lat)],
    address: value.display_name,
    description: `${value.name}`,
    categories: value.type,
  };

  const polygon = value.geojson;
  const latlng = [value.lon, value.lat];

  return {
    startLocation: format,
    polygon,
    latlng: latlng,
  };
};

export const formatResultSearch = (val, type) =>
  val?.map((value) => {
    const { properties, typeLocation } = value;

    const { name, lat, lon, address_line2, datasource, place_id } = properties;
    const { tourism: categories } = datasource.raw;

    const format = {
      typeLocation: typeLocation || type,
      coordinates: [lon, lat],
      address: address_line2,
      description: name,
      categories,
      id: place_id,
    };

    return format;
  });

export const filterBy = (value, type) => {
  const result = value?.filter((el) => el.typeLocation === type);

  if (result?.length > 0) return result;
  else return false;
};
