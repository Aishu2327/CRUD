import React, { useEffect,useState } from 'react';
import {Data} from './Data'; 

function App() {

  const [ data, setData] = useState([]);
  const [ task, setTask] = useState('');
  const [ id, setId] = useState(0);
  const [ isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(Data)
  },[]);

  const handleEdit = (id) => {
  const dt = data.filter(item => item.id === id);
    if(dt.length > 0)
    {
      setIsUpdate(true);
      setId(id);
      setTask(dt[0].task);
    }
  }

  const handleDelete = (id) => {
    if(id > 0)
    {
      if(window.confirm("Are you sure to delete this item?"))
       {
        const dt=data.filter(item => item.id !== id);
        setData(dt);
       }
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if(task === '')
      error += 'Task is required';

    if(error === '')
    {
    const dt = [...data];
    const newObject = {
      id : data.length + 1,
      task : task
    }
    dt.push(newObject);
    setData(dt);
    handleClear();
  }
  else
  {
    alert(error);
  }
}

  const handleUpdate = () => {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
  const dt = [...data];
  dt[index].task = task;
  setData(dt);
  handleClear();
    }
  }

  const handleClear = () => {
    setId(0);
    setTask('');
    setIsUpdate(false);
  }

  return (
     <div className="App">

      <div style={{display:'flex' , justifyContent:'center' , marginTop:'10px' , marginBottom:'10px' }}>
         <div>
            <label>Task :
              <input type='text' placeholder='Enter the Task' onChange={(e) => setTask(e.target.value)} value={task}/>
            </label>
         </div>
         <div>
          {
            isUpdate ?     
            <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button> :  
            <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>   
          }
         <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
         </div>
      </div>
     
     <table className='table table-hover' >
      <thead>
        <tr>
          <td>Id</td>
          <td>Task</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index) => {
            return (
              <tr key={index}>
                <td>{index+ 1}</td>
                <td>{item.task}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          } 
          )
        }

      </tbody>
     </table>
      

     </div>
  );
}

export default App;
