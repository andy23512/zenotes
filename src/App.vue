<template lang="pug">
.notes.row
  .column.column-20.sidebar
    h5
      a(href='#' @click='addNote') +
    ul
      li(v-for='note in notes' :key='note.id' :class='{ active: note === selected }' @click='selectNote(note)') {{note.body}}
  .column.column-80(style='position: relative')
    textarea(v-if='selected' v-model='selected.body' placeholder='Edit me')
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {}
  }
}
</script>

<style lang="scss">
</style>
