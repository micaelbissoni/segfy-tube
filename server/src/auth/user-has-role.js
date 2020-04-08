const roles = ['ADMIN', 'USER', 'UNKNOWN'];

const userHasRole = (user, roleToHave) => {
  const { role } = user || {};

  if (!role) {
    return roleToHave === 'UNKNOWN';
  }

  const roleIndex = roles.indexOf(role);
  const roleToHaveIndex = roles.indexOf(roleToHave);
  return roleIndex <= roleToHaveIndex;
};

export default userHasRole;
