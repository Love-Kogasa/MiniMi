# MiniMi
世界上最偷懒的标记语言(大概.  
这个图个乐就行了，别在多人项目里用，害人害己，以及代码由于最初设计问题，就是依托构思，别看(
## 食用教程
直接用最简Mode各位90%看不明白，所以我还是一点一点来吧
#### 基础语法
MiniMi没有数组，对象之类的详细分类，只有代码块的概念，其类型推断完全依赖其用于类型检查的json(任意一份json都行，直接把文档的json拽过来就行).  
假如json是 `{"hello": "xxx", "world": 1 }`.  
则minimi里则应该是
```
helloHello world3
```
使用cli编译，得到输出
```json
{
  "hello": "Hello",
  "world": 3
}
```
看明白了吗，在MiniMi中数据的存储形式是`keyvalue`这样存储的，以 分割变量  
Ok，接下来，语法就要变得奇怪了🥵  
示例用Json
```json
{
  "key": "value",
  "number": 2,
  "object": {
    "array": [0, 1]
  },
  "boolean": true,
  "array": [3, 4, "_"]
}
```
MiniMi代码
```
yabc n5 o a 01 ay 02
```
是的，MiniMi的标签可以任意简写，也建议简写，建议使用标签的最后几个字符作为简写标签，并且不用手动替换作用对象  
输出(启用自动补全)
```json
{
  "key": "abc",
  "number": 5,
  "object": {
    "array": [1, 1]
  },
  "boolean": true,
  "array": [2, 4, "_"]
}
```
让我们再简化
```
.abc .5   01 @  02
```
这段MiniMi代码也能达到一样的效果，这使用了MiniMi里的几个特殊代码块
当你想选择对象下的一个对象时，你可以直接跳过这个代码块(代码块为"")  
这种操作的重复使用是被允许的，而且并不会重复于同一个对象下，如果所有对象都被访问过将会跳出当前对象  
如果你想选择一个非对象变量，则可以使用.作为key，其顺序与json相同，当所有非对象数据都被访问过，则跳出当前对象  
当对象嵌套了太多层，重复使用""不是明智的选择，您可以尝试使用@将作用域移回最顶层  
  
当修改boolean变量时，我们可以使用""，也就是什么也不写，代替false，用任意键代替true  
当我们需要使用 作为字符串时，可以使用\\\_代替" "  
转义字符表
| 字符 | 所代表的字符 |
| \\\_ | 空格 |
| \\n | 空行(值得一提MiniMi允许空行和制表符) |
| \\t | 制表符 |
| \\0 | 空字符 |
| \\a | # |
| \\e | ~ |
| \\r | @ |

#### 高级语法
~~一点也不高级~~
当你想访问一个boolean变量并更改其value时，只需要使用?单做一个代码块即可，逻辑与.相同，同时，当你不想改变某个变量的值是，可以直接用.或者跳过，用.可以使变量指向下一者  
Uuid/随机数字 生成  
假如有个json，第一个是string类型的uuid，第二个是int类型的id
```
.# .#
```
这段MiniMi代码将会生成一个uuid和一个0-99的随机整数  
更改原值，使用@可以更改原值，假如json两个变量一个是"name",一个是0
```
.@-# .@1
```
生成的json中第一个是name-uuid，第二个是1，在字符串中@表示原字符串，在数字中，表示原数字加后面的的数字(可以是负数)
## 示例
生成一个MinecraftAddon数据包的json.  
示例(使用下面json作为类型)
```json
{
    "format_version": 2,
    "header": {
        "description": "",
        "name": "",
        "uuid": "",
        "version": [0, 0, 1],
        "min_engine_version": [ 1, 20, 0 ]
    },
    "modules": [
        {
            "type": "data",
            "uuid": "",
            "version": [0, 0, 1]
        }
    ]
}
```
MiniMi 代码
```
 .description .name d# @   d#
```
编译
```
ms path.json path.m
```
输出
```
{
  "header": {
    "description": "description",
    "name": "name",
    "uuid": "4nqou8pj-hzxr-4v2q-kng5-c1ywrs7sig1s",
    "version": [
      0,
      0,
      1
    ],
    "min_engine_version": [
      1,
      20,
      0
    ]
  },
  "modules": [
    {
      "uuid": "mkkullwf-ep9o-48xk-4q64-25cx2vpo5vqj",
      "type": "data",
      "version": [
        0,
        0,
        1
      ]
    }
  ],
  "format_version": 2
}
```

# 其他
我在想要不要叫 JsonFuck，不过还没想好