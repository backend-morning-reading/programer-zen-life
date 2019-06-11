#!/usr/bin/env node

const _ = require("lodash")
const pkg = require('./package.json')
const generator = require('./scripts/generator.js')
const command = process.argv[2]
let _cmd_params = process.argv.slice(3);

switch (command) {
  case '-v':
  case '--version':
    console.log(pkg.version)
    break
  case '-c':
    generator.generateChapter(_cmd_params)
    break;
  case '-h':
  case '--help':
  default:
    console.log(`Usage: zen-gen [options]
Options:  
  -v, --version  output the version number  
  -h, --help     output usage information 
  -c, --gen      generate chapter and nodes' options. 
                 example: zen-gen -c 1.md next_chapter_1 2 next_chapter_3 3
                 The scripts/chapters.js and scripts/chapters.json will be rewrited by this command.
        `)
    break
} 