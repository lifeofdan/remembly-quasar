import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useApiClient = defineStore('apiClient', () => {
  const state = ref<{ baseUrl: string } | undefined>({
    baseUrl: process.env.API_URL || '',
  });

  const actions = {
    getBaseUrl: () => state.value?.baseUrl || '',
    query: async function (query: string, variables = {}) {
      if (!state.value) return;

      const response = await fetch(state.value.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      return response.json();
    },

    mutate: async function (query: string, variables = {}) {
      if (!state.value) return;

      const response = await fetch(state.value.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      return response.json();
    },

    $reset: () => {
      state.value = undefined;
    },
  };

  return {
    ...actions,
  };
});
