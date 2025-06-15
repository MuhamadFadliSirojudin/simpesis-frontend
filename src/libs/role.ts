export const getUserRole = (): "admin" | "guru" | null => {
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "guru") return role;
  return null;
};
