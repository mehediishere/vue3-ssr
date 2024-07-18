<template>
    <div>blog</div>
    <button @click="countStore.increment">{{countStore.count}}</button>
</template>

<script lang="ts" setup>
import {useCounterStore} from '@/store/count'

const countStore=useCounterStore();

import { useHead } from '@vueuse/head';

useHead({
  title: 'My Blog Site',
  meta: [
    {
      name: 'description',
      content: 'Welcome to My Blog Site. Discover a variety of articles on different topics and stay updated with the latest posts.',
    },
    {
      name: 'keywords',
      content: 'blog, articles, news, updates, topics',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      property: 'og:title',
      content: 'My Blog Site',
    },
    {
      property: 'og:description',
      content: 'Welcome to My Blog Site. Discover a variety of articles on different topics and stay updated with the latest posts.',
    },
    {
      property: 'og:image',
      content: 'https://images.pexels.com/photos/3985411/pexels-photo-3985411.jpeg',
    },
    {
      property: 'og:url',
      content: 'https://nandonik.com.bd/shop',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'My Blog Site',
    },
    {
      name: 'twitter:description',
      content: 'Welcome to My Blog Site. Discover a variety of articles on different topics and stay updated with the latest posts.',
    },
    {
      name: 'twitter:image',
      content: 'https://images.pexels.com/photos/3985411/pexels-photo-3985411.jpeg',
    },
  ],
});
</script>

<style scoped>
</style>