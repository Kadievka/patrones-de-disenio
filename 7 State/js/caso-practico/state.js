//context
class Ball {

  constructor(ctx, canvas, ballSize) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ballSize = ballSize;
    this.positionX = 0;
    this.positionY = 0;

    this.state = new State1();
  }

  setState(state) {
    this.state = state;
  }

  //es responsabilidad del state, se puede llamar, handle, request, etc...
  print() {
    this.state.print(this);
  }
}

class State1 {

  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

    console.log(JSON.stringify({X: ball.positionX, Y: ball.positionY, width: ball.width, height: ball.height}))

    if(ball.positionX < (ball.width - ball.ballSize)) ball.positionX += ball.ballSize;
    else ball.setState(new State2());
  }
}

class State2 {

  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

    console.log(JSON.stringify({X: ball.positionX, Y: ball.positionY}))

    if(ball.positionY < (ball.height - ball.ballSize)) ball.positionY += ball.ballSize;
    else ball.setState(new State3());
  }
}

class State3 {

  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

    console.log(JSON.stringify({X: ball.positionX, Y: ball.positionY}))
    if( 0 < ball.positionX ) ball.positionX -= ball.ballSize;
    else ball.setState(new State4());
  }
}

class State4 {

  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

    console.log(JSON.stringify({X: ball.positionX, Y: ball.positionY}))
    if( 0 < ball.positionY) ball.positionY -= ball.ballSize;
    else ball.setState(new State1());
  }
}

const context = canvas.getContext('2d');
context.fillStyle = "black";

const ball = new Ball(context, canvas, 10);
setInterval(()=>{
  ball.print()
}, 90);

