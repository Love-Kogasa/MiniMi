var m = require( "./minimi" )
var fs = require( "fs" )
var args = process.argv.slice(2)
if( args[0] && args[1] ){
  console.log( "[info] 开始编译文件" )
  try {
    var outobject = m( JSON.parse(fs.readFileSync(args[0]).toString()), fs.readFileSync(args[1]).toString(), !args.includes("-cac") )
    fs.writeFileSync( args[2] || (args[0] + ".json"), JSON.stringify( outobject, 0, 2 ) )
  } catch( err ){
    console.error(err)
    console.log( "[error] " + err.toString() )
  }
} else {
  console.log([
    "MiniMi Cli Syntax: ms <TypeFile.json> <MiniMi.m> [savepath=@.json] [option]",
    "\t-cac 关闭自动补全(补全缺少的对象)", "",
    "copyright 2025 @Love-Kogasa"
  ].join("\n"))
}