"use client";

import React, { useState, useEffect, useRef } from "react";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [barY, setBarY] = useState(150);
  const [ball, setBall] = useState({ x: 50, y: 50, dx: 5, dy: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hit, setHit] = useState(false);

  const barHeight = 100;
  const barWidth = 10;
  const ballRadius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const drawBar = () => {
      if (ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(10, barY, barWidth, barHeight);
      }
    };

    const drawBall = () => {
      if (ctx) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
      }
    };

    const moveBall = () => {
      setBall((prevBall) => {
        let { x, y, dx, dy } = prevBall;

        // Check for collision with top and bottom walls
        if (y + dy > canvas!.height - ballRadius || y + dy < ballRadius) {
          dy = -dy;
        }

        // Check for collision with the right wall
        if (x + dx > canvas!.width - ballRadius) {
          dx = -dx;
        }
        // Check for collision with the bar
        else if (
          !hit &&
          x + dx < 20 + barWidth &&
          y > barY &&
          y < barY + barHeight
        ) {
          dx = -dx * 1.1; // Increase speed by 10%
          dy = (dy + (Math.random() - 0.5) * 2) * 1.1; // Slightly randomize vertical direction and increase speed by 10%
          setScore(score + 1);
          setHit(true); // Set hit to true to prevent multiple score increases
        }
        // Reset hit state after ball has moved away from the bar
        else if (hit && x > 20 + barWidth) {
          setHit(false);
        }
        // Check if the ball goes out on the left side (Game Over)
        else if (x + dx < ballRadius) {
          setGameOver(true);
        }

        return { x: x + dx, y: y + dy, dx, dy };
      });
    };

    const draw = () => {
      if (ctx && !gameOver) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        drawBar();
        drawBall();
        moveBall();

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, canvas!.width - 120, 30);
      } else if (ctx && gameOver) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas!.width / 2 - 100, canvas!.height / 2);
        ctx.fillText(
          `Final Score: ${score}`,
          canvas!.width / 2 - 120,
          canvas!.height / 2 + 50
        );
      }
    };

    const intervalId = setInterval(draw, 10);

    return () => clearInterval(intervalId);
  }, [barY, ball, gameOver, score, hit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && barY > 0) {
        setBarY((barY) => Math.max(barY - 20, 0));
      } else if (
        e.key === "ArrowDown" &&
        barY < canvasRef.current!.height - barHeight
      ) {
        setBarY((barY) =>
          Math.min(barY + 20, canvasRef.current!.height - barHeight)
        );
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        setBarY(
          Math.min(
            Math.max(mouseY - barHeight / 2, 0),
            canvas.height - barHeight
          )
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [barY]);

  const resetGame = () => {
    setBarY(150);
    setBall({ x: 50, y: 50, dx: 5, dy: 5 });
    setScore(0);
    setGameOver(false);
    setHit(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ border: "1px solid black" }}
      />
      {gameOver && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Game;
