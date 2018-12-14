function Ago(nodes, options) {
  if (!(nodes instanceof Array)) {
    options = nodes;
    nodes = undefined;
  }
  nodes = nodes || document.querySelectorAll("time");
  options = options || {};


  var default_opts = {
    interval: 10000, // 10 secs
    units: [
      ["minute","minutes",  60],
      ["hour","hours",      3600],
      ["day","days",        86400],
      ["week", "weeks",     604800],
      ["month","months",    2592000],
      ["year", "years",     31536000]
    ],
    date: function(node) {
      // works on  HTML "time" nodes
      return new Date(node.getAttribute("datetime"));
    },
    format: function(time, unit) {
      if (!unit) return "just now";
      var tail = time < 0 ? " ahead" : " ago";
      return Math.abs(time) + " " + unit + tail;
    },
  };

  // override default options
  for (var key in default_opts) {
    options[key] = options[key] || default_opts[key];
  }


  var ago = function(node) {
    // use callback to get date
    var ago_date = options.date(node);
    // get seconds ago
    var ago_time = (new Date().getTime() - ago_date.getTime()) / 1000;
    var abs_time = Math.floor(Math.abs(ago_time));

    // find greatest unit
    var unit = null;
    var unit_time = null;
    for (var u in options.units) {
      var secs = options.units[u][2];
      if (abs_time >= secs) {
        if(Math.floor(abs_time/secs) != 1){
          unit = options.units[u][1];
        }else{
          unit = options.units[u][0];
        }
        unit_time = secs;
      } else {
        break;
      }
    }
    if (unit_time !== null) {
      abs_time = Math.floor(abs_time/unit_time);
    }
    node.textContent = options.format(ago_time < 0 ? -abs_time : abs_time, unit);
  };


  var update_all = function() {
    for (var i = 0; i < nodes.length; i++) {
      ago(nodes[i]);
    }
  };


  update_all();
  setInterval(function() {
    update_all();
  }, options.interval);

}