const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const genDocs = () => {
  let paths = {};
  const docsFolder = path.join(__dirname, "..", "docs/swagger");
  const mainDoc = YAML.parse(
    fs.readFileSync(path.join(docsFolder, "main.yaml"), "utf8")
  );

  const files = fs.readdirSync(docsFolder);

  files.forEach((file) => {
    if (path.extname(file) === ".yaml" && file !== "main.yaml") {
      const subDoc = YAML.parse(
        fs.readFileSync(path.join(docsFolder, file), "utf8")
      );
      paths = { ...paths, ...subDoc.paths };
    }
  });

  return {
    ...mainDoc,
    paths,
  };
};

module.exports = { genDocs };
