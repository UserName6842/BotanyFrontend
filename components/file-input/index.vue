<template>
  <div class="col-span-full">
    <div class="wrapper-upload" @dragover.prevent @drop="handleDrop">
      <div class="text-center">
        <div v-if="file" class="uploaded-image-container">
          <img :src="imageUrl" alt="Uploaded image" class="uploaded-image" />
          <UButton @click="clearFile" class="remove-button">
            <UIcon name="i-ph-x-light" class="h-4 w-4" aria-hidden="true" />
          </UButton>
        </div>
        <UIcon v-else name="i-ph-file-arrow-up-light" class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
        <div class="mt-4 flex text-sm leading-6 text-gray-600">
          <label for="file-upload" class="upload-label">
            <span>Upload a file</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange" />
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


const file = defineModel<File | undefined>("file");
const isEdit = defineModel<boolean>("isEdit");

const handleFileChange = (event: Event) => {
  isEdit.value = true
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    file.value = files[0];
  }
};

const imageUrl = computed(() => {
  return file.value ? URL.createObjectURL(file.value) : '';
});

const clearFile = () => {
  file.value = null;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  debugger
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    file.value = files[0];
  }
};
</script>

<style scoped lang="scss">
.wrapper-upload{
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  border: 2px dashed var(--ling-root);

  padding: 1.5rem;

  .upload-label{
    position: relative;
    cursor: pointer;
    border-radius: 6px;
    background-color: #ffffff;
    font-weight: 600;
    color: var(--ling-root);
    outline: none;
    transition: color 0.2s;

    &:focus-within {
      outline: none;
      padding-inline: 3px;
      border: 2px solid var(--ling-root); // ring-indigo-600
    }

    &:hover {
      color: var(--ling-root); // hover:text-indigo-500
    }
  }

  .uploaded-image-container {
    position: relative;
    margin-top: 1rem;
    width: 200px;
    border-radius: 0.5rem;

    .uploaded-image {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }

    .remove-button {
      display: flex;
      justify-content: center;
      position: absolute;
      border-radius: 60px;
      height: 30px;
      width: 30px;
      padding: 2px;
      top: 0.5rem;
      right: 0.5rem;
      border: none;
      cursor: pointer;
    }
  }
}
</style>