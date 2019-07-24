export default function resolveProductionUrl(document) {
  return `http://localhost:8000/preview?document=${document._id}`;
}
