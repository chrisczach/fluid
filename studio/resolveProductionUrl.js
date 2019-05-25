export default function resolveProductionUrl(document) {
  return `https://fluidpictures.netlify.com/preview?document=${document._id}`;
}
