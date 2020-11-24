$(document).keydown(function(event) {
  switch (event.keyCode){
    //left
    case 37:
      //完成向左移动逻辑moveLeft，返回布尔值。重新生成一个数字。判断游戏是否结束
      if(moveLeft()) {
        generateOneNumber();
        isgameover();
      }
      break;
    case 38:  //up
    if(moveUp()) {
      generateOneNumber();
      isgameover();
    }
      break;
    case 39:  //right
    if(moveRight()) {
      generateOneNumber();
      isgameover();
    }
      break;
    case 40:  //down
    if(moveDown()) {
      generateOneNumber();
      isgameover();
    }
      break;
  }
})

function moveLeft() {
  if(!canMoveLeft(board)) {
    //当前格子无法移动
    return false;
  }

  //完成向左移动逻辑
  for(var i=0; i<4;i++) {
    for(var j=1; j<4; j++) {
      if(board[i][j] != 0) {
        //向左移动逻辑
        for(var k=0; k < j; k++) {
          if(board[i][k] == 0 && noBlockHorizontalCol(i,k,j,board)) {
            //目标格的值为0，且中间格子为空，才能向左移动
            showMoveAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            break;
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,k,j,board) && !hasConflicted[i][k] ){
            //目标格子的值等于当前格子，且中间格子为空，才能向左移动
            showMoveAnimation(i,j,i,k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function moveUp() {
  if(!canMoveUp(board)) {
    return false;
  }
  //完成向上移动逻辑
  for(var i=1; i<4;i++) {
    for(var j=0; j<4; j++) {
      if(board[i][j] != 0) {
        //向上移动逻辑
        for(var k=0; k < i; k++) {
          if(board[k][j] == 0 && noBlockHorizontalColUp(i,k,j,board)) {
            //目标格的值为0，且中间格子为空，才能向上移动
            showMoveAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            break;
          }
          else if(board[k][j] == board[i][j] && noBlockHorizontalColUp(i,k,j,board) && !hasConflicted[i][k]){
            //目标格子的值等于当前格子，且中间格子为空，才能向上移动
            showMoveAnimation(i,j,k,j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;

            score += board[k][j];
            updateScore(score);
            hasConflicted[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function moveRight() {
  if(!canMoveRight(board)) {
    return false;
  }
  //完成向右移动逻辑
  for(var i=0; i<4;i++) {
    for(var j=2; j>=0; j--) {
      if(board[i][j] != 0) {
        //向右移动逻辑
        for(var k=3; k > j; k--) {
          if(board[i][k] == 0 && noBlockHorizontalColRight(i,k,j,board)) {
            //目标格的值为0，且中间格子为空，才能向右移动
            showMoveAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            break;
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontalColRight(i,k,j,board) && !hasConflicted[i][k]){
            //目标格子的值等于当前格子，且中间格子为空，才能向右移动
            showMoveAnimation(i,j,i,k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;

            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function moveDown() {
  if(!canMoveDown(board)) {
    return false;
  }
  //完成向下移动逻辑
  for(var i=2; i>=0;i--) {
    for(var j=0; j<4; j++) {
      if(board[i][j] != 0) {
        //向下移动逻辑
        for(var k=3; k > i; k--) {
          if(board[k][j] == 0 && noBlockHorizontalColDown(i,k,j,board)) {
            //目标格的值为0，且中间格子为空，才能向下移动
            showMoveAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            break;
          }
          else if(board[k][j] == board[i][j] && noBlockHorizontalColDown(i,k,j,board) && !hasConflicted[i][k]){
            //目标格子的值等于当前格子，且中间格子为空，才能向下移动
            showMoveAnimation(i,j,k,j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;

            score += board[k][j];
            updateScore(score);
            hasConflicted[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()",200);
  return true;
}

function isgameover() {
  if(nospace(board) && nomove(board)) {
    gameover();
  }
}

function gameover() {
  alert("game over");
}