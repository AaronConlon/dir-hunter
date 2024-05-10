# Dir Hunter

<div>
  <img alt="node version" src="https://img.shields.io/badge/Node.js-18%2B-brightgreen" />
  <img alt="npm version" src="https://img.shields.io/npm/v/dir-hunter.svg" />
	<img alt="GitHub stars" src="https://img.shields.io/github/stars/Developer27149/dir-hunter.svg" />
  <img alt="download count" src="https://img.shields.io/npm/d18m/dir-hunter.svg" />
  <img alt="license" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img alt="license" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
</div>

Select Language: English|  [简体中文](./README.md)

Dir Hunter is a Node.js command-line tool that helps you quickly search directories and execute commands.

[![Dir Hunter Demo](./record.mp4)](https://github.com/Developer27149/dir-hunter/assets/23721611/fc136878-9276-4502-9452-39d602af68b3)

## Installation

Install Dir Hunter using npm:

```bash
npm install -g dir-hunter
```

## Usage

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

## Features

- Quickly search directories and display results
- Select directories and execute custom commands
- Support exclusion of contents specified in `.gitignore`
- Configurable options

## Contributing

If you find any issues or have any improvement suggestions, feel free to submit a PR.

## License

[MIT](LICENSE)
