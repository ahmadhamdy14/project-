import React, { useEffect, useRef, useState } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const box = 20;
  const canvasSize = 400;

  useEffect(() => {
    if (!isRunning) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let direction = "RIGHT";
    let localScore = 0;
    let snake = [{ x: 5 * box, y: 5 * box }];

    let food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    };

    const draw = () => {
      context.fillStyle = "#f0f0f0";
      context.fillRect(0, 0, canvasSize, canvasSize);

      for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? "green" : "darkgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
      }

      context.fillStyle = "red";
      context.fillRect(food.x, food.y, box, box);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;

      if (snakeX === food.x && snakeY === food.y) {
        food = {
          x: Math.floor(Math.random() * 15 + 1) * box,
          y: Math.floor(Math.random() * 15 + 1) * box
        };
        localScore++;
        setScore(localScore);
      } else {
        snake.pop();
      }

      const newHead = { x: snakeX, y: snakeY };

      if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvasSize ||
        snakeY >= canvasSize ||
        snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        setIsRunning(false);
        setGameOver(true);
        return;
      }

      snake.unshift(newHead);
    };

    const gameInterval = setInterval(draw, 150);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(gameInterval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRunning]);

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h2 style={{ color: "green" }}>🐍 Snake Game</h2>

      {!isRunning && !gameOver && (
        <button
          onClick={() => setIsRunning(true)}
          style={{
            padding: "10px 20px",
            fontSize: "26px",
            cursor: "pointer",
            backgroundColor: "#4CAF50"
          }}
        >
          ▶️ Start Game
        </button>
      )}

      {(isRunning || gameOver) && (
        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          style={{
            border: "2px solid black",
            display: "block",
            margin: "20px auto"
          }}
        ></canvas>
      )}

      {isRunning && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h3>Score: {score}</h3>
        </div>
      )}

      {gameOver && (
        <div
          style={{
            marginTop: "10px",
            padding: "15px",
            border: "2px solid red",
            borderRadius: "8px",
            width: "300px",
            backgroundColor: "red",
            color: "black",
            textAlign: "center"
          }}
        >
          <h3>💀 Game Over</h3>
          <p>
            Your Score: <strong>{score}</strong>
          </p>

          <button
            onClick={handleRestart}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor: "black",
              color: "white"
            }}
          >
            🔁 Restart
          </button>
        </div>
      )}
    </div>
  );
}
