# Ago.js

Ago.js converts timestamps to human-readable time without relying on bloated libraries.  
Examples: `1 minute ago`, `3 days ahead`, `3 weeks ago`, `5 months ahead`, `just now`

# Usage

If you use HTML's `<time>` tags, all you need is
```HTML
<time datetime="2014-09-10T18:34:13+00:00">2014-09-10T18:34:13+00:00</time>
```

```JavaScript
Ago();
```

Results looks like this:
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
    ["minute",     60],
    ["hour",     3600],
    ["day",     86400],
    ["week",   604800],
    ["month", 2592000],
    ["year", 31536000]
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
  plural: {
    minute: "minutes",
    hour: "hours",
    day: "days",
    week: "weeks",
    month: "months",
    year: "years"
  }
}
```

# CDN

```HTML
<script src="https://cdn.rawgit.com/jomo/ago.js/master/ago.min.js"></script>
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
    ["Minute",     60],
    ["Stunde",   3600],
    ["Tag",     86400],
    ["Woche",  604800],
    ["Monat", 2592000],
    ["Jahr", 31536000]
  ],
  plural: {
    Minute: "Minuten",
    Stunde: "Stunden",
    Tag: "Tagen",
    Woche: "Wochen",
    Monat: "Monaten",
    Jahr: "Jahren"
  },
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
