const Note = require('../models/Note');

exports.createNote = async (req, res) => {
    try {
        const { title, content, color } = req.body;
        if(!title) {
            return res.status(400).json({ message: "Title is required" })
        }
        if(!content) {
            return res.status(400).json({ message: "Content is required" })
        }
        const note = await Note.create({ title, content, color, user: req.user._id });
        res.status(201).json({
            message: "Note created successfully",   
            note
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

exports.getMyNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {
      user: req.user._id,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    };

    const totalNotes = await Note.countDocuments(query);

    const notes = await Note.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      notes,
      page,
      totalPages: Math.ceil(totalNotes / limit),
      totalNotes,
      hasMore: page * limit < totalNotes
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({ message: "Note not found" })
        }
        if(note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" })
        }
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        note.color = req.body.color || note.color;
        await note.save();
        res.status(200).json({
            message: "Note updated successfully",
            note
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({ message: "Note not found" })
        }
        if(note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" })
        }
        await note.deleteOne();
        res.status(200).json({ message: "Note deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

exports.pinnedNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  note.pinned = !note.pinned;
  await note.save();
  res.json(note);
}

exports.getNoteStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalNotes = await Note.countDocuments({ user: userId });

    const pinnedNotes = await Note.countDocuments({
      user: userId,
      pinned: true,
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonthNotes = await Note.countDocuments({
      user: userId,
      createdAt: { $gte: startOfMonth },
    });

    res.status(200).json({
      totalNotes,
      pinnedNotes,
      thisMonthNotes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};