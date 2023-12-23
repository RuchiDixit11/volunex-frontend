import useSettings from 'app/hooks/useSettings';
import Logo from '../../assets/img/mylog.png';

const MyLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <div>
      <img src={Logo} style={{ width: '100px' }} />
    </div>
  );
};

export default MyLogo;
