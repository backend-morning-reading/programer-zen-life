#!node

//生成章节

const fs = require('fs');
const generateChapter = (cmd_input) => {
  const jsChapterFilePath = './scripts/chapters.js';
  const jsChapterJSONPath = './scripts/chapters.json';
  const autoIntent = true;
  if (!cmd_input || 0 === cmd_input.length % 2) {
    console.error(`❌ Generate fail!  第一个参数为章节文件名，以后的参数为: 章节选项文案 章节编号,多个章节选项以此类推`);
    process.exit(0);
  }

  let chapter_file_name = cmd_input[0];

  let chapter_options = [];
  for (let i = 1; cmd_input[i]; i += 2) {
    chapter_options.push([cmd_input[i], cmd_input[i + 1]]);
  }

  chapter_name = chapter_file_name.replace(".md", '');
  chapter_name = chapter_name.replace(/ \,\'\"\./g, '-');


  let fileContent = fs.readFileSync(`./chapters/${chapter_file_name}`, {
    encoding: 'utf8'
  });
  let chapterBody = [
    [fileContent]
  ];
  for (let o of chapter_options) {
    chapterBody.push(o);
  }

  let chaptersJSONText = fs.readFileSync(jsChapterJSONPath, {
    encoding: 'utf8'
  });

  let chaptersJSON = JSON.parse(chaptersJSONText);
  chaptersJSON[chapter_name] = chapterBody;

  chaptersJSONText = JSON.stringify(chaptersJSON, null, autoIntent ? 4 : 0);
  fs.writeFileSync(jsChapterJSONPath, chaptersJSONText);
  fs.writeFileSync(jsChapterFilePath, `const chapters = ${chaptersJSONText}`);

  console.log(`✅ Generate success! ${chapter_name}`);
}
// console.log(convContent);

module.exports = {
  generateChapter
};