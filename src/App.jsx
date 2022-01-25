import './App.scss';
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import './components/font-awesome-icons/font-awesome-icons';
import CabinetIndex from './cabinet/index.component';
import moment from 'moment';
import "moment/locale/uz-latn";
import 'moment/locale/ru';
import axios from 'axios';
import FrontIndexRouter from './frontend/index.router';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectLoadedKey, selectToken } from './redux/user/user.selector';
import { logOut } from './redux/user/user.action';
import { API_HOST } from './env';
import AdminIndexRouter from './admin/admin.router';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Auth from "./pages/auth";
import UserContext from "./context/UserContext";
import SideNav from "./cabinet/right-sidebar";
import { Form, Row, Col, Input } from 'antd';

var QRCode = require('qrcode.react');

const ForAuthenticatedUsers=()=>{
    return(
        <>
            {/*<SideNav>*/}
                <Switch>
                    <Route path="/home" render={()=> <FrontIndexRouter /> } />
                    <Route path="/admin" render={()=> <AdminIndexRouter /> }/>
                    <Route path="/cabinet" render={()=> <CabinetIndex /> } />
                    {/*<Route path="/news" render={()=> <News /> } />*/}
                    {/*<Route render={() => <Redirect to="/home/choosecompany" />}></Route>*/}
                </Switch>
            {/*</SideNav>*/}
        </>
    )
};

// axiosInstance.interceptors.request.use(
//     request => {
//         // const {token}=store.getState()
//         request.headers.Authorization =`Bearer ${token}`
//         return request;
//     },
//     error => {
//         return error;
//     }
// );

const App = ({ user, token, loadedKey, signOut })=> {

    moment.locale('uz-latn');
    moment.defaultFormat='MMMM Do YYYY'
    const { t } = useTranslation();
    axios.defaults.baseURL = API_HOST
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    useEffect(()=>{

        if (loadedKey?.time + 1000 * 60 * 30 < Date.now()){
            console.log("Hi")
            signOut()
            message.warn((t("Sessiyangiz tugadi!")))
        }
    }, [])
    
    const [t, setT] = useState();
    const [r, setR] = useState();
    const [c, setC] = useState();
    const [s, setS] = useState();
    const handleFinish = val=>{
    setT(val.t);
        setR(val.r);
        setC(val.c);
        setS(val.s);
    }
   

    return (
        <div className="App">
        <Form onFinish={handleFinish}>
        <Row gutter={8}>
        <Col span={6}>
        <Form.Item name="t">
        <Input placeholder="Terminal ID" />
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item name="r">
        <Input placeholder="Payment No" />
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item name="c">
        <Input placeholder="Payment Date" />
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item name="s">
        <Input placeholder="Fiscal Sign" />
        </Form.Item>
        </Col>
        </Row>
        </Form>
<Row justify="space-between">
    <Col span={8}>
    <QRCode
                            value={`https://ofd.soliq.uz/check?t=${t}&r=${r}&c=${c}&s=${s}`}
                        />
    </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    token: selectToken,
    loadedKey: selectLoadedKey
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
