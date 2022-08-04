

export const mockApiCall = (success) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ message: true });
      } else {
        reject({ message: false });
      }
    }, 2000);
  });
};
