(function($){
    //请求数据
    function requestData(){
        $.ajax({
            url:"/queryAll",
            type:"get",
            success: function (data) {
                var dataList = JSON.parse(data).data;
                var size = 5;
                $('.page').createPage({
                    pageCount:parseInt((dataList.length + size) / size),
                    current:1,
                    backFn:function(p){
                        var page = p - 1;
                        requestNewsByPage(page,size);
                    }
                });
                renderNews(dataList);
            },
            error: function (error) {
                console.log(error)
            }
        });
    }

    function requestNewsByPage(page,pageSize) {
        $.ajax({
            url: "/queryNewsByPage?page=" + page + "&pageSize=" + pageSize,
            type: "get",
            success: function (data) {
                var dataList = JSON.parse(data).data;
                renderNews(dataList);
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
    function renderNews(data) {
        $(".wrapper .rendenNews").html("");
        var str = "";
        var len = data.length;
        for(var i = 0; i < len; i ++) {
            if(i == 5) {
                break;
            }
            str += "<div class=\"content_box\">\n" +
                "                <a href=\"/frontstage/news_detail.html?bid="+ data[i].id+"\">\n" +
                "                    <div class=\"list_box clearfix\">\n" +
                "                        <div class=\"image_box\">\n" +
                "                            <img src=\"../"+ data[i].news_image +"\" alt=\"\">\n" +
                "                        </div>\n" +
                "                        <div class=\"text_box\">"+ data[i].news_title +"</div>\n" +
                "                    </div>\n" +
                "                </a>\n" +
                "            </div>"
        }
        $(".wrapper .rendenNews").append(str)

    }
    requestData();

    //模糊查询数据
    function blurNews() {
        var btn = $(".search_btn");
        var errorCode = $(".input_text");
        errorCode.on("keypress",function (e) {
            if(e.keyCode == 13) {
                btn.trigger("click");
            }
        })
        btn.on("click",function (e) {
            var blurText = $(".input_text").val();
            if(blurText == "") {
                requestData();
            } else {
                queryBlurNews(blurText);
            }
        })
        function queryBlurNews(blurText) {
            $.ajax({
                url: "/queryNewsByBlur?text=" + blurText,
                type: "get",
                success: function(data) {
                    var dataList = JSON.parse(data).data;
                    if(dataList.length == 0) {
                        $(".wrapper .rendenNews").html("");
                        var str = "<div style='text-align: center'>对不起，没有搜索到类似的新闻！</div>";
                        $(".wrapper .rendenNews").append(str)
                        $(".wrapper .page").html("");
                    } else {
                        var size = 5;
                        $('.page').createPage({
                            pageCount:parseInt((dataList.length + size) / size),
                            current:1,
                            backFn:function(p){
                                var page = p - 1;
                                requestNewsByPage(page,size);
                            }
                        });
                        renderNews(dataList)
                    }

                },
                error: function(error) {
                    console.log(error)
                }

            })
        }
    }
    blurNews();


    // init作为实现功能的入口函数  传入参数 dom为父级元素  args为参数
    function init(dom, args) {
        // 判断可以实现的条件  当前选中页数小于总页数
        if (args.current <= args.pageCount) {
            // fillHtml根据当前页数渲染html结构
            fillHtml(dom, args);
            // 每一个按钮绑定上点击事件
            bindEvent(dom, args);
        } else {
            alert('请输入正确页数')
        }
    }
    function fillHtml(dom, args) {
        // 每次在渲染之前清空父级元素 重新根据操作渲染每一个按钮
        dom.empty();
        // 渲染上一页按钮 如果大于1上一页按钮为可按的
        if (args.current > 1) {
            dom.append('<a href = "#" class="prevPage">上一页</a>');
            // 如果当前页数为第一页 则为不能点击的按钮显示
        } else {
            dom.remove('.prevPage');
            dom.append('<span class="disabled">上一页</span>');
        }
        //中间页数
        // 插入第一页
        if (args.current != 1 && args.current >= 4) {
            dom.append('<a href = "#" class="tcdNumber">' + 1 + '</a>');
        }
        // 插入...
        if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
            dom.append('<span>...</span>');
        }
        // 根据循环生成中间页数 start为开始页数
        var start = args.current - 2;
        // end为开始页数
        var end = args.current + 2;
        for (; start <= end; start++) {
            // 生成大于1与总页数之间的页数
            if (start <= args.pageCount && start >= 1) {
                // 除了选中后其他页数样式显示
                if (start != args.current) {
                    dom.append('<a href = "#" class="tcdNumber">' + start + '</a>');
                    // 当前选中页数显示
                } else {
                    dom.append('<span class="current">' + start + '</span>');
                }
            }
        }

        // 生成尾部与中间...
        if (args.current + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }

        // 插入最后一页
        if (args.current != args.pageCount && args.current < args.pageCount - 2) {
            dom.append('<a href="#" class="tcdNumber">' + args.pageCount + '</a>');
        }
        // 渲染下一页按钮 可以点击的即为当前选中页数小于总页数
        if (args.current < args.pageCount) {
            dom.append('<a href = "#" class="nextPage">下一页</a>');
        } else {
            // 如果当前页数为最后一页 则为不能点击的按钮显示
            dom.remove('.nextPage');
            dom.append('<span class="disabled">下一页</span>');
        }
    }
    function bindEvent(obj, args) {
        //点击页码  相当于修改参数  将当前选中页数为点击这一页
        obj.on('click', '.tcdNumber', function () {
            var current = parseInt($(this).text());
            changePage(obj, args, current);
        })
        //上一页
        // a.prevPage   规定只能添加到指定的子元素上的事件处理程序
        // 点击上一页将current切换为当前current-1
        obj.on('click', '.prevPage', function () {
            var current = parseInt(obj.children('.current').text());
            changePage(obj, args, current - 1);
        })
        //下一页
        // 点击上一页将current切换为当前current+1
        obj.on('click', '.nextPage', function () {
            var current = parseInt(obj.children('.current').text());
            changePage(obj, args, current + 1);
        })
    }

    // 抽取出点击
    function changePage(dom, args, page) {
        // 改变参数后再次调用fillHtml根据参数渲染结构
        fillHtml(dom, { 'current': page, 'pageCount': args.pageCount });
        // 同时 切换页数后  如果回调函数存在 执行回调函数
        if (typeof (args.backFn == "function")) {
            args.backFn(page);
        }
    }
    // 在jquery的原型上扩展createPage方法  利用extend方法进行参数合并
    // 再调用init方法 ，将参数传递过去，init函数为初始化函数 实现生成翻页插件结构
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 5,
            current: 1,
            backFn: function () { }
        }, options);
        init(this, args)
    }

}($))
