<template>
  <div class="chat">
    <span class="username" v-bind:style="{ color: chat.color }">{{chat.username}}</span> : {{chat.content}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChatComponent extends Vue {
  @Prop() private chat!: Chat;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  font-size: 12px;
  line-height: 20px;
}
.username {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
}
</style>
