#!node

//生成章节

const fs = require('fs');
const _ = require("lodash")
const jsChapterFilePath = './scripts/chapters.js';
const replaceFlag = "//--CHAPTER_ADD_HERE--DO_NOT_MODIFY_THIS_LINE--//";

let _i = _.values(process.argv);
_i.shift();
_i.shift();
let cmd_input = _i;

if (0 === cmd_input.length % 2) {
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
let convContent = {}
let chapterBody = [
  [fileContent]
];
for (let o of chapter_options) {
  chapterBody.push(o);
}

convContent = `${chapter_name}: ` + JSON.stringify(chapterBody);

let jsFileContent = fs.readFileSync(jsChapterFilePath, {
  encoding: 'utf8'
});

jsFileContent = jsFileContent.replace(replaceFlag, `${convContent},\n${replaceFlag}`);

fs.writeFileSync(jsChapterFilePath, jsFileContent);
console.log(`✅ Generate success! ${chapter_name}`);
// console.log(convContent);
