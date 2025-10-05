<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="rememberCurrentWebsite" label="Remember Website" />
  </q-page>
</template>

<script setup lang="ts">
import { useApiClient } from 'src/stores/apiClient';

const apiClient = useApiClient();

function rememberCurrentWebsite() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      const currentUrl = tabs[0].url || '';
      const query = `
        mutation {
          websiteMemoryCreate(input: {content: "${currentUrl}", websiteParams: {url: "${currentUrl}"}}) {
            errors {
              fields
              code
              message
            }
            result {
              content
              description
            }
          }
        }
      `;
      void apiClient.mutate(query);
    }
  });

}
</script>
