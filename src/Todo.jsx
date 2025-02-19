import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
    const [input, setInput] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    useEffect(() => {
        const todo = localStorage.getItem('todo');
        if (todo) {
            setToDoList(JSON.parse(todo));
        }
    }, []);

    const addItem = () => {
        if (!input.trim()) {
            toast.warn("Task cannot be empty!");
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
        setEditingIndex(index);
        setEditedValue(toDoList[index].text);
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">Todo List</h1>
            <div className="flex flex-col sm:flex-row w-full max-w-xl gap-3">
                <input
                    type="text"
                    className="flex-1 p-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                    placeholder="Add a new task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={addItem}
                    className="bg-violet-500 hover:bg-violet-400 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-center"
                >
                    <FaPlus />
                </button>
            </div>
            <ul className="mt-6 w-full max-w-xl space-y-4">
                {toDoList.map((item, index) => (
                    <li key={index} className="flex flex-col sm:flex-row items-center justify-between bg-gray-700 p-4 rounded-xl shadow-md gap-4">
                        {editingIndex === index ? (
                            <div className="flex flex-1 gap-2">
                                <input
                                    type="text"
                                    className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-600 text-white focus:ring-2 focus:ring-violet-400"
                                    value={editedValue}
                                    onChange={(e) => setEditedValue(e.target.value)}
                                />
                                <button
                                    onClick={() => saveEdit(index)}
                                    className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
                                >
                                    <FaSave />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 flex-1">
                                <input
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() => toggleComplete(index)}
                                    className="h-6 w-6 accent-violet-500 cursor-pointer"
                                />
                                <span className={`text-white text-lg truncate ${item.done ? 'line-through text-gray-400' : ''}`}>
                                    {item.text.length > 30 ? `${item.text.substring(0, 30)}...` : item.text}
                                </span>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <button
                                disabled={item.done}
                                onClick={() => startEdit(index)}
                                className={`px-4 py-2 rounded-lg text-white shadow ${item.done ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'}`}
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => remove(index)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg shadow"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Todo;