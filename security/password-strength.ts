/**
 * Password validator for login pages
 */

export const strengths = [
	{ level: 0, label: "Muy débil", color: "#f44336" },
	{ level: 1, label: "Débil", color: "#ffc107" },
	{ level: 2, label: "Normal", color: "#ffab91" },
	{ level: 3, label: "Buena", color: "#00e676" },
	{ level: 4, label: "Fuerte", color: "#00c853" },
];

// password rules
const rules = [
	{
		message: "La contraseña debe tener al menos 8 caracteres",
		regex: /^(?=.{8,})/,
	},
	{
		message: "La contraseña debe tener al menos 13 caracteres",
		regex: /^(?=.{13,})/,
	},
	{
		message: "La contraseña debe tener al menos un número",
		regex: /^(?=.*[0-9])/,
	},
	{
		message: "La contraseña debe tener al menos una letra mayúscula",
		regex: /^(?=.*[A-Z])/,
	},
	{
		message: "La contraseña debe tener al menos una letra minúscula",
		regex: /^(?=.*[a-z])/,
	},
	{
		message: "La contraseña debe tener al menos un caracter especial",
		regex: /^(?=.*[!#@$%^&*)(+=._-])/,
	},
];

// count how many rules are valid
export const validatePassword = (password: string) =>
	rules.reduce((acc, rule) => (rule.regex.test(password) ? acc + 1 : acc), 0);

// set color based on password strength
export const calculatePasswordStrength = (password: string) => {
	const count = validatePassword(password);
	return strengths[Math.max(0, count - 2)];
};
