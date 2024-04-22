import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

import { actions as uiActions } from '../../../slices/ui';

const ChangeLngButton = () => {
  const dispatch = useDispatch();
  const { defaultLng, choosenLng } = useSelector((state) => state.ui.uiLenguage);
  const { t, i18n } = useTranslation();
  const lenguage = choosenLng || defaultLng;

  const handleSwitchLng = (e) => {
    const lng = e.target.ariaLabel;
    dispatch(uiActions.setLenguage(lng));
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown className="mx-2" drop="start">
      <Dropdown.Toggle variant="" title={t(`navBar.${lenguage}`)}>
        {t(`navBar.${lenguage}`)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item aria-label="ru" onClick={handleSwitchLng}>{t('navBar.ru')}</Dropdown.Item>
        <Dropdown.Item aria-label="en" onClick={handleSwitchLng}>{t('navBar.en')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChangeLngButton;
