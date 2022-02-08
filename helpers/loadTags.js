import config from "../config/app.js";
import TagService from "../services/tag.js";

export default function loadTag() {
  if (config.loadCustomTag) {
    (async () => {
      const docs = [
        { text: "javascript" },
        { text: "python" },
        { text: "java" },
        { text: "csharp" },
      ];

      const tags = await new TagService().getAll();

      if (!tags.length) {
        try {
          await new TagService().addMany(docs);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }
}
