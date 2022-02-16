// Check empty
export const isEmpty = (value) => {
  if (value === '') {
    return true;
  }
  return false;
};

// Check email
export const isEmail = (value) => {
  if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    return true;
  }
  return false;
};

// Min length
export const isPhone = (value) => {
  if (value.length !== 10) {
    return true;
  }
  return false;
};
