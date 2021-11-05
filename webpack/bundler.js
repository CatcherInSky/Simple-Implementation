const fs = require('fs');
const path = require('path');
const babylon = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const ENTRY = './src/entry.js';
const OUTPUT = './build/output.js';
let ID = 0;
/**
 * 分析文件信息，通过babel将代码转译为AMD格式
 * @param {string} filename 文件相对路径
 * @returns {Asset} 文件信息
 * 
 * @typedef {Object} Asset 
 * @property {number} id 唯一标识符
 * @property {number} filename 文件相对路径
 * @property {string} code 转译后代码
 * @property {Array<string>} dependenncies 该文件依赖列表
 * @property {object} mapping 子依赖的哈希表，结构为 { ${filename} : ${id} }
 */
function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const dependencies = [];
  // 文件标识符，可改hash
  const id = ID ++;

  // 通过AST找到import语法对应语句，将依赖输入依赖列表
  // module => ast => dependences => module 
  const ast = babylon.parse(content, {
    sourceType: 'module'
  });
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    }
  });

  // ES6 转为 ES5， import改require
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  });

  return {
    id, filename, dependencies, code, mapping: {}
  };
}
/**
 * 从入口文件开始，遍历所有文件的依赖列表，生成文件信息集合（依赖关系图）
 * @param {string} entry 
 * @returns {Array<Asset>} 文件信息集合
 */
function createGraph(entry) {
  // 从入口文件开始遍历
  const queue = [createAsset(entry)];
  for(const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      // 遍历子依赖
      const child = createAsset(absolutePath);
      // 子依赖filename和id的哈希表
      asset.mapping[relativePath] = child.id;
      // 不断将子依赖加入队列
      queue.push(child);
    });
  }
  return queue;
}
/**
 * 根据文件信息集合，生成modules，最终拼接成chunk
 * @param {Graph} graph 
 * @returns {string}
 */
function bundle(graph) {
  let modules = '';
  graph.forEach(asset => {
    modules += `${asset.id}: [
      function (require, module, exports) {
        ${asset.code}
      },
      ${JSON.stringify(asset.mapping)},
    ],`;
  });

  const chunk = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        }
        const module = {exports: {}}
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

  return chunk;
}

// 根据chunk生成bundle文件
fs.writeFileSync(
  OUTPUT, 
  bundle(
    createGraph(ENTRY)
  )
);