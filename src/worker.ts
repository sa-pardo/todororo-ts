export {};

const timer = (time: number): number => {
  const start: number = Date.now();
  return setInterval(() => {
    const dt: number = Date.now() - start;
    const aux: number = Number((dt / 1000).toFixed(0));
    // eslint-disable-next-line no-restricted-globals
    (self as unknown as Worker).postMessage(time - aux);
  }, 100);
};

let interval: number;

onmessage = (e: MessageEvent) => {
  switch (e.data.type) {
    case "start":
      interval = timer(e.data.time);
      break;
    case "stop":
      clearTimeout(interval);
      break;
    default:
      break;
  }
};
