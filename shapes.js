function masterMethod(topcodes){
  //Background elements
    var bcg = document.querySelector("#video-canvas").getContext('2d');
    bcg.font = "50px Raleway";
    bcg.fillText("Welcome to Skyline!",0,50);

  if(topcodes.length==2){
    detectSingleBeam(topcodes)
  }
  if(topcodes.length==3){
    detectTriangle(topcodes)
  }
  if(topcodes.length>3){
    //detectRect(topcodes);
    detectComplexShape(topcodes);
  }
}

//Function to deal with 2 top codes; draws line between the two topcodes
function detectSingleBeam(topcodes){
    var ctx = document.querySelector("#video-canvas").getContext('2d');    
    ctx.strokeStyle="#0a0a0f";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(topcodes[0].x, topcodes[0].y);
    ctx.lineTo(topcodes[1].x, topcodes[1].y);
    ctx.stroke();
}

//Function to deal with 3 top codes; automatically forms triangle between them
function detectTriangle(topcodes){
    var ctx = document.querySelector("#video-canvas").getContext('2d');    
    ctx.strokeStyle="#0a0a0f";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(topcodes[0].x, topcodes[0].y);
    ctx.lineTo(topcodes[1].x, topcodes[1].y);
    ctx.lineTo(topcodes[2].x, topcodes[2].y);
    ctx.lineTo(topcodes[0].x, topcodes[0].y);
    ctx.stroke();
}

//Not currently using this method
function detectRect(topcodes) {
    //Stroke elements
    var ctx = document.querySelector("#video-canvas").getContext('2d');    
    ctx.strokeStyle="#0a0a0f";
    ctx.lineWidth=5;

    //Feedback elements
    var fdbk = document.querySelector("#video-canvas").getContext('2d');    
    fdbk.font = "17.5px Raleway";
    fdbk.fillStyle = "#000000";
    var rectColor = "#FF0000";
    var crossBeamColor = "#66b3ff";

    var used_codes = [];

  
    for(i = 0; i<topcodes.length; i++) {
      var tr = null;
      var bl = null;
      var br = null;
      var tl = null;
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
            var rect = true;

           // fdbk.fillText("Awesome use of rectangles! Maybe make it more stable by...",450,450);


            ctx.strokeStyle=rectColor;
            ctx.strokeRect(topcodes[i].x,topcodes[i].y,(br.x - topcodes[i].x),(br.y - topcodes[i].y));
            used_codes.push(topcodes[i].code, bl.code, tr.code, br.code)

            if (cross_beam) {
              ctx.strokeStyle=crossBeamColor;
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

            if(rect && cross_beam){

              fdbk.fillText("That wall looks good! Sweet X-Brace.",450,450);
              fdbk.fillText("Real buildings use it too!",450,470);
              fdbk.strokeStyle='#FFFFFF';
              fdbk.strokeRect(435,100,350,250);
              fdbk.fillText("Image of Hancock Tower Goes Here",450,200);

/*
                var base_image = new Image();
                base_image.src = 'hancockXBrace.jpg';
                fdbk.drawImage(base_image, 100, 100);*/
            }
            else if(rect){
              fdbk.fillText("Awesome use of rectangles!",450,450);
              fdbk.fillText("Make it more stable by adding something.",450,470);
              fdbk.fillText("Look at the examples or out the window",450,490);
              fdbk.fillText("for inspriation",450,510);

            }
            else{
              fdbk.fillText("Build Better",450,450);
            }            

            return used_codes;

          } 
        }
      }
      if(topcodes.length == 0){
        fdbk.fillText("Build Better",450,450);
            }
    }

  }

function detectComplexShape(topcodes) {
    //Stroke elements
    var ctx = document.querySelector("#video-canvas").getContext('2d');    
    ctx.strokeStyle="#0a0a0f";
    ctx.lineWidth=5;


    var used_codes = [];
    //activeCodes will store all non-Apex Code
    var activeCodes = [];

    //Currently assuming that 6 top codes means there is a top triangle
    if(topcodes.length == 6){
      apexCode = findApex(topcodes);
    }
    else{
      apexCode = null;
    }
    
    //Populate a new array with non-Apex topcodes 
    for(i = 0; i<topcodes.length;i++){
      if(apexCode && (topcodes[i].code != apexCode.code)){
        activeCodes.push(topcodes[i]);
      }
      else if(!(apexCode)){
        activeCodes.push(topcodes[i]);
      }
    }

    //Function that actually draws the more complex shape
    drawComplex(activeCodes, apexCode);


  }

//Function that iterates through all topcodes to find highest y-value
//Labels that topcode as the Apex
function findApex(topcodes){
  var apex = null;           
  apex = topcodes[0];
  for(i = 0; i<topcodes.length; i++) {
        if (Math.abs(apex.y) > Math.abs(topcodes[i].y)) {
          apex = topcodes[i];
        }
      }
    return(apex);
  }



//Basically just the old drawRect, except with the Apex draw element added
function drawComplex(topcodes, apexCode) {
    //Stroke elements
    var ctx = document.querySelector("#video-canvas").getContext('2d');    
    ctx.strokeStyle="#0a0a0f";
    ctx.lineWidth=5;


    var rectColor = "#F53240";
    var crossBeamColor = "#F98F02";
    var roofColor = "#02C8A7";

    var used_codes = [];


    for(i = 0; i<topcodes.length; i++) {
      var tr = null;
      var bl = null;
      var br = null;
      var tl = null;
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
            var rect = true;

            //Draw Rect
            ctx.strokeStyle=rectColor;
            ctx.strokeRect(topcodes[i].x,topcodes[i].y,(br.x - topcodes[i].x),(br.y - topcodes[i].y));
            used_codes.push(topcodes[i].code, bl.code, tr.code, br.code)


            //Old Cross-Beam Logic
            if (cross_beam) {
              ctx.strokeStyle=crossBeamColor;

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
            //Simple Path to connect the apexCode to the rest of the rectangle
            if(apexCode){
              ctx.strokeStyle=roofColor;

              console.log("apex code detected");
              ctx.beginPath()
              ctx.moveTo(topcodes[i].x, topcodes[i].y);
              ctx.lineTo(apexCode.x, apexCode.y);
              ctx.lineTo(tr.x, tr.y);
              ctx.stroke();

            }

            //Calls writeFeedback to call appropiate feedback
            if(apexCode && rect && cross_beam){
              writeFeedback('triangle');
            }
            else if(rect && cross_beam){
              writeFeedback('crossBeam');
            }
            else if(rect){
              writeFeedback('rectangle');
            }          

            return used_codes;

          } 
        }
      }
    }

  }

//Function that calls other Feedback Methods
function writeFeedback(structure){
  var canvas = document.getElementById("feedbackCanvas");
  var fdbk  = canvas.getContext("2d");

    fdbk.font = "17.5px Raleway";
    fdbk.fillStyle = "#000000";
    if(structure == 'crossBeam'){
      crossBeamFeedback(fdbk);
    }
    else if(structure == 'rectangle'){
      rectFeedback(fdbk);
    }
    else if(structure == 'triangle'){
      triFeedback(fdbk);
    }

}

//Feedback for Cross-beam + Rect
function crossBeamFeedback(fdbk){
              fdbk.fillText("That wall looks good! Sweet X-Brace.",450,450);
              fdbk.fillText("Real buildings use it too!",450,470);
              fdbk.strokeStyle='#FFFFFF';
              fdbk.strokeRect(435,100,350,250);
              fdbk.fillText("Image of Hancock Tower Goes Here",450,200);
}

//Feedback for Rect
function rectFeedback(fdbk){
              fdbk.fillText("Awesome use of rectangles!",350,100);
              fdbk.fillText("Image of Rectangle blocks goes here",350,150);

              fdbk.fillText("However, these rectangles can sway in the Chicago wind",350,200);


              fdbk.fillText("Images of rectangle swaying",350,250);

              //fdbk.strokeRect(600,150,700,200);



}

//Feedback for Cross-beam + Rect + Triangle
function triFeedback(fdbk){
              fdbk.fillText("YOU WIN",450,450);
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