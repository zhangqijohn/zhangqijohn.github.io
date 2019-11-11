>### 可以用以下方法来规定 CSS 中的颜色：
>  > *十六进制色、RGB 颜色、RGBA 颜色、英文名颜色、HSL 颜色、HSLA 颜色、预定义/跨浏览器颜色名*

---------------------------

1. hex_number使用十六进制颜色：
  最常用,所有浏览器都支持十六进制颜色值。
    十六进制颜色是这样规定的：#RRGGBB，其中的 RR（红色）、GG（绿色）、BB（蓝色）十六进制整数规定了颜色的成分。所有值必须介于 0 与 F 之间。
```
p{
    color: #ff0000;
}
```

2. rgb_number 使用rgb 数值：
  所有浏览器都支持 RGB 颜色值。<br>
    RGB 颜色值是这样规定的：rgb(red, green, blue)。每个参数 (red、green 以及 blue) 定义颜色的强度，可以是介于 0 与 255 之间的整数，或者是百分比值（从 0% 到 100%）。
```
p{
    color:rgb(255, 0, 0);
    background-color:rgb(0, 100%, 100%);
}
```

3. rgba_number 使用rgba：
  RGBA 颜色值得到以下浏览器的支持：IE9+、Firefox 3+、Chrome、Safari 以及 Opera 10+。
    RGBA 颜色值是这样规定的：rgba(red, green, blue, alpha)。alpha 参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字。
```
p{
    color:rgba(255, 0, 0, 1);
    background-color:rgba(0, 100%, 100%, 1);
}
```

4. color_name 颜色的英文名：
  因为CSS 规范推荐的颜色名称仅支持少量，不建议在网页中使用颜色名,避免有些颜色名不被浏览器解析，或者不同浏览器对颜色的解释差异
    如： black（纯黑），silver（浅灰），navy（深蓝）， blue（浅蓝），green（深绿），lime	（浅绿），  teal（靛青），aqua（天蓝），maroon（深红），red	（大红），purple（深紫），fuchsia（品红），olive（褐黄），yellow（明黄），gray（深灰），white（壳白）
```
p{
    color:black;
    background-color:white;
}
```

5. hsl_name：
  HSL 颜色值得到以下浏览器的支持：IE9+、Firefox、Chrome、Safari 以及 Opera 10+。
    HSL 指的是 hue（色调）、saturation（饱和度）、lightness（亮度） - 表示颜色柱面坐标表示法。<br>
    H 是色盘上的度数（从 0 到 360） - 0 (或 360) 是红色，120 是绿色，240 是蓝色。S 是百分比值；0% 意味着灰色，而 100% 是全彩。L 同样是百分比值；0% 是黑色，100% 是白色。
```
p{
    color:hsl(360, 100%, 50%)
}
```
6.hsla_name:
 颜色值得到以下浏览器的支持：IE9+、Firefox 3+、Chrome、Safari 以及 Opera 10+。
    HSLA 颜色值是这样规定的：hsla(hue, saturation, lightness, alpha)，其中的 alpha 参数定义不透明度。alpha 参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字。
```
p{
    color:hsla(360, 100%, 50%, .6)
}
```

