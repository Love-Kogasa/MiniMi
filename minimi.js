// MiniParser标记语言，偷懒专用(
function miniMiParser( basic, globalCode, autoc = true ){
  var symbolSp = "#_(5$5$7$56#"
  function objectify( code = globalCode, based = basic ){
    var object = typeof based != "object" ? ""
      : Array.isArray( based ) ? [] : {}
    if( object === "" ){
      if(typeof based == "string"){
        code = code.replaceAll( "@", based )
        while( code.includes( "#" ) ) code = code.replace( "#", uuidv4() )
        object = readSpecChar( code ) || based
      } else if(typeof based == "number"){
        // console.log(code, last)
        while( code.includes( "#" ) ) code = code.replace( "#", Math.floor(Math.random()*100) )
        if( code[0] ){ object = based + Number( code.slice(1) ) }
        else object = Number( code );
        (isNaN( object ) || code == "") && (object = based)
      } else {
        object = !!code
      }
    } else {
      var keyArray = [], lasted = "", usedKey = []
      for( let indexBlock = 0; indexBlock < code.split( " " ).length; indexBlock++ ){
        let theObject = based, block = code.split( " " )[indexBlock]
        if( keyArray[0] != void 0 ){
          theObject = eval( "based" + getKey( keyArray))
        }
        function keyFor( bc, obj ){
          let similarKey = [0, 0, ""]
          for( let key of Object.keys( obj)){
            let similarData
            if( similarKey[0] < (similarData=similar( bc, key ))[0]){
              similarKey[0] = similarData[0]
              similarKey[1] = key
              similarKey[2]= similarData[1]
            }
          }
          return similarKey
        }
        if( block === "" ){
          var matched = false
          // console.log(keyArray)
          for( let key of Object.keys(theObject) ){
            if( typeof theObject[key] === "object" && !usedKey.includes( getKey( [...keyArray,key]) ) ){
              matched = true
              keyArray.push( key )
              usedKey.push( getKey( keyArray) )
              if( Array.isArray( theObject[key])){
                eval( "object" + getKey( keyArray ) + "= []" )
              } else {
                eval( "object" + getKey( keyArray ) + "= {}" )
              }
              break;
            }
          }
          if( !matched ){
            if( keyArray.length == 0 ){
              console.log( "[Error] 代码块指向一个不应存在的值" )
            } else {
              indexBlock -= 1
              keyArray.pop()
            }
          }
        } else if( block[0] == "." ){
          var matched = false
          for( let key of Object.keys(theObject) ){
            if( typeof theObject[key] != "object" && !usedKey.includes( getKey( [...keyArray,key]) ) ){
              matched = true
              usedKey.push( getKey( [...keyArray,key]) )
              try {
                eval( "object" + getKey( [...keyArray, key]) + "= objectify( block.slice(1), theObject[key] )" )
              } catch( err ){
                console.log( "[Error] 代码块指向一个不应存在的值" )
              }
              break;
            }
          }
          if( !matched ){
            if( keyArray.length == 0 ){
              console.log( "[Error] 代码块指向一个不应存在的值" )
            } else {
              indexBlock -= 1
              keyArray.pop()
            }
          }
        } else if( block === "!" ){
          var matched = false
          for( let key of Object.keys(theObject) ){
            if( typeof theObject[key] === "boolean" && !usedKey.includes( getKey( [...keyArray,key]) ) ){
              matched = true
              usedKey.push( getKey( [...keyArray,key]) )
              try {
                eval( "object" + getKey( [...keyArray, key]) + "= !theObject[key]" )
              } catch( err ){
                console.log( "[Error] 代码块指向一个不应存在的值" )
              }
              break;
            }
          }
          if( !matched ){
            if( keyArray.length == 0 ){
              console.log( "[Error] 代码块指向一个不应存在的值" )
            } else {
              indexBlock -= 1
              keyArray.pop()
            }
          }
        } else if( block === "@" ){
          keyArray = []
        } else {
          let data = keyFor(block,  theObject)
          if( usedKey.includes( getKey( [...keyArray, data[1]])) || data[0] == 0  ){
            if( keyArray.length == 0 ){
              console.log( "[Error] 代码块 " + block + " 指向一个不应存在的值" )
            } else {
              indexBlock -= 1
              keyArray.pop()
            }
          } else {
            usedKey.push( getKey( [...keyArray, data[1]]))
            if( typeof theObject[data[1]] != "object" ){
              try {
                eval( "object" + getKey( [...keyArray, data[1]]) + "= objectify( data[2], theObject[ data[1] ] )" )
              } catch( err ){
                console.log( "[Error] 代码块 " + block + " 指向一个不应存在的值" )
              }
            } else if( Array.isArray( theObject[data[1]] ) ){
              keyArray.push( data[1])
              eval( "object" + getKey( keyArray ) + "= []" )
            } else {
              keyArray.push( data[1])
              eval( "object" + getKey( keyArray ) + "= {}" )
            }
          }
        }
      }
    }
    return object
    function readSpecChar( string ){
      string = string.replaceAll( "\\\\", symbolSp )
      var map = {
        "_": " ",
        "n": "\n",
        "t": "\t",
        "0": "\0",
        "e": "~",
        "r": "#",
        "a": "@"
      }
      for( let key of Object.keys( map )){
        string = string.replaceAll( "\\" + key, map[key])
      }
      return string.replaceAll( symbolSp, "\\" )
    }
  }
  var object = objectify()
  function autoCompletion( object, based = basic ){
    for( let key of Object.keys( based ) ){
      if( !object[key] ){
        console.log( "[Warning] 代码缺少对象 " + key + " 已自动补全" )
        object[key] = based[key]
      } else if( typeof object[key] == "object" ){
        autoCompletion(object[key], based[key])
      }
    }
    return object
  }
  return !autoc ? object : typeof object === "object" ? autoCompletion( object ) : object
  function getKey( keyArray ){
    var keyEval = ""
    for( let key of keyArray ){
      keyEval += JSON.stringify([key])
    }
    return keyEval
  }
  function similar( string1, string2 ){
    var similar = 0, organize = string2.length
    for( let char of string1 ){
      if( string2.includes( char )){
        string2 = string2.slice( string2.indexOf( char ) + 1)
        string1 = string1.replace( char, "" )
        similar += 1
      } else break;
    }
    return [parseInt((similar / organize) * 100), string1]
  }
  function uuidv4(){
    var uBase = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".split( "" )
    for( let char in uBase ){
      if( uBase[char] == "x" ) uBase[char] = parseInt(Math.random()*36).toString(36)
    }
    return uBase.join("")
  }
}

if( typeof module == "object" ) module.exports = miniMiParser
// console.log(miniMiParser({key: "value", number: 1, object: { boolean: false, array: [ "" ] }, array: [ 2, 3, "_" ], uuid: ""}, ".e n o !  0s 1t a 01 1@4 d#"))