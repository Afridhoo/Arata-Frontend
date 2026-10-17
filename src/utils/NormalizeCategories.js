export default function NormalizeCategories({ categories }) {
  return categories?.map((el) => ({
    label: el.categoriesTour,
    desc: el.description,
    _id: el._id,
  }));
}
