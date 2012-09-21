// ==UserScript==
// @name        Flowdock Enhancements
// @namespace   http://fluidapp.com
// @description Some Enhancements for Flowdock
// @include     *
// @author      Jens Arps http://jensarps.de, Modified by David Link
// ==/UserScript==

(function () {

  var styleSheetId = 0;

  var slice = Function.prototype.call.bind(Array.prototype.slice);


  var enhancements = {

    applyUserImages: function(){
      // generic styles:
      var cssString = '#flowdock-chat .chat_line .chat_line_content { padding-left: 70px; } \
               #flowdock-chat .chat_line .nick { text-align: left; color: #A8A8A8; padding: 0 0 0 50px !important; display: inline-block; position: relative !important; left: 35px !important; margin: 5px 0 -15px !important; height: 30px !important; } \
               #flowdock-chat .chat_line .chat_line_header { padding: 5px 0 0 !important; } \
               #flowdock-chat .chat_line.hide_header .chat_line_header { padding-bottom: 0 !important; } \
               #flowdock-chat #chat_app_lines .chat_line { padding-bottom: 5px; }';
      this.createStylesheet(cssString);

      // add images:
      var fluid_this = this
      setTimeout(function(){
        $('#user_buttons .wrapper .avatar').each(function(){
          var img = this.style.backgroundImage;

          cssString = '.chat_line_header .nick { \
            background: ' + img + ' no-repeat left center; \
           }';
          fluid_this.createStylesheet(cssString);
        })
        $('#userlist_button div').each(function(){
          var id = $(this).attr('id').split('_').pop();
          var img = this.style.backgroundImage;

          cssString = '.chat_line_header .nick.user_' + id + ' { \
            background: ' + img + ' no-repeat left center; \
           }';
          fluid_this.createStylesheet(cssString);
        })
      }, 5000)
    },

    timeFormatter: function(timestamp){
      var time = timestamp.text().split(':')
      var ampm = time[0] >= 12 ? "p" : "a";
      if(time[0] > 12){
        var hours = time[0] - 12;
      } else if(time[0] == 0){
        var hours = 12;
      } else {
        var hours = time[0]
      }
      var minutes = time[1];
      timestamp.text(hours+':'+minutes+ampm);
      timestamp.addClass('formatted');
    },

    formatTime: function(){
      fluid_this = this;
      setTimeout(function(){
        $('#flowdock-chat .chat_line .timestamp span.time').each(function(){
          fluid_this.timeFormatter($(this));
        })
        setInterval(function(){
          $('#flowdock-chat .chat_line .timestamp span.time').not('.formatted').each(function(){
            fluid_this.timeFormatter($(this))
          })
        }, 100)
      }, 5000)
    },

    makeTimestampVisible: function(){
          var cssString = '#flowdock-chat .chat_line .timestamp span.time { display: block !important; }';
          this.createStylesheet(cssString);
    },

    createStylesheet: function(cssText){
      var head = document.getElementsByTagName('head')[0],
          style = document.createElement('style'),
          rules = document.createTextNode(cssText);

      style.type = 'text/css';
      style.id="flowdockEnhancements_" + styleSheetId++;
      if(style.styleSheet){
          style.styleSheet.cssText = rules.nodeValue;
      }else{
        style.appendChild(rules);
      }
      head.appendChild(style);
    },

    runAll: function(){
      this.makeTimestampVisible();
      this.applyUserImages();
      this.formatTime();
    }
  };

    if (window.fluid) {
      enhancements.runAll();
    }
})();

