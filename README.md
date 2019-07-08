交互式小说写作框架
----

样例为转自 [《职员默示录 - 启》](https://github.com/gs3170981/relax-for-a-moment) 的交互式小说

# Install

```
npm install
```

# Version

```
zen-gen -v
```

# Help

```
zen-gen -h
```

# Usage

```
Usage: zen-gen [options]
Options:  
  -v, --version  output the version number  
  -h, --help     output usage information 
  -c, --gen      generate chapter and nodes' options. 
                 cmd format: {current number} {next name} {next number} {next name} {next number} ...
                 example: zen-gen -c 1.md next_chapter_2_name 2 next_chapter_3_name 3 //当前章节为 1，下一个章节为 2 3
                 or: zen-gen 1 next_chapter_2_name 2 next_chapter_3_name 3 //当前章节为 1,默认为1.md文件
                 or: zen-gen next_chapter_2_name 2 next_chapter_3_name 3  // 默认为下个计数章节
                 The scripts/chapters.js and scripts/chapters.json will be rewrited by this command.
```

# Generate Chapter

```
zen-gen -c 1.md 工作吧 2 心情不好 3 上厕所 4
```

# Develop Preview

```
index.html
```

# Publish

https://codefarmer.art/programer-zen-life/index.html

