const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhaisl ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);

  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id == id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  return h
    .response({
      status: 'fail',
      message: 'catatan gaaada',
    })
    .code(404);
};

const editNoteByHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id == id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return h
      .response({
        status: 'successs',
        message: 'catatan berhasil di update',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'gagal upadte',
    })
    .code(404);
};

const deleteNoteByHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return h
      .response({
        status: 'succcess',
        message: 'catatan berhasil dihapus',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'id not found',
    })
    .code(404);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editNoteByHandler,
  deleteNoteByHandler,
};
