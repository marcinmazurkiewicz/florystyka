<template>
  <p class="text-center border border-red rounded-xl p-6 text-red text-lg">
    <slot>Nie udało się nawiązać połączenia z serwerem.</slot>
  </p>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorInfo"
});
</script>