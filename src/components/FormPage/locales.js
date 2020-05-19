const routes = {
  forget: "/forgottenpassword",
  login: "/login",
  signup: "/signup",
};

const locales = {
  forget: {
    href: routes.forget,
    formType: "Forget",
    formTitle: "Mot de passe oublié?",
    inputs: ["email"],
    label: "Mot de passe oublié?"
  },
  login: {
    href: routes.login,
    formType:"Login",
    formTitle:"Connexion",
    inputs:["email", "password"],
    label: "Déjà inscrit? Connectez-vous!"
  },
  signup: {
    href: routes.signup,
    formType: "Signup",
    formTitle: "Inscription",
    inputs: ["pseudo", "email", "password", "confirmPassword"],
    label: "Nouveau? Inscrivez-vous!"
  }
};

export const getBottomLinks = (...types) => {
  const output = [];

  for(const key of types) {
    const {href, label} = locales[key];
    output.push({href, label});
  }
  
  return output;
};

export default locales;
