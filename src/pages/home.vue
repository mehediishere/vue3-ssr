<template>
    <div>home</div>
</template>

<script setup lang="ts">
import {useHead} from "@vueuse/head";

useHead({
  title: 'My Awesome Site',
  meta: [
    {
      name: 'description',
      content: 'This is a description of my awesome site. It provides great features and content.',
    },
    {
      name: 'keywords',
      content: 'awesome, site, features, content, example',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      property: 'og:title',
      content: 'My Awesome Site',
    },
    {
      property: 'og:description',
      content: 'This is a description of my awesome site. It provides great features and content.',
    },
    {
      property: 'og:image',
      content: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
    },
    {
      property: 'og:url',
      content: 'https://nandonik.com.bd',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'My Awesome Site',
    },
    {
      name: 'twitter:description',
      content: 'This is a description of my awesome site. It provides great features and content.',
    },
    {
      name: 'twitter:image',
      content: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
    },
  ],
});

</script>

<style scoped>

</style>