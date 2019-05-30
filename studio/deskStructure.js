import S from "@sanity/desk-tool/structure-builder";
import MdBusiness from "react-icons/lib/md/business";
import MdSettings from "react-icons/lib/md/settings";
import FaFileO from "react-icons/lib/fa/file-o";

const hiddenTypes = [
  "category",
  "companyInfo",
  "page",
  "person",
  "post",
  "equipment",
  "siteSettings"
];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        )
        .icon(MdSettings),
      S.listItem()
        .title("Company Info")
        .child(
          S.editor()
            .id("companyInfo")
            .schemaType("companyInfo")
            .documentId("companyInfo")
        )
        .icon(MdBusiness),
      S.listItem()
        .title("Home Page")
        .child(
          S.editor()
            .id("homePage")
            .schemaType("page")
            .documentId("home")
        )
        .icon(FaFileO),
      S.listItem()
        .title("About Page")
        .child(
          S.editor()
            .id("aboutPage")
            .schemaType("page")
            .documentId("about")
        )
        .icon(FaFileO),
      S.listItem()
        .title("Contact Page")
        .child(
          S.editor()
            .id("contactPage")
            .schemaType("page")
            .documentId("contact")
        )
        .icon(FaFileO),
      S.listItem()
        .title("Equipment Category Page")
        .child(
          S.editor()
            .id("equipmentPage")
            .schemaType("page")
            .documentId("equipment")
        )
        .icon(FaFileO),
      S.listItem()
        .title("Equipment Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Equipment Categories")),
      S.listItem()
        .title("Equipment")
        .schemaType("equipment")
        .child(S.documentTypeList("equipment")),
      S.listItem()
        .title("People")
        .schemaType("person")
        .child(S.documentTypeList("person").title("People")),
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
    ]);
