import useSettings from "app/hooks/useSettings";

const MyLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <div>
      <img src="" />
    </div>
  );
};

export default MyLogo;
