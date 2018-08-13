<template>
  <div>
    <div class="wide">Year: <input id="year" v-model="year" type="text"/> *for BC: negative year plus one (50BC=-49).</div>
    <div class="wide">Note:</div>
    <div class="wide"><textarea id="note" v-model="md" type="text"/></div>
    <button @click="save()" :disabled="!year">Save</button>
    <button @click="$parent.$emit('close')">Cancel</button>
  </div>
</template>

<script>

const emptyMd =
`# Header

note`;

export default {
  data() {
    return {
      id: '',
      year: '',
      tags: '',
      md: emptyMd
    };
  },
  beforeMount() {
    let note = this.$store.getters.getEditNote;
    if(note) {
      this.id = note.id;
      this.year = note.year;
      this.tags = note.tags;
      this.md = note.md;
    }
  },
  methods: {
    save() {
      const note = { id: this.id, year: this.year, tags: this.tags, md: this.md };
      this.$store.dispatch('addNote', note);
    }
  }
}
</script>

<style lang="scss" scoped>

.wide {
  width: 100%;
  margin: 6px;
  text-align: left;
}

#note {
  display: block;
  width: 95%;
  min-height: 60px;
  resize: vertical;
}
</style>

