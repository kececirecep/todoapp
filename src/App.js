import { useState } from 'react';
import './App.css';

import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";


function App() {
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState("bg-black");
  const [todos, setTodos] = useState([]);
  const [btnShow, setBtnShow] = useState(false);
  const [globalId, setglobalId] = useState(0);

  const inputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  }

  const add = () => {
    const newObject = {
      text: inputValue,
      color: color,
      id: Math.floor(Math.random() * 99994)
    }
    setTodos([...todos, newObject])
    console.log(todos);
    setInputValue("")
  }

  const remove = (id) => {
    const filteredArray = todos.filter(item => item.id !== id)
    setTodos(filteredArray)
  }

  const update = (id) => {
    setBtnShow(true)
    const filteredUpdate = todos.filter(item => item.id === id)
    const x = filteredUpdate.map(item => {
      return item.text
    })
    const global = filteredUpdate.map(item => {
      return item.id
    })
    setInputValue(x)
    setglobalId(global) 
    console.log("Global ID:"+globalId); 

  }

  const updateBtn=()=>{    
    const yeniDizi =  todos.map(item=>{
       if(item.id==globalId){
        return{
          ...item,
          color:color,
          text:inputValue
        } 
       } 
       return item;
     })
    setBtnShow(false)
    setInputValue("")
    setTodos(yeniDizi)
  }





  
  return (
    <div className="">
      <div>
        <div>
          <input value={inputValue} onChange={inputChange} type="text" className='px-4 py-2 border border-red-500 rounded-full m-4' placeholder='TODO ENTER' />
          {btnShow ? (<button onClick={updateBtn} className='px-8 py-2 bg-gray-500 text-white rounded-full '>Update</button>) : (<button onClick={add} className='px-8 py-2 bg-blue-500 text-white rounded-full '>Add</button>)}
        </div>
        <button onClick={() => setColor("bg-gray-500")} className='px-4 py-2 bg-gray-500 text-white rounded-full m-4'>Gray</button>
        <button onClick={() => setColor("bg-green-700")} className='px-4 py-2 bg-green-500 text-white rounded-full m-4'>Green</button>
        <button onClick={() => setColor("bg-purple-700")} className='px-4 py-2 bg-purple-500 text-white rounded-full m-4'>Purple</button>
      </div>
      <div className='w-[400px] p-2'>
        {
          todos.map(item => {
            return (
              <div key={item.id} className={`flex justify-between p-2 text-white mb-4 px-4 font-semibold rounded-full ${item.color}`}>
                <p>{item.text}</p>
                <div className='flex gap-4'>
                  <span onClick={() => update(item.id)} className='cursor-pointer px-2 py-1 bg-amber-600 text-white font-semibold rounded-md'><BiEdit /></span>
                  <span onClick={() => remove(item.id)} className='cursor-pointer px-2 py-1 bg-red-500 text-white font-semibold rounded-md'><FiDelete /></span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
