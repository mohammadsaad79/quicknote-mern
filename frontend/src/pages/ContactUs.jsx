import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../api/axios";
import { Send, Mail, Phone, MapPin, Clock4, Github, Linkedin, MessageSquare, CircleCheck } from "lucide-react";
import toast from 'react-hot-toast';

export default function ContactUs() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="absolute z-50 mt-20 p-8 pl-30 pr-30 w-full h-auto bg-black/5 flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center gap-3"> 
          <h2 className="text-2xl font-bold">Get In Touch With Us</h2>
          <p className="text-gray-600">Have a question or feedback? We'd love to hear from you. Our team is here to help!</p>
        </div>

        <div className="grid grid-cols-4 gap-5 rounded-xl">
          <div className="flex flex-col gap-8 p-8 border border-gray-200 bg-white rounded-xl justify-center items-center hover:shadow-lg">
            <div className="p-3 rounded-xl bg-blue-500"><Mail size={25} color="white"/></div>
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p>saad0786mohd@gmail.com</p>
            <small className="text-gray-600">Send us an email any time</small>
          </div>
          <div className="flex flex-col gap-8 p-8 border border-gray-200 bg-white rounded-xl justify-center items-center hover:shadow-lg">
            <div className="p-3 rounded-xl bg-violet-500"><Phone size={25} color="white"/></div>
            <h3 className="font-semibold text-lg">Call Us</h3>
            <p>+91 8542929798</p>
            <small className="text-gray-600">Mon-Fri from 8am to 6pm</small>
          </div>
          <div className="flex flex-col gap-8 p-8 border border-gray-200 bg-white rounded-xl justify-center items-center hover:shadow-lg">
            <div className="p-3 rounded-xl bg-pink-500"><MapPin size={25} color="white"/></div>
            <h3 className="font-semibold text-lg">Visit Us</h3>
            <p>MANUU, Hyderabad</p>
            <small className="text-gray-600">Come say hello</small>
          </div>
          <div className="flex flex-col gap-8 p-8 border border-gray-200 bg-white rounded-xl justify-center items-center hover:shadow-lg">
            <div className="p-3 rounded-xl bg-orange-400"><Clock4 size={25} color="white"/></div>
            <h3 className="font-semibold text-lg">Working Hours</h3>
            <p>9:00 AM - 6:00 PM</p>
            <small className="text-gray-600">Monday to Friday</small>
          </div>
        </div>

        <div className="rounded-xl flex gap-6">
          <div className="w-4xl border border-gray-200 bg-white p-8 rounded-xl justify-start">
            <h2 className="font-semibold text-xl">Send us a message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-1 text-sm">
                <label className="font-semibold">Your name</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  placeholder="Name" 
                  className="h-10 p-3 rounded-lg bg-gray-200 shadow-sm outline-gray-300" 
                  required 
                />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label className="font-semibold">Your email</label>
                  <input 
                    type="email" 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    placeholder="Email" 
                    className="h-10 p-3 rounded-lg bg-gray-200 shadow-sm outline-gray-300" 
                    required 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <label className="font-semibold">Subject</label>
              <input
                className="w-full h-10 p-3 rounded-lg bg-gray-200 shadow-sm outline-gray-300"
                placeholder="How can we help?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <label className="font-semibold">Message</label>
              <textarea 
                rows={3} 
                value={form.message} 
                onChange={(e) => setForm({ ...form, message: e.target.value })} 
                placeholder="Tell us more about your inquiry..." 
                className="w-full h-30 p-3 rounded-lg bg-gray-200 shadow-sm outline-gray-300 resize-none" 
                required
              ></textarea>
              </div>
              <button
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 bg-black cursor-pointer text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-60"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-5 rounded-xl">
            <div className="border border-gray-200 bg-white p-6 rounded-xl flex flex-col gap-5">
              <h3 className="font-semibold">Follow us</h3>
              <small className="text-gray-700">Stay connected and follow us on social media for updates and tips.</small>
              <div className="mt-5 flex flex-col gap-3">
                <a href="https://www.github.com/mohammadsaad79/" target="_blank" className="flex gap-3 rounded-xl cursor-pointer bg-gray-800 text-white p-3 items-center hover:bg-gray-900">
                  <Github size={20} />
                  <h3 className="font-semibold">Github</h3>
                </a>
                <a href="https://www.linkedin.com/in/mohammadsaad79/" target="_blank" className="flex gap-3 rounded-xl cursor-pointer bg-blue-600 text-white p-3 items-center hover:bg-blue-700">
                  <Linkedin size={20} />
                  <h3 className="font-semibold">LinkedIn</h3>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-8 bg-white rounded-xl p-6 border border-gray-200">
              <MessageSquare size={36} strokeWidth={1.8} className="text-blue-600"/>
              <h3 className="font-semibold text-xl">Quick Response</h3>
              <small className="text-gray-600">We typically respond to all inquiries within 24 hours during business days.</small>
            </div>
          </div>
        </div>

        <div className="rounded-xl flex flex-col gap-6 p-8 border border-gray-200 bg-white">
          <h2 className="font-semibold text-xl">Frequently Asked Questions</h2>
          <div className="grid grid-cols-2">
            <div className="p-3">
              <h3 className="font-semibold text-lg flex gap-2 items-center"><CircleCheck size={20} color="green"/>How do I create a note?</h3>
              <small className="text-gray-600">Click the "Create Note" button on your navbar to create a new note with title, content with different background colors.</small>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-lg flex gap-2 items-center"><CircleCheck size={20} color="green"/>What are pinned notes?</h3>
              <small className="text-gray-600">Pinned notes appear at the top of your dashboard for easy access. Pin important notes you need to reference frequently.</small>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-lg flex gap-2 items-center"><CircleCheck size={20} color="green"/>How do I delete a note?</h3>
              <small className="text-gray-600">Hover over any note card and click the delete button. You'll be asked to confirm before the note is permanently deleted.</small>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-lg flex gap-2 items-center"><CircleCheck size={20} color="green"/>Is my data secure?</h3>
              <small className="text-gray-600">Your notes are stored locally in your browser using localStorage. We don't send your data to any external servers.</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}