function fix(str) {
  var colors = ["pink", "green", "yellow", "white", "red", "orange", "small"];
  var fixed = str;
  for (var i = 0; i < colors.length; i++) {
    var startRE = new RegExp("<" + colors[i] + ">", "g");
    var endRE = new RegExp("</" + colors[i] + ">", "g");
    fixed = fixed.replace(startRE, "<span class=\"" + colors[i] + "\">");
    fixed = fixed.replace(endRE, "</span>");
  }
  return fixed;
}

function randomColor() {
  var colors = ["pink", "green", "yellow", "white", "red", "orange"];
  return colors[Math.floor(Math.random() * 100 % colors.length)];
}

function slideDiv(text, level, levelItemCount, itemIndex) {
  //console.log("making div for slide " + text.substring(0, 50));
  var angle = itemIndex * (360/levelItemCount); // in degrees
  var radius = 200 * levelItemCount;
  var x = Math.sin(angle * (Math.PI/180)) * radius; // Math.sin takes radians
  //console.log("x:" + x);
  var y = 650 * level;
  var z = Math.sin((90 - angle) * (Math.PI/180)) * radius;
  return "<div class='step slide' " +
      "data-x=" + x + " " +
      "data-y=" + y + " " +
      "data-z=" + z + " " +
      "data-rotate-y=" + angle + ">" +
      "<span>" + fix(text) + "</span>" + "</div>";
}

function getToCString(spindle) {
  // make table of contents slide
  var contents = "<div class='contents'><h2>Contents</h2><p><ul>";
  $.each(spindle.platters, function(i, platter) {
    contents = contents.concat('<li>' + platter.title + '</li>');
  });
  return contents.concat("</ul></p></div>");
}

function ooz(str) {
  return (str && str.length > 0) ? 1 : 0;
}

function getSpindleMarkup(spindle) {
  var strings = [];
  var size = ooz(spindle.title) + ooz(spindle.subtitle) + ooz(spindle.tldr) + ooz(spindle.brought) + 1;
  var i = 0;
  if (spindle.title) {
    strings.push(slideDiv("<div class='title'>" + spindle.title + "</div>", 0, size, i++));
  }
  if (spindle.subtitle) {
    strings.push(slideDiv("<div class='subtitle'>" + spindle.subtitle + "</div>", 0, size, i++));
  }
  if (spindle.tldr) {
    strings.push(slideDiv("<div class='tldr'><h2>TL;DR</h2><p>" + spindle.tldr + "</div>", 0, size, i++));
  }
  if (spindle.brought) {
    strings.push(slideDiv("<div class='broughtBy'><h2>This presentatation is brought to you by:</h2><p>" + spindle.brought + "</div>", 0, size, i++));
  }
  strings.push(slideDiv(getToCString(spindle), 0, size, i++)); // table of contents
  // now do all the platters
  $.each(spindle.platters, function(i, platter) {
    // console.log("doing platter " + platter.title + " that has " + platter.slides.length + " slides");
    // for each slide on this platter
    $.each(platter.slides, function(j, slide) {
      var html = "";
      // console.log("doing platter " + platter.title + ", slide " + slide.header);
      if (slide.header) {
        html = '<h2 class="' + randomColor() + '">' + slide.header + '</h2>';
      }
      if (slide.subHeader) {
        html = '<h4 class="' + randomColor() + '">' + slide.subHeader + '</h4>';
      }
      var color = slide.textClass || "white";
      if (slide.text) {
        html = html.concat('<div class="text">' + slide.text + '</div>');
      }
      if (slide.bullets) {
         html = html.concat('<div class="bullets"><' + color + '><ul><li>' +
           slide.bullets.join('</li><li>') + '</li></ul></' + color + '></div>');
      }
      if (slide.code) {
        html = html.concat('<div class="code"><code>' + slide.code.replace("\n", "<br>") + '</code></div>');
      }
      if (slide.notes) {
         html = html.concat('<div class="notes"><ul><li>' +
           slide.notes.join('</li><li>') + '</li></ul></div>');
      }
      // console.log("main slideDiv call");
      strings.push(slideDiv(html, i + 1, platter.slides.length, j));
    });
  });
  //console.log("markup: " + strings.join("\b"));
  return strings.join("\n");
}

function getPresoAsSpindle(preso) {
  var spindle = {
    title: preso.title,
    subtitle: preso.subtitle,
    tldr: preso.tldr,
    brought: preso.brought,
    platters: []
  }
  if (preso.contents) {
    $.each(preso.contents, function(i, thread) {
       spindle.platters.push({title: thread, slides: []});
    });
  }
  else { // dynamic contents from thread slides
    var lastThread = "";
    $.each(preso.slides, function(i, slide) {
      // console.log("slide.header: " + slide.header);
      if (slide.thread === "start") {
        slide.thread = slide.header; // make the header the thread
        var platter = {title: slide.thread, slides: []};
        spindle.platters.push(platter);
        lastThread = slide.thread;
        // console.log("new thread added as platter " + platter.title);
      }
      else {
        slide.thread = lastThread; // make the last thread this slides thread
        //console.log("old thread " + slide.thread);
      }
      // console.log("slide.thread: " + slide.thread);
      // find the existing thread
      var platter = spindle.platters.find(function(p) {
        return p.title === slide.thread
      });
      if (platter) {
        platter.slides.push(slide);
        // console.log("pushed slide " + slide.header + " onto thread/platter " + platter.title + " that now has " + platter.slides.length + " in it");
      }
      else {
        /*
        spindle.platters.push({title: slide.thread, slides: [slide]});
        console.log("pushed slide " + slide.header + " onto NEW thread/platter " + platter.title);
        */
        console.log("No platter found for slide" + slide.header + "; THIS should NOT happen")
      }
    });
  }
  /*
  // now put each slide on the right platter AGAIN?!?!?!?!?!??!
  $.each(preso.slides, function(i, slide) {
    var platter = spindle.platters.find(function(p) {
      return p.title === slide.thread;
    });
    if (!platter)
      alert("Could not find platter with slide thread: " + slide.thread);
    else
      platter.slides.push(slide);
  });
  */
  return spindle;
}

function getSlidesMarkup(presoData, xPixels, yPixels) {
  return getSpindleMarkup(getPresoAsSpindle(presoData));
}
