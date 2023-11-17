import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import {useDispatch} from 'react-redux';
import {addTodo, editTodo} from '../features/todoSlice';
import {removeTodo} from '../features/todoSlice';
import { useSelector } from "react-redux";


const Form = () => {

  const [state, setState]=useState('');
  const[editId,setEditId]=useState('');
  const[editText,setEditText]=useState(null);
  const dispatch=useDispatch();

   let handleSubmit=(event)=>{
    event.preventDefault();

     if(editId!==null){

       setEditId(editTodo({id:editId ,newText:state}));
       setEditId(null);
     }
     else{
     dispatch(addTodo(state));
     }
     setState('');
    
   }

   let todos=useSelector(state=>state.todos);

   let handleEdit=(id,text)=>{
    setEditId(id);
    setEditText(text);



   }



  return (
    <React.Fragment>
      <section>
        <div className="grid">
          <div className="col-8 ">
            <h2 className="m-3">Todo List </h2>
            <Card className="m-3 shadow-5">
              
              <form  onSubmit={handleSubmit}>
                <InputText
                  name="name"
                  placeholder="Enter product name"
                   value={state}
                   onChange={(e)=>setState(e.target.value)}
                  className="mr-2"
                />

                <Button label=" Add Task" severity="warning" />
              </form>
              <div className="mb-3 m-5">
                <table>
                  <tr>
                    <th className="">Task</th>
                    <th>Actions</th>
                  </tr>

                  {todos.map((todo)=>{

                    return(
                       <tr key={todo.id}>
                      
                        <td> 
                          {editId===todo.id ?
                        
                        <InputText value={editText} onChange={(e)=>setEditText(e.target.value)}/>
                      
                        :(todo.text)}
                          
                          
                          </td>
                          <td> {editId===todo.id ?
                          <Button label="save" severity="warning" onClick={() => {
                            dispatch(editTodo({ id: todo.id, newText: editText }));
                            setEditId(null);
                          }} />:
                          (<React.Fragment>
                            <Button label="Edit" onClick={()=>handleEdit(todo.id,todo.text)} security="success" style={{height:'30px' ,width:'80px'}}/>
                        <Button 
                            onClick={()=>dispatch(removeTodo(todo.id))}
                            
                            label="Delete" severity="danger"style={{ height: '30px', width: '80px' }} />
                          

                          </React.Fragment>)} </td>
                                                  
                        
                       </tr>
                    )
                  })}
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Form;
