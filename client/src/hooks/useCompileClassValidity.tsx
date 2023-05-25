const compileValidityClasses = (
  type: string,
  password?: string,
  email?: string
) => {
  switch (type) {
    case "password":
      if (password === "") {
        return " focus:input-secondary";
      } else if (password && password.length < 8) {
        return "input-error focus:input-error ";
      } else {
        return "input-success focus:input-success ";
      }
      break;
    case "email":
      if (email === "") {
        return " focus:input-secondary";
      } else if (email && !email.includes("@")) {
        return "input-error focus:input-error ";
      } else {
        return "input-success focus:input-success ";
      }
      break;
  }
};
export default compileValidityClasses;
