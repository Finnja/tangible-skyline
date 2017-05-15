function detectRect(topcodes) {
    var ctx = document.querySelector("#video-canvas").getContext('2d');
    ctx.strokeStyle="#FF0000";

    var top_left = -999
    var bottom_right = 999

    var max_x = 0; 
    var max_y = 0;
    
    // set to default video height / width
    var min_x = 800;
    var min_y = 600;

    // bools for verification of edges
    var top = false;
    var bottom = false;
    var left = false;
    var right = false;

    // rectangle
    if (topcodes.length > 3){
      // find top left and bottom right
      for (i=0; i<topcodes.length; i++) {
        if (topcodes[i].x > max_x && topcodes[i].y > max_y) {
          bottom_right = topcodes[i];
          max_x = topcodes[i].x;
          max_y = topcodes[i].y;
        }

        if (topcodes[i].x < min_x && topcodes[i].y < min_y) {
          top_left = topcodes[i];
          min_x = topcodes[i].x;
          min_y = topcodes[i].y;
        }
      }

      for(j = 0; j<topcodes.length; j++) {
        if(topcodes[j].code != top_left.code && Math.abs(top_left.y - topcodes[j].y) < 50) {
          top = true;
        }

        if(topcodes[j].code != top_left.code && Math.abs(top_left.x - topcodes[j].x) < 50) {
          left = true;
        }

        if(topcodes[j].code != bottom_right.code && Math.abs(bottom_right.y - topcodes[j].y) < 50) {
          bottom = true;
        }

        if(topcodes[j].code != bottom_right.code && Math.abs(bottom_right.x - topcodes[j].x) < 50) {
          right = true;
        }
      }

      if (top && bottom && left && right) {
        ctx.strokeRect(top_left.x,top_left.y,(bottom_right.x - top_left.x),(bottom_right.y - top_left.y));
      }
    }
  }