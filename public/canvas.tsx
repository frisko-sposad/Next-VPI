import React, { useRef, useEffect } from "react";
import { squads } from "./database/squads";

const zoom = 2;

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const draw = (ctx, frameCount) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillStyle = "#555555";
    // ctx.beginPath();
    // ctx.fillRect(100, 50, 75, 50);
    // ctx.arc(50, 50, 30 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    // ctx.rect(50, 50, 50, 50);
    // ctx.stroke();
    // ctx.clearRect(0, 0, 400, 400);
    // ctx.fillStyle = "green";
    // ctx.fillRect(x, y, 15, 15);
    // ctx.fillStyle = "red";
    // ctx.fillRect(x1, y1, 15, 15);
    // x++;
    // x1--;
  };

  var x = 10;
  var y = 10;
  var x1 = 498;
  var y1 = 10;

  const battle = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    squads.map(({ size, unitType, locationX, locationY }) => {
      const height = Math.sqrt(size / 2) * zoom;
      const width = Math.sqrt(size / 2) * 2 * zoom;
      ctx.fillStyle = unitType === "Тяж Конница" ? "blue" : "red";
      ctx.fillRect(locationX + x, locationY + y, height, width);
    });
    x++;
    x1--;
    x === x1 && console.log(x, x1);
    // ctx.fillStyle = "blue";
    // ctx.fillRect(x, y + 30, squads[0].x, 15);
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(x1, y1 + 45, 15, 15);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      battle(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, battle]);

  return <canvas width="500" height="600" ref={canvasRef} {...props} />;
};

export default Canvas;
