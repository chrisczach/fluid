import MdSettings from "react-icons/lib/md/settings";

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon: MdSettings,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      validation: Rule => Rule.required(),
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "logo",
      title: "Logo",
      type: "mainImage",
      validation: Rule => Rule.required()
    },
    {
      name: "background",
      title: "Background Image",
      type: "mainImage",
      validation: Rule => Rule.required()
    },
    {
      name: "heroVideo",
      title: "Hero Splash Video",
      type: "youtube",
      validation: Rule => Rule.required()
    },
    {
      name: "primaryLight",
      title: "Primary Light",
      type: "color",
      validation: Rule => Rule.required(),
      options: {
        disableAlpha: true
      }
    },
    {
      name: "accentLight",
      title: "Accent Light",
      type: "color",
      validation: Rule => Rule.required(),
      options: {
        disableAlpha: true
      }
    },
    {
      name: "brandAccent",
      title: "Brand Accent",
      type: "color",
      validation: Rule => Rule.required(),
      options: {
        disableAlpha: true
      }
    },
    {
      name: "accentDark",
      title: "Accent Dark",
      type: "color",
      validation: Rule => Rule.required(),
      options: {
        disableAlpha: true
      }
    },
    {
      name: "primaryDark",
      title: "Primary Dark",
      type: "color",
      validation: Rule => Rule.required(),
      options: {
        disableAlpha: true
      }
    }
  ]
};
