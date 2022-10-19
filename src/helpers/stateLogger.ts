const log = console.log;

export const frameLogger = (label: string) =>
  log(`%c${label}: animation completed.`, "color: red");

export const stateLogger = (label: string, mounted: boolean) => {
  mounted
    ? log(`%c${label}: mounted.`, "color: green")
    : log(`%c${label}: unmounted.`, "color: orange");
};
