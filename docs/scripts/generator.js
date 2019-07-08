#!node

//生成章节

const fs = require('fs');
const jsChapterFilePath = __dirname + '/chapters.js';
const jsChapterJSONPath = __dirname + '/chapters.json';
const chapters = require(jsChapterJSONPath);
const autoIntent = true;

const generateChapter = (cmd_input) => {

  fs.writeFileSync(jsChapterJSONPath + '.last-backup', JSON.stringify(chapters, null, autoIntent ? 4 : 0));
  if (cmd_input.length > 0 && isNaN(cmd_input[0])) {
    let maxChapterNum = 0;
    for (let _i in chapters) {
      if (_i - maxChapterNum > 0) maxChapterNum = _i;
    }
    cmd_input.unshift((parseInt(maxChapterNum) + 1).toString());
  }

  if (!cmd_input || 0 === cmd_input.length % 2) {
    console.error(`❌ Generate fail!  第一个参数为章节文件名，以后的参数为: 章节选项文案 章节编号,多个章节选项以此类推`);
    process.exit(0);
  }

  let chapter_file_name = cmd_input[0];

  if (-1 == chapter_file_name.indexOf('.md')) {
    chapter_file_name = chapter_file_name + ".md";
  }
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

  console.log("+current: " + chapter_name);
  for (let o of chapter_options) {
    chapterBody.push(o);
    console.log(" |--next: " + o[1] + ' ' + o[0]);

  }

  chapters[chapter_name] = chapterBody;

  let chaptersJSONText = JSON.stringify(chapters, null, autoIntent ? 4 : 0);
  fs.writeFileSync(jsChapterJSONPath, chaptersJSONText);
  fs.writeFileSync(jsChapterFilePath, `const chapters = ${chaptersJSONText}`);

  console.log(`✅ Generate success! ${chapter_name}`);
}
// console.log(convContent);

module.exports = {
  generateChapter
};