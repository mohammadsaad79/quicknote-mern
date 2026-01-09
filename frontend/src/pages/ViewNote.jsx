import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { X } from 'lucide-react'
import toast from 'react-hot-toast';

const availablePalettes = [
  'default',
  'blue-note',
  'green-note',
  'yellow-note',
  'pink-note',
  'purple-note',
]

export default function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentPalette, setCurrentPalette] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCurrentPalette(res.data.color || 'default');
      } catch (error) {
        console.error(error);
        alert('Note not found');
        navigate('/notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const updateNote = async () => {
    try {
      await api.put(`/notes/${id}`, { title, content, color: currentPalette });
      toast.success('Note updated');
      navigate('/notes');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  const paletteBg = {
    default: 'bg-white',
    'blue-note': 'bg-blue-200',
    'green-note': 'bg-emerald-200',
    'yellow-note': 'bg-yellow-200',
    'pink-note': 'bg-pink-200',
    'purple-note': 'bg-violet-200',
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full h-screen bg-black/5">
        <div className={`w-130 flex flex-col rounded-xl mt-15 p-6 gap-2 ${paletteBg[currentPalette]}`}>
          <div className='flex justify-between'>
            <h3 className='font-semibold text-xl'>Edit Note</h3>
            <X size={18} onClick={() => navigate('/notes')} className='hover:bg-gray-300 rounded-sm cursor-pointer'/>
          </div>
          <p className='text-sm text-gray-600'>Update your note details below.</p>
          <div className='flex flex-col gap-1 mt-5 text-sm'>
            <label className='font-semibold'>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="h-10 p-3 rounded-lg bg-gray-100 outline-0"
            />
          </div>
          <div className='flex flex-col gap-1 mt-2 text-sm'>
            <label className='font-semibold'>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit note"
              className="h-20 p-3 py-2 rounded-lg resize-none bg-gray-100 outline-0"
            />
          </div>
          <div className='flex flex-col gap-1 mt-2 text-sm'>
            <label className='font-semibold'>
              Color
            </label>

            <div className="flex space-x-2">
              {availablePalettes.map((palette) => (
                <button
                  key={palette}
                  onClick={() => setCurrentPalette(palette)}
                  className={`w-8 h-8 rounded-full border
                    ${paletteBg[palette]}
                    ${currentPalette === palette ? 'w-9 h-9' : ''}
                  `}
                />
              ))}
            </div>
          </div>

          <div className="flex mt-4 gap-3 justify-end">
            <button
              onClick={() => navigate('/notes')}
              className="py-2 border text-sm cursor-pointer p-5 rounded-lg font-semibold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={updateNote}
              className="py-2 rounded-lg bg-black text-sm cursor-pointer text-white font-semibold p-5 hover:opacity-90"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
