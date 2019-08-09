import React, {useState, useEffect} from 'react';
import {Table, Button} from 'antd';
function App() {
  let theme = localStorage.getItem('theme');
  const [show,setShow] = useState(false)
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  useEffect(()=>{
    let themejs = 'mint-green';
    if(theme){
      themejs = theme;
    }
    import('./public/style/theme/'+themejs).then(res=>{
      setShow(true);
    });
  },[theme]);
  return (
    <div className={"App"} style={{display: show?'block':'none'}}>
      <header className="App-header">
        <Button onClick={()=>{localStorage.setItem('theme','space-gray');window.location.reload();}}>切换皮肤 灰色调</Button>
        <Button onClick={()=>{localStorage.setItem('theme', 'mint-green');window.location.reload();}}>切换皮肤 薄荷绿</Button>
        <Table dataSource={dataSource} columns={columns}/>
      </header>
    </div>
  );
}

export default App;
