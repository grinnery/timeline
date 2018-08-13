import Vue from "vue";
import Vuex from "vuex";
import data from '@/data.js';
import uuid from 'uuid/v4';

Vue.use(Vuex);

const storageName = 'timeline.notes';
function sortNotes(a, b) {
  return a.year>b.year;
}

export default new Vuex.Store({
  state: {
    notes: [],
    editing: ''
  },
  mutations: {
    addNote(state, note) {
      if(note.id) {
        const idx = state.notes.findIndex( n => n.id === note.id );
        if( idx !== -1) {
          state.notes.splice(idx, 1, note);
          return;
        }
      } else {
        note.id = uuid();
      }
      state.notes.push(note);
      state.notes.sort(sortNotes);
    },
    setNotes(state, notes) {
      state.notes = notes;
    },
    delNote(state, id) {
      const idx = state.notes.findIndex( note => note.id === id );
      if(idx !== -1) {
        state.notes.splice(idx, 1);
      }
    },
    setEdit(state, id) {
      state.editing = id;
    }
  },
  actions: {
    loadNotes({ state, commit, dispatch }) {
      if(localStorage) {
        const loaded = localStorage.getItem(storageName, state.notes);
        let notes;
        if(loaded) {
          notes = JSON.parse(loaded);
        } else {
          notes = data.map( note => { note.id = uuid(); return note; } );
          notes.sort( sortNotes );
        }
        commit( 'setNotes', notes);
      } else {
        console.error(`No localStorage on load`);
      }
    },
    saveNotes({ state }) {
      if(localStorage) {
        localStorage.setItem( storageName, JSON.stringify(state.notes));
      } else {
        console.error(`No localStorage`);
      }
    },
    addNote({commit, dispatch}, note) {
      commit( 'addNote', note);
      dispatch( 'saveNotes' );
    },
    delNote({ commit, dispatch}, id) {
      commit( 'delNote', id);
      dispatch( 'saveNotes' );
    }
  },
  getters: {
    getNote: (state) => (id) => {
      const idx = state.notes.findIndex( note => note.id === id );
      if( idx !== -1 ) {
        return state.notes[idx];
      }
    },
    getEditNote(state) {
      const idx = state.notes.findIndex( note => note.id === state.editing );
      if( idx !== -1 ) {
        return state.notes[idx];
      }
    }
  }
});
