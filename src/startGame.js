var canvas = document.getElementById("GameScene");
var context = canvas.getContext("2d");
context.canvas.height = sceneConfig.sceneHeight;
context.canvas.width = sceneConfig.sceneWidth;

context.fillStyle = "#202020";
context.fillRect(0, 0, sceneConfig.sceneWidth, sceneConfig.sceneHeight);

playGame();