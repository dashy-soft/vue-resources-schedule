<template>
  <IndexPageWrapper :manifest="manifest" :examples="examples" />
</template>
<script setup lang="ts">
import manifest from '../../package.json';
import IndexPageWrapper from 'nuxt-quickdoc/components/IndexPageWrapper.vue';

const examples = [];
</script>
