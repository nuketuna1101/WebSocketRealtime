import { sendEvent, setScoreInstance } from './Socket.js';

class Score {
  score = 0;
  stageChange = true;
  HIGH_SCORE_KEY = 'highScore';

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
     // Score 인스턴스를 Socket.js에 전달
    setScoreInstance(this);
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;
    // 점수가 100점 이상이 될 시 서버에 메세지 전송
    if (Math.floor(this.score) === 10 && this.stageChange) {
      this.stageChange = false;
      // :: 서버 전송 : movestagehandler id로 전송
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
    }
  }

  // TODO :: 아이템 획득 시 스코어 증가 
  getItem(itemId) {
    // 서버에 전송: item handler id 
    sendEvent(4, { itemId });
  }

  addScore(additionalScore){
    this.score += additionalScore;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
