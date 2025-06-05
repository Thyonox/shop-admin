<template>
<div>

  {{ useUserStore().user }}
</div>
</template>

<script setup>
import useUserStore from "@/store/modules/user.js";

</script>

<style scoped>

</style>