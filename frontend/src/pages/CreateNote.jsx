import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

const availablePalettes = [
  'default',
  'blue-note',
  'green-note',
  'yellow-note',
  'pink-note',
  'purple-note',
]

export default function CreateNote() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentPalette, setCurrentPalette] = useState('default')
  const navigate = useNavigate();

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Empty note cannot be saved")
      return
    }
    try {
      await api.post('/notes', { title, content, color: currentPalette })
      toast.success("Note created")
      navigate('/notes')
    } catch (error) {
      toast.error("Failed to save note")
    }
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
      <div className='flex items-center justify-center w-full h-screen bg-black/5'>
        <div
          className={`w-130 flex flex-col rounded-xl mt-15 p-6 gap-2 ${paletteBg[currentPalette]}`}
        >
          <div className='flex justify-between'>
            <h3 className='font-semibold text-xl'>Add New Note</h3>
            <X size={18} onClick={() => navigate('/notes')} className='hover:bg-gray-300 rounded-sm cursor-pointer'/>
          </div>

          <p className='text-sm text-gray-600'>Create a new note by filling in the details below.</p>

          <div className='flex flex-col gap-1 mt-5 text-sm'>
            <label className='font-semibold'>Title</label>
            <input
              type="text"
              value={title}
              placeholder='Enter note title'
              onChange={(e) => setTitle(e.target.value)}
              className='h-10 p-3 rounded-lg bg-gray-100 outline-0'
            />
          </div>

          <div className='flex flex-col gap-1 mt-2 text-sm'>
            <label className='font-semibold'>Content</label>
            <textarea
              value={content}
              placeholder='Enter note content...'
              onChange={(e) => setContent(e.target.value)}
              className='h-20 p-3 py-2 rounded-lg resize-none bg-gray-100 outline-0'
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

          <div className='flex mt-4 gap-3 justify-end'>
            <button
              onClick={() => navigate('/notes')}
              className='py-2 border text-sm p-5 cursor-pointer rounded-lg font-semibold hover:bg-gray-200'
            >
              Cancel
            </button>
            <button
              onClick={saveNote}
              className='py-2 rounded-lg bg-black text-sm cursor-pointer text-white font-semibold p-5 hover:opacity-90'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
