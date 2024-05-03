import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from "../main";
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState("")
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState(false)

  const {isAuthenticated} = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true
        }
      )
      toast.success(data.message)
      setRefresh(!refresh)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteHandler = async (id)=>{
    try {
      const { data } = await axios.delete(
        `${server}/tasks/${id}`,
        {
          withCredentials: true
        }
      )
      toast.success(data.message)
      setRefresh(!refresh)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh(!refresh)
    } catch (error) {
      toast.error(error.response.date.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.task);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });

  }, [refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    <div className='container'>
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
          key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
          />
        ))}
      </section>


    </div>

  )
}
