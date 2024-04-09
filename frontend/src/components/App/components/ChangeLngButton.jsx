import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

const ChangeLngButton = () => {
  const [lenguage, setLenguage] = useState('ru');
  const { t, i18n } = useTranslation();

  const handleSwitchLng = (e) => {
    const lng = e.target.ariaLabel;
    setLenguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle
        variant=""
        id="dropdown-basic-button"
        title={t(`navBar.${lenguage}`)}
      >
        {t(`navBar.${lenguage}`)}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="light">
        <Dropdown.Item aria-label="ru" onClick={handleSwitchLng}>{t('navBar.ru')}</Dropdown.Item>
        <Dropdown.Item aria-label="en" onClick={handleSwitchLng}>{t('navBar.en')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChangeLngButton;
