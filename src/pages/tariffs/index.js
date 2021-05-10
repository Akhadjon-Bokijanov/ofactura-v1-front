import React from "react";
import st from './tariff.module.scss'
import {Button, Col, Row} from "antd";
import {Link} from "react-router-dom";
import count from '../../assests/tariff/count.png'
import date from '../../assests/tariff/date.png'
import vertical from '../../assests/tariff/vertical.png'
const tariffs = [
    {
        id:'1',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'2',
        name:'3000',
        price:'2 500 000',
        count:'3000',
        date:'3'
    },
    {
        id:'3',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'4',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'5',
        name:'3000',
        price:'2 500 000',
        count:'3000',
        date:'3'
    },
    {
        id:'6',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'7',
        name:'3000',
        price:'2 500 000',
        count:'3000',
        date:'3'
    }
]
function Tariffs() {
    return(
        <>
            <div>
                <Row gutter={[16,16]} style={{marginRight:'0'}}>
                    <Col md={7} style={{marginLeft:'25px',marginBottom:'-10px',marginTop:'23px'}}><h1>Tariff</h1></Col>
                </Row>
                <Row gutter={[16,16]} style={{marginRight:'0'}}>

                    {
                        tariffs.map((item,index)=>(
                            <Col className={st.block} md={7}>
                                <div className={'flexible'}>
                                    <p className={`${st.name}`} style={{width:'52%'}}>Тарифы {item.name}</p>
                                    <p className={`${st.name}`} style={{color:'#2B63C0'}}>{item.price} сум</p>
                                </div>
                                <p className={st.bonus}>5 бесплатных документов</p>
                                <div className={'flexible'}>
                                    <div style={{width:'49.5%'}}>
                                        <img src={count} alt=""/>
                                        <p className={st.count_and_time}>Количество</p>
                                        <p className={st.count_and_time_values}>{item.count} шт</p>
                                    </div>
                                    <div style={{width:'1%'}}><img src={vertical} alt=""/></div>
                                    <div style={{width:'49.5%',marginLeft:'35px'}}>
                                        <img src={date} alt=""/>
                                        <p className={st.count_and_time}>Время активност</p>
                                        <p className={st.count_and_time_values}>{item.date} Месяц</p>
                                    </div>
                                </div>
                                <Button className={st.more_btn}><p>Подробнее</p></Button>
                            </Col>
                        ))
                    }

                    {/*<Col className={st.block} md={7}></Col>*/}
                    {/*<Col className={st.block} md={7}></Col>*/}

                </Row>
            </div>
        </>
    )
}

export default Tariffs