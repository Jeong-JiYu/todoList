"use client";

import React, { useState } from 'react';

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      if (isEditing) {
        const updatedList = todoList.map((todo, index) =>
          index === currentIndex ? newTodo : todo
        );
        setTodoList(updatedList);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setTodoList([...todoList, newTodo]);
      }
      setNewTodo('');
    }
  };

  const editTodo = (index) => {
    setNewTodo(todoList[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const deleteTodo = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
    if (isEditing && currentIndex === index) {
      setIsEditing(false);
      setNewTodo('');
      setCurrentIndex(null);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 className="title">To Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>
        {isEditing ? 'Update' : 'Add'}
      </button>
      <ul>
        {todoList.map((todo, index) => (
          <li className="listItem" key={index}>
            {todo}
            <button onClick={() => editTodo(index)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => deleteTodo(index)} style={{ marginLeft: '10px' }}>Del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}