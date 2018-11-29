

;(function(win, $) {
    var _count = 0;
    var Mykeyboard = function(element, options) {
        _count ++;
        this.count = _count;
        this.$element = $(element);
        this.$element.attr("data-count", this.count);
        this.options = $.extend({}, $.fn.mykeyboard.defaults, options);
        this.init();
    };
    Mykeyboard.prototype = {
        constructor: Mykeyboard,
        init:function(){
            var me= this;
            me.render();
            me.bind();
            // me.initHtml();
        },
        render: function(){
            var me = this;
            me.$eparentNode = me.$element.parent();
        },
        bind: function(){
            var me = this;
            me.$element.on("click",$.proxy(me['_eClick'],me));
        },

        _eClick: function(e) {
            var me = this;
            if($('#xfjr-x-key-box').length <= 0) {
                me.initKeyHtml();
            }
            setTimeout(function() {
                me.slideUp();
            }, 0);
        },
        slideUp: function() {
            this._$box.show().animate({bottom: 0}, 500);
        },
        slideDown: function() {
            var me = this;
            this._$box.animate({bottom: '-65vw'}, 350, function() {
                me._$box.hide();
            });
        },
        initKeyHtml: function() {
            var me = this;
            var _html = [
                '<div id="xfjr-x-key-box">',
                    '<p class="key-title">哈银消费金融<span id="down">▼</span></p>',
                    '<div class="keys-container">',

                        '<ul class="key-line-01"></ul>',
                        '<ul class="key-line-02"></ul>',
                        '<ul class="key-line-03"></ul>',
                        '<ul class="key-line-04"></ul>',

                        '<div class="key-tip"></div>',
                        '<div class="key-tip-q"></div>',
                        '<div class="key-tip-p"></div>',
                    '</div>',
                '</div>',
            ].join("");

            me._$box = $(_html).css('bottom', '-65vw').appendTo($('body'));
            me.initKeys();
        },
        initKeys: function() {
            var me = this;
            var $box = $('#xfjr-x-key-box');
            var $keyscontainer = $box.find('.keys-container');

            var $line_01 = $box.find('.key-line-01');
            var $line_02 = $box.find('.key-line-02');
            var $line_03 = $box.find('.key-line-03');
            var $line_04 = $box.find('.key-line-04');

            var $tip = $box.find('.key-tip');
            var $tip_p = $box.find('.key-tip-p');
            var $tip_q = $box.find('.key-tip-q');


            // 默认
            var $keys_01, $keys_02, $keys_03, $keys_04;
            var enArr_01 = ['q', 'w', 'e', 'r', 't', 'y','u', 'i', 'o', 'p'];
            var enArr_02 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
            var enArr_03 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
            var enArr_04 = ['123', '空格', '#+='];
            $keyscontainer.addClass('type-en').removeClass('type-123').removeClass('type-char');
            $keys_01 = $('<li>' + enArr_01.join('</li><li>') + '</li>');
            $keys_02 = $('<li>' + enArr_02.join('</li><li>') + '</li>');
            $keys_03 = $('<li class="type-li-shift">shift</li>' + '<li>' + enArr_03.join('</li><li>') + '</li>' + '<li class="type-li-del">del</li>');
            $keys_04 = $('<li>' + enArr_04.join('</li><li>') + '</li>');
            $line_01.html($keys_01);
            $line_02.html($keys_02);
            $line_03.html($keys_03);
            $line_04.html($keys_04);


            $box.find('#down').click(function() {
                me.slideDown();
            });
            //
            var textVal;
            $box.on('touchstart', '.type-en li', function () {
                var $this = $(this);
                var val = $this.text();
                if (!val) {
                    return
                }
                textVal = val;
                if (val === '#+=') {
                    var $keys_01, $keys_02, $keys_03, $keys_04;
                    var enArr_01 = ['!', '@', '#', '$', '%', '^','&', '*', '(', ')'];
                    var enArr_02 = ['\'', '"', '=', '_', ':', ';', '?', '~', '|', '.'];
                    var enArr_03 = ['+', '-', '\\', '/', '[', ']', '{', '}'];
                    var enArr_04 = ['123', '空格', 'abc'];
                    $keyscontainer.addClass('type-char').removeClass('type-123').removeClass('type-en');
                    $keys_01 = $('<li>' + enArr_01.join('</li><li>') + '</li>');
                    $keys_02 = $('<li>' + enArr_02.join('</li><li>') + '</li>');
                    $keys_03 = $('<li>' + enArr_03.join('</li><li>') + '</li>' + '<li class="type-li-del">del</li>');
                    $keys_04 = $('<li>' + enArr_04.join('</li><li>') + '</li>');
                    $line_01.html($keys_01);
                    $line_02.html($keys_02);
                    $line_03.html($keys_03);
                    $line_04.html($keys_04);
                } else if (val === '123') {
                    var $keys_01, $keys_02, $keys_03, $keys_04;
                    var enArr_01 = ['1', '2', '3'];
                    var enArr_02 = ['4', '5', '6'];
                    var enArr_03 = ['7', '8', '9'];
                    var enArr_04 = ['abc', '0'];
                    $keyscontainer.addClass('type-123').removeClass('type-en').removeClass('type-char');
                    $keys_01 = $('<li>' + enArr_01.join('</li><li>') + '</li>');
                    $keys_02 = $('<li>' + enArr_02.join('</li><li>') + '</li>');
                    $keys_03 = $('<li>' + enArr_03.join('</li><li>') + '</li>');
                    $keys_04 = $('<li>' + enArr_04.join('</li><li>') + '</li>' + '<li class="type-li-del123">del</li>');
                    $line_01.html($keys_01);
                    $line_02.html($keys_02);
                    $line_03.html($keys_03);
                    $line_04.html($keys_04);
                } else if (val.toLocaleLowerCase() === 'shift') {
                    var $en = $box.find('.type-en');
                    if (!$en.length) {
                        return;
                    }
                    var upOrDown = $en.find('li').eq(0).text() === 'q';
                    $line_01.find('li').each(function () {
                        var $li = $(this);
                        var val = $li.text();
                        $li.text(upOrDown ? val.toLocaleUpperCase() : val.toLocaleLowerCase());
                    });
                    $line_02.find('li').each(function () {
                        var $li = $(this);
                        var val = $li.text();
                        $li.text(upOrDown ? val.toLocaleUpperCase() : val.toLocaleLowerCase());
                    });
                    $line_03.find('li').each(function (index) {
                        var $li = $(this);
                        var val = $li.text();
                        if (!index) {
                            upOrDown ? $li.addClass('type-li-shift-up') : $li.removeClass('type-li-shift-up');
                            return;
                        }
                        $li.text(upOrDown ? val.toLocaleUpperCase() : val.toLocaleLowerCase());
                    })
                } else {
                    me.textHandler(val);
                    if (val.toLocaleLowerCase() === 'del' || val === '空格') {
                        return
                    }
                    $this.text('');
                    var offSet = $this.offset();
                    if (val.toLocaleLowerCase() === 'q') {
                        $tip_q.offset({top:offSet.top-130, left:offSet.left-5});
                        $tip_q.text(val);
                    } else if (val.toLocaleLowerCase() === 'p') {
                        $tip_p.offset({top:offSet.top-130, left:offSet.left-43});
                        $tip_p.text(val);
                    } else {
                        $tip.offset({top:offSet.top-130, left:offSet.left-25});
                        $tip.text(val);
                    }
                }
            }).on('touchend', '.type-en li', function () {
                var $this = $(this);
                var offSet = $this.offset();
                setTimeout(function () {
                    $this.text(textVal);
                    $tip.offset({top:offSet.top-130, left:-1000});
                    $tip_q.offset({top:offSet.top-130, left:-1000});
                    $tip_p.offset({top:offSet.top-130, left:-1000});
                }, 250);
            }).on('touchstart', '.type-char li', function () {
                var $this = $(this);
                var val = $this.text();
                if (!val) {
                    return
                }
                textVal = val;
                if (val === 'abc') {
                    var $keys_01, $keys_02, $keys_03, $keys_04;
                    var enArr_01 = ['q', 'w', 'e', 'r', 't', 'y','u', 'i', 'o', 'p'];
                    var enArr_02 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
                    var enArr_03 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
                    var enArr_04 = ['123', '空格', '#+='];
                    $keyscontainer.addClass('type-en').removeClass('type-123').removeClass('type-char');
                    $keys_01 = $('<li>' + enArr_01.join('</li><li>') + '</li>');
                    $keys_02 = $('<li>' + enArr_02.join('</li><li>') + '</li>');
                    $keys_03 = $('<li class="type-li-shift">shift</li>' + '<li>' + enArr_03.join('</li><li>') + '</li>' + '<li class="type-li-del">del</li>');
                    $keys_04 = $('<li>' + enArr_04.join('</li><li>') + '</li>');
                    $line_01.html($keys_01);
                    $line_02.html($keys_02);
                    $line_03.html($keys_03);
                    $line_04.html($keys_04);
                } else if (val === '123') {
                    var $keys_01, $keys_02, $keys_03, $keys_04;
                    var enArr_01 = ['1', '2', '3'];
                    var enArr_02 = ['4', '5', '6'];
                    var enArr_03 = ['7', '8', '9'];
                    var enArr_04 = ['abc', '0'];
                    $keyscontainer.addClass('type-123').removeClass('type-en').removeClass('type-char');
                    $keys_01 = $('<li>' + enArr_01.join('</li><li>') + '</li>');
                    $keys_02 = $('<li>' + enArr_02.join('</li><li>') + '</li>');
                    $keys_03 = $('<li>' + enArr_03.join('</li><li>') + '</li>');
                    $keys_04 = $('<li>' + enArr_04.join('</li><li>') + '</li>' + '<li class="type-li-del123">del</li>');
                    $line_01.html($keys_01);
                    $line_02.html($keys_02);
                    $line_03.html($keys_03);
                    $line_04.html($keys_04);
                } else {
                    me.textHandler(val);
                    if (val.toLocaleLowerCase() === 'del' || val === '空格') {
                        return
                    }
                    $this.text('');
                    var offSet = $this.offset();
                    if (val === '!' || val === "'" || val === '+') {
                        $tip_q.offset({top:offSet.top-130, left:offSet.left-5});
                        $tip_q.text(val);
                    } else if (val === ')' || val === '.') {
                        $tip_p.offset({top:offSet.top-130, left:offSet.left-43});
                        $tip_p.text(val);
                    } else {
                        $tip.offset({top:offSet.top-130, left:offSet.left-25});
                        $tip.text(val);
                    }
                }
            }).on('touchend', '.type-char li', function () {
                var $this = $(this);
                var offSet = $this.offset();
                setTimeout(function () {
                    $this.text(textVal);
                    $tip.offset({top:offSet.top-130, left:-1000});
                    $tip_q.offset({top:offSet.top-130, left:-1000});
                    $tip_p.offset({top:offSet.top-130, left:-1000});
                }, 250);
            }).on('touchstart', '.type-123 li', function () {
                var $this = $(this);
                $this.css({
                    'background-color': 'rgb(180,179,169)',
                });
                var val = $this.text();
                if (!val) {
                    return
                }
                if (val === 'abc') {
                    var $keys_01, $keys_02, $keys_03, $keys_04;
                    var enArr_01 = ['q', 'w', 'e', 'r', 't', 'y','u', 'i', 'o', 'p'];
                    var enArr_02 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
                    var enArr_03 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
                    var enArr_04 = ['123', '空格', '#+='];
                    $keyscontainer.addClass('type-en').removeClass('type-123').removeClass('type-char');
                    $keys_01 = $('<li>' + enArr_01.join('</li><li>') + '</li>');
                    $keys_02 = $('<li>' + enArr_02.join('</li><li>') + '</li>');
                    $keys_03 = $('<li class="type-li-shift">shift</li>' + '<li>' + enArr_03.join('</li><li>') + '</li>' + '<li class="type-li-del">del</li>');
                    $keys_04 = $('<li>' + enArr_04.join('</li><li>') + '</li>');
                    $line_01.html($keys_01);
                    $line_02.html($keys_02);
                    $line_03.html($keys_03);
                    $line_04.html($keys_04);
                } else {
                    me.textHandler(val);
                }
            }).on('touchend', '.type-123 li', function () {
                var $this = $(this);
                setTimeout(function () {
                    $this.css({
                        'background-color': 'rgb(89,89,89)',
                    });
                }, 250);
            });
        },

        textHandler: function(str) {
            var me = this;
            // var inputEl = document.getElementById("xfjr-key-input");
            var inputEl = me.$element[0];
            var curpos = me.getCursorPosition(inputEl);
            var val = inputEl.value;
            var newStr = '';
            if (str.toLocaleLowerCase() === 'del') {
                newStr = me.delStr(val, curpos);
                inputEl.value = newStr;
                me.setCaretPosition(inputEl, curpos-1);
            } else if (str === '空格') {
                newStr = me.insertStr(val, ' ', curpos);
                inputEl.value = newStr;
                me.setCaretPosition(inputEl, curpos+1);
            } else {
                newStr = me.insertStr(val, str, curpos);
                inputEl.value = newStr;
                me.setCaretPosition(inputEl, curpos+1);
            }
        },
        getCursorPosition: function(inputEl) {
            var cursurPosition =- 1;
            if (inputEl.selectionStart != undefined && inputEl.selectionStart != null) {//非IE浏览器
                cursurPosition = inputEl.selectionStart;
            } else {//IE
                var range = document.selection.createRange();
                range.moveStart("character", -inputEl.value.length);
                cursurPosition = range.text.length;
            }
            return cursurPosition;
        },
        insertStr: function(str, insertstr, pos) {
            var str = str.toString();
            var newStr = str.substr(0, pos) + '' + insertstr + '' + str.substr(pos);
            return newStr;
        },
        delStr: function(str, pos) {
            var str = str.toString();
            var newStr = '';
            if (pos !== 0) {
                newStr = str.substr(0, pos-1) + str.substr(pos);
            } else {
                newStr = str;
            }
            return newStr;
        },
        // 设置光标位置
        setCaretPosition: function(textDom, pos) {
            if (textDom.setSelectionRange) {
                // IE
                textDom.focus();
                textDom.setSelectionRange(pos, pos);
            } else if (textDom.createTextRange) {
                //
                var range = textDom.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        },


        // close:function(){
        //     var me = this;
        //     var count = me.$element.data("count");
        //     var $keyboard = $("#mykeyboard"+count);
        //     $keyboard.fadeOut(100);
        //     me.$element.attr("isshowkb","false");
        // }
    };
    $.fn.mykeyboard = function (option) {
        return this.each(function () {
            var options = typeof option === 'object' ? option : {};
            var data = new Mykeyboard(this, options);
        })
    };
    $.fn.mykeyboard.defaults = {

    };
    $.fn.mykeyboard.Constructor = Mykeyboard;


})(window, jQuery);

// (function($){
//     $.fn.textFocus = function(v) {
//         var range, len, v = v === undefined ? 0 : parseInt(v);
//         this.each(function() {
//             if(navigator.userAgent.msie) {
//                 range = this.createTextRange();
//                 v === 0 ? range.collapse(false) : range.move("character", v);
//                 range.select();
//             } else {
//                 len = this.value.length;
//                 v === 0 ? this.setSelectionRange(len, len) : this.setSelectionRange(v, v);
//             }
//             this.focus();
//         });
//         return this;
//     }
// })(jQuery);