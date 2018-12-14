# Ago.js

Ago.js converts timestamps to human-readable time without relying on bloated libraries.  
Examples: `1 minute ago`, `3 days ahead`, `3 weeks ago`, `5 months ahead`, `just now`

# CDN

You can use the awesome [jsDelivr CDN](https://jsdelivr.net):

```html
<script src="https://cdn.jsdelivr.net/gh/jomo/ago.js@0.0.1/ago.min.js" integrity="sha256-xw0JUUdbuZQCVO+QScoxrlEsD4nZGCjMRh9PP8GLhcY=" crossorigin="anonymous"></script>
```

# Usage

If you use HTML `<time>` tags, all you need is
```HTML
<time datetime="2014-09-10T18:34:13+00:00">2014-09-10T18:34:13+00:00</time>
```

```JavaScript
Ago();
```

Results look like this:
```HTML
<time datetime="2014-09-10T18:34:13+00:00">2 months ago</time>
```

Ago() takes two optional arguments:
* nodes, an array of HTML nodes you want to use.  
  The default is `document.querySelectorAll("time")`
* options, see below

# Options

You can customize Ago.js by overriding the [default options](#default-options).

* interval: milliseconds-interval in which nodes should be updates
* units: Array of arrays with ["unit name", seconds]
* date: function(node) that returns a `Date` for the given node
* format: function(time, unit) that returns a string which will be used for a node's text
* plural: Object that contains all `units` with their plural as value

# Default options

```JavaScript
{
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
    // works on  HTML <time> nodes
    return new Date(node.getAttribute("datetime"));
  },
  format: function(time, unit) {
    if (!unit) return "just now";
    var tail = time < 0 ? " ahead" : " ago";
    return Math.abs(time) + " " + unit + tail;
  }
}
```

# Examples

### Using your own classes

```HTML
<div>
  Last updated
  <span class="ago", data-time="2014-11-16T21:08:39+00:00">
    2014-11-16T21:08:39+00:00
  </span>
</div>
```

```JavaScript
Ago(document.querySelectorAll(".ago"), {
  date: function(node) {
    return new Date(node.getAttribute("data-time"));
  }
});
```

### "a minute ago" instead of "1 minute ago"

```JavaScript
Ago({
  format: function(time, unit) {
    time = Math.abs(time);
    if (!unit) return "just now";
    if (time === 1) time = (unit[0] == "h") ? "an" : "a";
    var tail = time < 0 ? " ahead" : " ago";
    return time + " " + unit + tail;
  }
});
```

### Translating into other languages

```JavaScript
// German
Ago({
  units: [
    ["Minute","Minuten",  60],
    ["Stunde","Stunden",  3600],
    ["Tag","Tage",        86400],
    ["Woche","Wochen",    604800],
    ["Monat","Monate",    2592000],
    ["Jahr","Jahre",      31536000]
  ],
  format: function(time, unit) {
    if (!unit) {
      return "jetzt";
    }
    if (time < 0) {
      var lead = "in ";
    } else {
      var lead = "vor ";
    }
    return lead + Math.abs(time) + " " + unit;
  }
});
```

Example: `in 22 Stunden`

# Donations

If you like this, you can buy me a beer at [`1jomojdTww1vnNwvseLrKgTENZoojQ3Um`](https://tinyurl.com/jomo-agojs)
