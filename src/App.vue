<template>
  <div id="app">
    <timeline/>
    <modal v-if="$store.state.editing" @close="$store.commit('setEdit')">
      <edit-card/>
    </modal>
    <button v-else id="newcard" @click="$store.commit('setEdit', 'new')">+</button>
    <button id="newcard" @click="$store.commit('setEdit', 'new')">+</button>
    <google-button/>
  </div>
</template>

<script>
import Timeline from "@/components/Timeline.vue";
import Modal from "@/components/Modal.vue";
import EditCard from "@/components/EditCard.vue";
import GoogleButton from "@/components/GoogleButton.vue";

export default {
  components: {
    Timeline,
    Modal,
    EditCard,
    GoogleButton
  },
  beforeMount() {
    this.$store.dispatch( 'loadNotes' );
  }
}

</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#newcard {
  position: fixed;
  top: 12px;
  right: 12px;

  background-color: rgba(76, 175, 80, 0.6);
  border: none;
  color: white;
  padding: 5px 12px 0px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2em;
  border-radius: 50%;
  cursor: pointer;
}

</style>
