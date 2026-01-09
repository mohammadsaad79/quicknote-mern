import React, { useEffect, useState } from 'react';
import { CalendarDays, Pin, SquarePen, Trash2, X } from 'lucide-react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const navigate = useNavigate();

  const fetchNotes = async (pageNumber, searchValue, reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.get(
        `/notes?page=${pageNumber}&limit=6&search=${searchValue}`
      );

      setNotes(prev =>
        reset ? res.data.notes : [...prev, ...res.data.notes]
      );

      setHasMore(res.data.hasMore);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNotes([]);
    setPage(1);
    fetchNotes(1, search, true);
  }, [search]);

  const togglePin = async (id) => {
    try {
      const res = await api.patch(`/notes/${id}/pin`);

      setNotes(prev =>
        prev.map(note =>
          note._id === id ? res.data : note
        )
      );

      toast.success(
        res.data.pinned ? 'Note pinned 📌' : 'Note unpinned'
      );
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const deleteNote = async () => {
    try {
      await api.delete(`/notes/${selectedNoteId}`);
      setNotes(prev => prev.filter(note => note._id !== selectedNoteId));
      toast.success('Note deleted');
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setShowDeleteModal(false);
      setSelectedNoteId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200 &&
        hasMore &&
        !loading
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      fetchNotes(page, search);
    }
  }, [page]);

  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  const paletteBg = {
    default: 'bg-white',
    'blue-note': 'bg-blue-200',
    'green-note': 'bg-emerald-200',
    'yellow-note': 'bg-yellow-200',
    'pink-note': 'bg-pink-200',
    'purple-note': 'bg-violet-200',
  }

  return (
    <>
      <Navbar value={search} onChange={setSearch} />

      <div className="absolute z-50 mt-20 p-8 w-full h-auto bg-black/5">
        <div className="grid grid-cols-3 gap-8">
          {sortedNotes.map(note => (
            <div
              key={note._id}
              onClick={() => {
                if (!showDeleteModal) {
                  navigate(`/notes/${note._id}`)
                }
              }
              }
              className={`flex flex-col gap-6 border border-gray-300 relative group rounded-lg p-6 hover:shadow-xl cursor-pointer
              ${paletteBg[note.color] || paletteBg.default}`}
            >
              {note.pinned && (
                <span className="absolute top-3 right-3">
                  <Pin size={20} />
                </span>
              )}

              <div className='flex flex-col gap-1'>
                <h3 className="font-bold text-xl">{note.title}</h3>
                <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
                  {note.content}
                </p>
                <small className='mt-5 flex items-center gap-1 text-gray-700'>
                  <CalendarDays size={16} /> {formatDate(note.createdAt)}
                </small>
              </div>

              <div className='flex justify-between gap-5 items-center font-semibold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(note._id);
                  }}
                  className='border bg-white border-gray-300 cursor-pointer rounded-lg w-80 h-8 hover:bg-gray-300 flex gap-2 justify-center items-center'
                >
                  <Pin size={16} />
                  {note.pinned ? 'Unpin' : 'Pin'}
                </button>

                <button
                  className='border bg-white border-gray-300 cursor-pointer rounded-lg w-80 h-8 hover:bg-gray-300 flex gap-2 justify-center items-center'
                >
                  <SquarePen size={16} />Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNoteId(note._id);
                    setShowDeleteModal(true);
                  }}
                  className='border bg-white border-gray-300 cursor-pointer rounded-lg w-20 h-8 flex justify-center items-center hover:bg-red-500 hover:text-white'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <p className="text-center mt-6 font-bold">Loading...</p>
        )}
        {hasMore && !loading && (
          <div className="flex justify-center mt-5">
            <p onClick={() => setPage(prev => prev + 1)}
              className="font-bold text-gray-700 text-md cursor-pointer hover:underline" >
              See more notes
            </p>
          </div>
        )}
        {!hasMore && (
          <p className="text-center mt-6 text-gray-500"> No more notes </p>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-120 shadow-xl">
            <div className='flex justify-between'>
              <h3 className="text-lg font-bold mb-3">Delete Note?</h3>
              <X size={18} onClick={() => setShowDeleteModal(false)} className='hover:bg-gray-300 rounded-sm cursor-pointer' />
            </div>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete your note and remove it from our servers.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 h-9 rounded-lg border text-sm cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteNote}
                className="px-6 h-9 rounded-lg bg-red-600 text-white text-sm cursor-pointer hover:bg-red-700"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
