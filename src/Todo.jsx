import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaPlus, FaSun, FaMoon } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
    const [input, setInput] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const todo = localStorage.getItem('todo');
        if (todo) {
            setToDoList(JSON.parse(todo));
        }
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const addItem = () => {
        if (!input.trim()) {
            toast.warn("Task cannot be empty!");
            return;
        }
        if (toDoList.some(task => task.text.toLowerCase() === input.trim().toLowerCase())) {
            toast.error("Task already exists!");
            return;
        }
        setToDoList((prev) => {
            const updatedList = [...prev, { text: input, done: false }];
            localStorage.setItem('todo', JSON.stringify(updatedList));
            toast.success("Task added!");
            return updatedList;
        });
        setInput('');
    };
    

    const remove = (index) => {
        setToDoList((prev) => {
            const updatedList = prev.filter((_, i) => i !== index);
            localStorage.setItem('todo', JSON.stringify(updatedList));
            toast.error("Task removed!");
            return updatedList;
        });
    };

    const toggleComplete = (index) => {
        setToDoList((prev) => {
            const checkedList = prev.map((item, i) =>
                index === i ? { ...item, done: !item.done } : item
            );
            localStorage.setItem('todo', JSON.stringify(checkedList));
            toast.info(checkedList[index].done ? "Task completed!" : "Task marked incomplete!");
            return checkedList;
        });
    };

    const saveEdit = (index) => {
        setToDoList((prev) => {
            const editedList = prev.map((item, i) =>
                index === i ? { ...item, text: editedValue } : item
            );
            localStorage.setItem('todo', JSON.stringify(editedList));
            toast.success("Task updated!");
            return editedList;
        });
        setEditingIndex(null);
    };

    const startEdit = (index) => {
        if (toDoList[index].done) {
            toast.warn("Completed tasks cannot be edited!");
            return;
        }
        setEditingIndex(index);
        setEditedValue(toDoList[index].text);
    };

    return (
        <div className={`fixed inset-0 flex flex-col items-center min-h-screen p-6 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
            <div className="flex justify-between w-full max-w-xl mb-6">
                <h1 className="text-4xl font-bold">Todo List</h1>
                <button onClick={toggleTheme} className="p-3 rounded-full shadow-lg bg-violet-500 hover:bg-violet-400 text-white">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            <div className="flex flex-col sm:flex-row w-full max-w-xl gap-3">
                <input
                    type="text"
                    className={`flex-1 p-3 rounded-xl border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-black placeholder-gray-600'}`}
                    placeholder="Add a new task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addItem} className="bg-violet-500 hover:bg-violet-400 text-white px-5 py-3 rounded-xl shadow-lg">
                    <FaPlus />
                </button>
            </div>
            <ul className="mt-6 w-full max-w-xl space-y-4">
                {toDoList.map((item, index) => (
                    <li key={index} className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl shadow-md gap-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                        {editingIndex === index ? (
                            <div className="flex flex-1 gap-2">
                                <input
                                    type="text"
                                    className={`flex-1 p-2 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300 bg-white text-black'}`}
                                    value={editedValue}
                                    onChange={(e) => setEditedValue(e.target.value)}
                                />
                                <button onClick={() => saveEdit(index)} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow">
                                    <FaSave />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 flex-1">
                                <input
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() => toggleComplete(index)}
                                    className="h-6 w-6 accent-violet-500 cursor-pointer rounded-2xl"
                                />
                                <span className={`text-lg truncate ${item.done ? 'line-through text-gray-400' : ''}`}>{item.text}</span>
                            </div>
                        )}
                        <div className="flex gap-2">
                            {editingIndex === index ?
                                <></> :
                                <button onClick={() => startEdit(index)} className={`px-4 py-2 rounded-lg text-white shadow ${item.done ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'}`}>
                                    <FaEdit />
                                </button>
                            }
                            <button onClick={() => remove(index)} className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg shadow">
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme={theme} />
        </div>
    );
};

export default Todo;