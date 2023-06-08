export const copy = (text?: string) => {
  if (!text) {
    return;
  }

  navigator.clipboard.writeText(text);
};
