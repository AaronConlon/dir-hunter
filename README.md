# Dir Hunter

<div>
  <img alt="node version" src="https://img.shields.io/badge/Node.js-18%2B-brightgreen" />
  <img alt="npm version" src="https://img.shields.io/npm/v/dir-hunter.svg" />
	<img alt="GitHub stars" src="https://img.shields.io/github/stars/Developer27149/dir-hunter.svg" />
  <img alt="download count" src="https://img.shields.io/npm/d18m/dir-hunter.svg" />
  <img alt="license" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img alt="license" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />  
</div>

使用其他语言阅读：[English](./README.en.md) | 简体中文

Dir Hunter 是一个Node.js命令行工具，可以帮助你快速搜索目录并执行命令。

https://github.com/Developer27149/dir-hunter/assets/23721611/fc136878-9276-4502-9452-39d602af68b3


## 安装




使用 npm 安装 Dir Hunter:

```bash
npm install -g dir-hunter
```

## 使用

```bash
➜  dh git:(main) ✗ dh -h
  ____  _        _   _             _            
 |  _ \(_)_ __  | | | |_   _ _ __ | |_ ___ _ __ 
 | | | | | '__| | |_| | | | | '_ \| __/ _ \ '__|
 | |_| | | |    |  _  | |_| | | | | ||  __/ |   
 |____/|_|_|    |_| |_|\__,_|_| |_|\__\___|_|   
                                                

Usage: directory-hunter [options] [keyword]

A simple CLI tool to search for directories and execute commands in your system

Arguments:
  keyword                    Directory keyword to search for

Options:
  -V, --version                     output the version number
  -d, --depth <value>               Search scope about the max depth of dir,default value   
                                    is 5
  -g, --gitignore <value>           Ignore directories listed in the .gitignore file        
                                    (default: true)
  -w, --windows-powershell <value>  Use windows powershell: cmd or powershell (default:     
                                    "powershell")
  -s, --skip-hidden <value>         Skip hidden directories (default: true)
  -h, --help                        display help for command
```



## 功能

- 快速搜索目录并显示结果
- 选择目录并执行自定义命令
- 支持排除 `.gitignore`指定的内容
- 可配置的选项



## 贡献

如果你发现任何问题或者有任何改进意见，欢迎提交PR。

## 许可

[MIT](LICENSE)

