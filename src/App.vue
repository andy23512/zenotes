<template lang="pug">
.notes.row
  .column.column-20.sidebar
    h5
      a(href='#' @click='addNote') +
    ul
      li(v-for='note in notes' :key='note.id' :class='{ active: note === selected }' @click='selectNote(note)') {{note.body}}
  .column.column-80(style='position: relative')
    transition(name="fade" appear)
      v-editor(v-if='selected' v-model='selected.body' :key="selected.id")
</template>

<script>
import VEditor from './components/Editor.vue'

require('milligram')

const SKEY = "ZENOTES";

export default {
  name: 'app',
  components: {VEditor},
  data() {
    return {
      notes: [],
      selected: undefined
    }
  },
  methods: { addNote, selectNote },
  mounted() {
    const vm = this;
    loadNotes(this);
    this.$watch(
      watchable.bind(this),
      onChange.bind(this),
      { deep: true }
    );
  }
}

function watchable() {
  if (!this.selected) return undefined;
  return { id: this.selected.id, body: this.selected.body };
}

function onChange(val, prev) {
  if (!prev) return;
  save(this.notes);
}

function loadNotes(vm) {
  chrome.storage.sync.get(SKEY, ({ [SKEY]: list = [] }) => {
    // Push all notes to our array with ES6 fancy splat syntax
    vm.notes.push(...list);
    // Select the most recent note
    vm.selectNote(list[0])
  })
}

function selectNote(note) {
  if (note === this.selected) return;
  this.selected = note;
}

function addNote() {
  const note = { id: guid(), body: '# ' };
  this.notes.unshift(note);
  this.selectNote(note);
  save(this.notes);
}

function save(notes) {
  if(!notes) return;
  chrome.storage.sync.set({ [SKEY]: notes });
}

// generate unique IDs
function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
</script>

<style lang="scss">
.note-area {
  padding-left: 20px;
  position: absolute;
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in, transform .2s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
