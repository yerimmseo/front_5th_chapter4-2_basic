self.onmessage = function (e) {
  const n = e.data;
  for (let i = 0; i < n; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
  }
  self.postMessage("done");
};
