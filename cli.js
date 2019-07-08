#!/usr/bin/env node

const _ = require("lodash")
const pkg = require('./package.json')
const generator = require('./scripts/generator.js')
const command = process.argv[2]
let _cmd_params = [];

switch (command) {
  case '-v':
  case '--version':
    console.log(pkg.version)
    break

  case '-h':
  case '--help':
    console.log(`Usage: zen-gen [options]
Options:  
  -v, --version  output the version number  
  -h, --help     output usage information 
  -c, --gen      generate chapter and nodes' options. 
                 cmd format: {current number} {next name} {next number} {next name} {next number} ...
                 example: zen-gen -c 1.md next_chapter_2_name 2 next_chapter_3_name 3 //当前章节为 1，下一个章节为 2 3
                 or: zen-gen 1 next_chapter_2_name 2 next_chapter_3_name 3 //当前章节为 1,默认为1.md文件
                 or: zen-gen next_chapter_2_name 2 next_chapter_3_name 3  // 默认为下个计数章节
                 The scripts/chapters.js and scripts/chapters.json will be rewrited by this command.
        `)
    break
  case '-c':
    _cmd_params = process.argv.slice(3);
  default:
    if (command != '-c') _cmd_params = process.argv.slice(2);
    if (_cmd_params.length == 0) {
      console.error("参数哦错误，输入 -h 查看帮助");
      break;
    }
    generator.generateChapter(_cmd_params)
    break;
} 