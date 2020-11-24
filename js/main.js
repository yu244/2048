var board = new Array();
var score = 0;
var hasConflicted = new Array;
$(function() {
  newgame();
})

function newgame() {
  init();
  generateOneNumber();
  generateOneNumber();
}

function init() {
  for(var i=0; i<4; i++) {
    board[i] = new Array();
    for(var j=0;j<4;j++) {
      board[i][j] = 0;
      var gridCell = $("#grid-cell-"+i+"-"+j);
      gridCell.css("top", getPosTop(i, j));
      gridCell.css("left", getPosLeft(i, j));
    }
  }

  for(var i=0; i<4; i++) {
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for(var j=0;j<4;j++) {
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }

  updateBoardView();
  score = 0;
  $("#score").text(0);
}

function updateBoardView() {
  $(".number-cell").remove();
  for(var i=0; i<4; i++) {
    for(var j=0;j<4;j++) {
      //增加数字格
      $("#grid-container").append("<div  class='number-cell' id='number-cell-"+ i +"-"+ j +"'></div>");
      var numberCell = $("#number-cell-"+i+"-"+j)
      //如果棋盘格的值为0的话，设置数字格的宽高为0
      if(board[i][j] == 0) {
        numberCell.css("width", "0px");
        numberCell.css("height", "0px");
        numberCell.css("top", getPosTop(i,j) + 50);
        numberCell.css("left", getPosLeft(i,j) + 50);
      }else {
        numberCell.css("width", "100px");
        numberCell.css("height", "100px");
        numberCell.css("top", getPosTop(i,j));
        numberCell.css("left", getPosLeft(i,j));
        numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
        numberCell.css("color", getNumberColor(board[i][j]));
        numberCell.text(board[i][j])
      }
      hasConflicted[i][j] = false;
    }
  }
}

function generateOneNumber() {
  //随机一个坐标位置
  var randx=parseInt(Math.floor(Math.random()*4));
  var randy=parseInt(Math.floor(Math.random()*4));
  var times=0;
  while (times<50){
      if (board[randx][randy]==0) {
        break;
      }
      var randx=parseInt(Math.floor(Math.random()*4));
      var randy=parseInt(Math.floor(Math.random()*4));
      times++;
  }
  if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx=i;
                    randy=j;
                }
            }
        }
  }
    var randNumber=Math.random()<0.5? 2 : 4;
    board[randx][randy]=randNumber;
  ShowNumberWithAnimation(randx,randy,randNumber);

}
