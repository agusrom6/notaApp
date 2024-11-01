// src/NoteApp.js
import React, { useState, useEffect } from 'react';


const NoteApp = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    const handleAddNote = () => {
        if (title && content) {
            const newNote = {
                id: Date.now(),
                title,
                content,
                date: new Date().toLocaleString(),
            };
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            setTitle('');
            setContent('');
        }
    };

    const handleDeleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    return (
        <div className="max-w-2xl mt-5 m-auto p-5 bg-[#342a45] rounded-lg shadow-lg">
            <h1 className='text-center text-white font-bold text-2xl'>Notas</h1>
            <input className='w-full my-3 mx-0 p-3 border-spacing-1 rounded'
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea className='w-full my-3 mx-0 p-3 border-spacing-1 rounded'
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={handleAddNote} className='bg-green-600 hover:bg-green-500 text-white border-none p-3 cursor-pointer rounded w-full'>Agregar Nota</button>

            <div className="mt-5">
                {notes.map(note => (
                    <div key={note.id} className="bg-[#241b35] text-white p-4 my-3 mx-0 border-1 rounded">
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <small>{note.date}</small>
                        <button onClick={() => handleDeleteNote(note.id)} className='bg-red-600 hover:bg-red-500 mt-3 border-none p-3 cursor-pointer rounded w-full text-white'>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoteApp;


