webpack + es6 开发环境
================

当页面ajax获取数据的时候，我们通常会使用loading来提示用户加载情况。 不过我们常用的菊花loading仅仅起到提示用户的作用，但是

* 跟内容最终的呈现结果相差较大。
* 如果高度不一致的话 会造成页面的抖动，对用户造成一定的困扰。

所以如果html页面不能直出，我们会做一个骨架屏，来提示页面的结构，并表示loading。 如果动态获取数据，也需要类似的一个定高shell-loading来提示用户需要刷新的页面结构。

在模仿facebook的loading过程中，发现因渐变动画的参与，需要通过反扣内容 来展现真正的骨架结构，比较麻烦。 因为做了一个工具，可以按照正常方法进行页面布局，然后通过计算辅助我们建立对应的shell-loading。


### 如何使用

运行下面的命令，在打开的页面中查看使用说明。

    $ npm start


### 截图如下
![Screenshots](https://github.com/coocon/shell-loading/raw/master/Screenshots/1.gif)
