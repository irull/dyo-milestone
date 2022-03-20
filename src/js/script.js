console.log("halo from index.html");

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
    backgroundColor: "red",
  });
};
