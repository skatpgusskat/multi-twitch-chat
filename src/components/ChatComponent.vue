<template>
  <div class="chat">
    {{chat.username}}: {{chat.content}}
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
}
</style>
