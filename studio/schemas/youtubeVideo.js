export default {
  name: "youtube",
  title: "Youtube Video",
  type: "object",
  fields: [
    {
      name: "videoURL",
      title: "Youtube Video URL",
      type: "url",
      validation: Rule => Rule.required()
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "speed",
      title: "Playback Speed",
      type: "number"
    }
  ]
};
