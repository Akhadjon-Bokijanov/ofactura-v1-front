import React, { useState, useEffect } from 'react';
//import { connect } from 'react-redux';
//import { setUserLocale } from '../../redux/user/user.actions';
//import { createStructuredSelector } from 'reselect';
//import { selectUserLocale } from '../../redux/user/user.selector';
import { Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";

const LanguagesDropdown = ({ locale, changeLocale }) => {
    const { i18n } = useTranslation();

    const [activeLang, setActiveLang] = useState(i18next.language);

    useEffect(()=>{
        setActiveLang(i18next.language)
    }, [i18next.language])

    const languagesMenu = (
        <Menu>
            <Menu.Item onClick={() => { 
                //changeLocale('uz'); 
                i18n.changeLanguage('uz') 
                }}>
                <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/uz.png" /> O'zb
            </Menu.Item>
            <Menu.Item onClick={() => {
                //changeLocale('uz');
                i18n.changeLanguage('uz-Cyrl')
            }}>
                <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/uz.png" /> Ўзб
            </Menu.Item>
            <Menu.Item onClick={() => { 
                //changeLocale('ru'); 
                i18n.changeLanguage('ru') 
            }}>
                <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/ru.png" /> Pyc
            </Menu.Item>
            <Menu.Item onClick={() => { 
                //changeLocale('en'); 
                i18n.changeLanguage('en') 
            }}>
                <img style={{ width: 25, borderRadius: '50%' }} alt="languange" src="/images/en.png" /> Eng
            </Menu.Item>
        </Menu>
    )

    return (<span className="trigger text-float-right">
        <Dropdown overlay={languagesMenu}>
            <img style={{ width: 25, borderRadius: '50%', marginRight:30 }} alt="languange" src={`/images/${activeLang==="uz-Cyrl"?"uz": activeLang}.png`} />
        </Dropdown>
    </span>)
}

// const mapDispatchToProps = dispatch => ({
//     changeLocale: locale => dispatch(setUserLocale(locale))
// })

// const mapStateToProps = createStructuredSelector({
//     locale: selectUserLocale
// })

//export default connect(mapStateToProps, mapDispatchToProps)(LanguagesDropdown);
export default LanguagesDropdown;