<template>
  <div>
    <Timecard v-for="note in notes" :key="note.year" :card="note"/>
  </div>
</template>

<script>
import Timecard from '@/components/Timecard';

export default {
  components: { Timecard },
  computed: {
    notes() { return this.$store.state.notes; },
  },
}
</script>

<style lang="scss">
</style>
