export const getFieldValue = (item, field) => {
  switch (field) {
    case "name":
      return item.track.name;
    case "artists":
      return item.track.artists[0]?.name;
    case "added_at":
      return item.added_at;
    default:
      return item.track.name;
  }
};
