function detectRect(topcodes) {
    var ctx = document.querySelector("#video-canvas").getContext('2d');
    ctx.strokeStyle="#FF0000";

    for(i = 0; i<topcodes.length; i++) {
      var tr = null;
      var bl = null;
      var br = null;
      
      for(j = 1; j<topcodes.length; j++) {
        // maybe add check to make sure they're a certain distance apart
        if (Math.abs(topcodes[i].y - topcodes[j].y) < 65) {
          tr = topcodes[j];
        }

        if (Math.abs(topcodes[i].x - topcodes[j].x) < 65) {
          bl = topcodes[j];
        }
      }

      if(bl && tr) {
        console.log('in final if block')
        for(j = 1; j<topcodes.length; j++) { 
          if (Math.abs(topcodes[j].y - bl.y) < 65 && Math.abs(topcodes[j].x - tr.x) < 65) {
            br = topcodes[j];

            ctx.strokeRect(topcodes[i].x,topcodes[i].y,(br.x - topcodes[i].x),(br.y - topcodes[i].y));
            return
          } 
        }
      }
    }
  }