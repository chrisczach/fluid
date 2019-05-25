export default function resolveProductionUrl(document) {
  return `https://sonderfloral.netlify.com/preview?document=${document._id}`;
}
