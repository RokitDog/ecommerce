type Props = {
  to: string;
  url: string;
};

export const resetEmailTemplate = ({to, url}: Props): string => {
  return `
    hey ${to}
    reset password 
    <a href=${url}>here</a>
  `;
};
