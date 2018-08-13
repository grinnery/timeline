<template>
  <div class="timecard">
    <div class="timelabel">
      {{year}}
      <div class="timecontrol">
        <div @click="$store.commit('setEdit', card.id)">Edit</div>
        <div @click="$store.dispatch('delNote', card.id)">Delete</div>
      </div>
    </div>
    <div class="timenote" v-html="note">
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export default {
  props: {
    card: Object
  },
  computed: {
    note() { return md.render(this.card.md); },
    year() { return this.card.year > 0 ? `${this.card.year}AD` : `${-this.card.year + 1 }BC`; },
  }
}
</script>

<style lang="scss">

.timecard {
  display: flex;
  flex-flow: row;
  align-items: top;
}

.timelabel {
  text-align: right;
  font-size: 1em;
  min-width: 100px;
  padding: 10px;
}

.timenote {
  border-left: 2px solid silver;
  text-align: left;
  flex-grow: 1;
  padding: 0px 10px;
}

.timenote h1 {
  font-size: 1.1em;
  margin-top: 10px;
}

.timecontrol {
  font-size: 0.8em;
  color: gray;
  display: none;
  text-align: right;
  cursor: pointer;
}

.timecard:hover .timecontrol {
  display: inherit;
}


</style>
