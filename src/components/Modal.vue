<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Header
            </slot>
          </div>

          <div class="modal-body">
            <slot>
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              Footer
            </slot>
          </div>
          <button class="modal-default-button" @click="$emit('close')">X</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 70vw;
  display: flex;
  flex-flow: column nowrap;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  flex-grow: 0;
  padding: 5px;
  background-color: rgb(200, 200, 200);
}

.modal-body {
  flex-grow: 1;
  padding: 5px;
  width: 100%;
}

.modal-footer {
  flex-grow: 0;
  padding: 5px;
  background-color: rgb(200, 200, 200);
}

.modal-default-button {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 6px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
