export default {
  type: "object",
  name: "slideshow",
  title: "Slideshow",
  fields: [
    {
      type: "array",
      name: "slides",
      title: "Photos",
      of: [{ type: "image" }],
      options: {
        layout: "grid"
      }
    }
  ]
};
