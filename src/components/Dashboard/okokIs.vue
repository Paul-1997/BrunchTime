<template>
  <form action="/api/thisismycourse2/admin/upload" enctype="multipart/form-data" method="post">
    <input type="file" name="file-to-upload" @change="updateImg" />
    <input type="submit" value="Upload" />
  </form>
</template>

<script lang="ts">
import useFetch from '@/composable/useFetch';

const { VITE_APP_API_NAME: path } = import.meta.env;
export default {
  emits: ['getImg'],
  methods: {
    async updateImg(e) {
      try {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', file);
        const result = await useFetch(`v2/api/${path}/admin/upload`, 'post', true, formData);
        if (result.data.success) {
          console.log(result.data);
          this.$emit('getImg', result.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
