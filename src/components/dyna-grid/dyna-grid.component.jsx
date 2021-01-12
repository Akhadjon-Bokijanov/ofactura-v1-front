import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tooltip, Input, Button, Space, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './dyna-grid.style.scss';
import axios from 'axios';
import { setItemToBeEdited, triggerFetchStart, triggerActionWithPayload } from '../../redux/admin/admin.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  SearchOutlined, 
  ReloadOutlined, 
  PlusCircleOutlined, 
  FileExcelOutlined } from '@ant-design/icons';
import { RESOURCES_PATH } from '../../env';
import RichTextParser from '../rich-text-parser/rich-text-parser.component';

const DynaGrid = ({
  currentUser,            //Provided by the comonent
  match,                  //Provided by the comonent
  setItemToBeEdited,      //Provided by the comonent
  triggerAction,          //Provided by the comonent, redux action consumer
  triggerActionWithPayload, //Provided by comonent, redux action and payload consumer
  dataSource,             //data source for the component
  config:{                //Config object
    addElementViewPath,     //add element to the core
    deleteRequestPath,    //delete request path for API server 
    approveRequestPath,   //approve request path for API server 
    addActionPath,        //UI route for the form 
    viewActionPath,       //UI route to view the element
    resultsViewPath,      //view path to see the results
    triggerReload,        //action to triggere when delete, approve is done
    triggerWithPayload,   //Trigger action with payload
    payload,              //Payload to trigger action
    actions,              //Object of actions to allow
                          //  {
                          //    add: true,
                          //    edit: true,
                          //    delete: true,
                          //    approve: true,
                          //    view: true
                          //  }
    allColumns,           // array of columns to show
                          //  [
                          //    dataIndex: name of the data in the source object  
                          //    dataType: "image" | to show image, 
                          //              "array" | to show array of strings
                          //               "rich-text" | to show rich text format
                          //              "object" | if dataIndex value is object,
                          //                    then you have to provide "items" array to show certain properties of object
                          //               "rich-text": if dataIndex value includes HTML tags 
                          //    isSearchable: true | false 
                          //    isFilterable: true | false
                          //    filters: ["item1", "item2"]  filter options
                          //  ]
  }
})=> {


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState(null);


  let searchInput = null;

  
  //#region PopConfirm functions
  const confirmDelete = (record) => {

    //setVisible(false);
    
    axios({
      url: `/${deleteRequestPath}/${record._id}`, 
      method: 'delete',
      data: {creator: record.creator}
      })
      .then(res=>{
        
        if(triggerReload){
          triggerAction(triggerReload)
        }

        if(triggerWithPayload){
          triggerActionWithPayload(triggerActionWithPayload, payload)
        }
        //setAction(Math.random())
        message.success(`${record._id} is deleted!`);
      }).catch(error=>{
        message.error('Failed to delete!');
        console.error(error);
        
      })
  };

  const confirmApprove = (record) => {

    //setVisible(false);
    axios.patch(`/${approveRequestPath}/${record._id}`, 
      {userId: currentUser._id},)
    .then(res=>{
      if(triggerReload){
        triggerAction(triggerReload)
      }
      
      if(triggerWithPayload){
        triggerActionWithPayload(triggerActionWithPayload, payload)
      }
      //setAction(Math.random())
      message.success(`${record._id} is approved!`);
    }).catch(error=>{
      message.error('Failed to approve!');
      console.error(error);
      
    })
  };

  const cancel = () => {
    //setVisible(false);
    message.error('Action cancelled!');
  };

  const onEditClicked = (record)=>{
    setItemToBeEdited(record);
  }
  //#endregion

  //#region getColumnSearchProps
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  //#endregion

  //#region handleSearch
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)

  };

  const handleReset = clearFilters => {
    console.log(clearFilters)
    
    clearFilters();
    setSearchText('')
  
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    
    setFilteredInfo(filters);
    //setSortedInfo(sorter);

  };
  //#endregion

  const columns =[]

  //#region column config
  allColumns.forEach((element, index)=> {
    columns.push(
      {
        dataIndex: element.dataIndex,
        title: element.dataIndex.toUpperCase(),
        key: element.dataIndex,
        width: 200,
        ellipsis: element.dataIndex==='detail' || element.dataIndex ==='description' ? true : false,     
      });

    if(element.isSearchable) 
    {
        columns[index] = {...columns[index], ...getColumnSearchProps(element.dataIndex)}
    }

    if(element.isFilterable)
    {
      columns[index] = {...columns[index], 
        filters: element.filters.map(univer=>({text: univer, value: univer})), 
        onFilter: (value, record) => record[element.dataIndex].toLowerCase().includes(value.toLowerCase()),}
    }

    if(element.isBoolean){
      columns[index] = {...columns[index], 
      dataIndex: null,
      width: 200, 
      render: (record)=><div>{record[element.dataIndex] ? 1 : 0}</div>}
    }

    if(element.isBoolean && element.isFilterable){
      columns[index] = {...columns[index], 
      dataIndex: null,
      width: 200,
      filters: [{text: 1, value: true}, {text: 0, value: false}], 
      onFilter: (value, record) =>!!record[element.dataIndex] === !!value,
      render: (record)=><div>{record[element.dataIndex] ? 1 : 0}</div>}
    }
    
    if(element.dataType === 'image'){
      columns[index] = { 
        ...columns[index],
        dataIndex: null,
        width: 170,
        render: (record)=><div style={{textAlign: "center"}}>
          <img style={{width: 80, height: 80 }} src={`${RESOURCES_PATH}/${record[element.dataIndex]}`} alt={`${record[element.dataIndex]}`} />
        </div>
      }
    }

    if(element.dataType === 'rich-text'){
      columns[index] = { 
        ...columns[index],
        dataIndex: null,
        width: 400,
        render: (record)=><RichTextParser text={record[element.dataIndex]} />
      }
    }

    if(element.dataType === 'object'){
      columns[index]={
        ...columns[index],
        dataIndex: null,
        width: 200,
        render: record=><div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          {
            record[element.dataIndex] 
          ? element.items.map((field, index)=><div key={`sub-dyna-field-${index}`}>{`${field}: `}{ record[element.dataIndex][field] }</div>)
            : "Nothing found!"
          }
        </div>
      }
    }

    if(element.dataType === 'array'){
      columns[index]={
        ...columns[index],
        dataIndex: null,
        onFilter: (value, record) => record[element.dataIndex].includes(value),
        render: record=><div>
          {
            record[element.dataIndex].map(item => <span style={{ backgroundColor: '#4870c7', color: 'white', padding: 3, marginRight: 5, marginBottom: 5, borderRadius: 3 }}>{item} </span>)
          }
        </div>
      }
    }

    if(element.dataType === 'array-count'){
      columns[index]={
        ...columns[index],
        dataIndex: null,
        onFilter: (value, record) => record[element.dataIndex].includes(value),
        render: record=><div>
          {
            record[element.dataIndex].length
          }
        </div>
      }
    }

  });
    //#endregion
    
    //Actions
    columns.push({
      title: "Actions",
      key: 'actions',
      width: 90,
      fixed: 'right',
      render: (record) => 
        <div className="dyna-grid-actions">
          {actions.edit 
          ? <Tooltip placement="left" title="Edit">
              <Link 
                onClick={()=>{onEditClicked(record)}} 
                to={`${match.path}/actions/update`}>
                  <EditOutlined style={{color: 'blue'}}/>
              </Link>
            </Tooltip>
          : null
          }

          {actions.delete 
          ? <Tooltip placement="bottom" title="Delete">
              <Popconfirm
                title="Are you sure delete this news?"
                onConfirm={()=>{confirmDelete(record)}}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
              <DeleteOutlined style={{color: 'red'}} />
            </Popconfirm>
          </Tooltip>
          : null
          }
          
          {actions.approve 
            ? <Tooltip placement="bottom" title="Approve">
                <Popconfirm
                  title="Approve this news?"
                  onConfirm={()=>{confirmApprove(record)}}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <FontAwesomeIcon style={{color: 'green'}} icon="check-circle" />
                </Popconfirm>
              </Tooltip>
          : null
          }

          {actions.view 
          ? <Tooltip placement="bottom" title="View" >
                <Link to={`${viewActionPath}/${record._id}`}><EyeOutlined /></Link>
              </Tooltip>
          : null  
          }

          {actions.chart
          ?
            <Tooltip placement="bottomLeft" title="Results">
              <Link to={`${resultsViewPath}/${record._id}`}>
                <FontAwesomeIcon icon="chart-line" style={{color: '#fb8c00'}} />
              </Link>
            </Tooltip>
          : null
          }

          {
            actions.addElement
            ?
              <Tooltip placement="bottomLeft" title="Add element">
                <Link to={`${match.path}/${addElementViewPath}/${record._id}`}>
                  <FontAwesomeIcon style={{color: "#e91e63"}} icon="plus-circle" />
                </Link>
              </Tooltip>
            :null
          }
        </div>,
    })

    return (
    <div>
      <div style={{marginBottom: 10, display: "flex", justifyContent: "space-between"}}>
        <Button 
          onClick={()=>{setFilteredInfo(null); setSearchText('')}} 
          type={(searchText || filteredInfo) ? "danger" : null} 
          icon={<ReloadOutlined />}>
            Reset filters
          </Button>
        <div>
          <Button 
            type="primary" 
            style={{marginRight: 5}} 
            icon={<FileExcelOutlined />}>
              Export table
          </Button>
          {actions.add 
          ? <Link to={`${match.path}/${addActionPath}`}>
              <Button type="primary" icon={<PlusCircleOutlined />}>Add Item</Button>
            </Link>
          : null}
        </div>
      </div>
      <Table
        rowKey="_id"
        onChange={handleChange} 
        bordered 
        columns={columns} 
        dataSource={dataSource} 
        scroll={{ x: allColumns.length * 400, y: window.innerHeight - window.innerHeight / 13 }} 
        pagination={{position: ['bottomCenter']}}
      />
    </div>);
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const dispatchMapStateToPros = (dispatch)=>({
  setItemToBeEdited: (item)=>dispatch(setItemToBeEdited(item)),
  triggerAction: (action)=>dispatch(triggerFetchStart(action)),
  triggerActionWithPayload: (action, payload)=>dispatch(triggerActionWithPayload(action, payload))
})

export default connect(mapStateToProps, dispatchMapStateToPros)(withRouter(DynaGrid));