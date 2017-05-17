function detectRect(topcodes) {
    var ctx = document.querySelector("#video-canvas").getContext('2d');
    ctx.strokeStyle="#FF0000";
    var used_codes = [];

    for(i = 0; i<topcodes.length; i++) {
      console.log(topcodes[i].angle)
      var tr = null;
      var bl = null;
      var br = null;
      var cross_beam = false;
      
      for(j = 1; j<topcodes.length; j++) {
        // maybe add check to make sure they're a certain distance apart
        if (Math.abs(topcodes[i].y - topcodes[j].y) < 65) {
          tr = topcodes[j];
        }

        if (Math.abs(topcodes[i].x - topcodes[j].x) < 65) {
          bl = topcodes[j];
        }

        if(tr && bl && topcodes[j].x > bl.x && topcodes[j].y > tr.y) {
          var cross_beam = true;
          var cross_code = topcodes[j].code;
        } 
      }

      if(bl && tr) {
        for(j = 1; j<topcodes.length; j++) { 
          if (Math.abs(topcodes[j].y - bl.y) < 65 && Math.abs(topcodes[j].x - tr.x) < 65) {
            br = topcodes[j];

            ctx.strokeRect(topcodes[i].x,topcodes[i].y,(br.x - topcodes[i].x),(br.y - topcodes[i].y));
            used_codes.push(topcodes[i].code, bl.code, tr.code, br.code)

            if (cross_beam) {
              ctx.strokeStyle="#66b3ff";
              ctx.beginPath();
              ctx.moveTo(topcodes[i].x, topcodes[i].y);
              ctx.lineTo(br.x, br.y);
              ctx.stroke();


              ctx.beginPath();
              ctx.moveTo(tr.x, tr.y);
              ctx.lineTo(bl.x, bl.y);
              ctx.stroke();

              used_codes.push(cross_code);
            }

            return used_codes;
          } 
        }
      }
    }
  }


// function detectTri(topcodes, used_codes) {
//   console.log(used_codes);
//   var ctx = document.querySelector("#video-canvas").getContext('2d');

//   if(used_codes) {
//      for(i = 0; i<topcodes.length; i++) {
//         var left = null;
//         var right = null;
//         var top = null;

//         for(j = 1; j<topcodes.length; j++) {
//           if (Math.abs(topcodes[i].y - topcodes[j].y) < 65) {
//             console.log('found left and right');
//             left = topcodes[j];
//             right = topcodes[i]
//           }
//         }

//         if(left && right) {
//           for(j = 1; j<topcodes.length; j++) { 
//             console.log(topcodes[j].angle);
//             if (topcodes[j].angle < .5) {
//               top = topcodes[j];

//               ctx.strokeStyle="#00e64d";
//               ctx.beginPath();
//               ctx.moveTo(left.x, left.y);
//               ctx.lineTo(right.x, right.y);
//               ctx.stroke();


//               ctx.beginPath();
//               ctx.moveTo(right.x, right.y);
//               ctx.lineTo(top.x, top.y);
//               ctx.stroke();

//               ctx.beginPath();
//               ctx.moveTo(top.x, top.y);
//               ctx.lineTo(left.x, left.y);
//               ctx.stroke();

//               return
//             }
//           }
//         }
//      }
//   }
//   else {
//     return
//   }
// }