export const adaptUser = (userInfo) => {
  return {
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    avatarURL: `https://4.react.pages.academy${userInfo.avatar_url}`,
  };
};
