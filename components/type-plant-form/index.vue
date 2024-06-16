<template>
  <div class="wrapper-type-plant-form">
    <div class="title-s">
      <span v-if="type === 'create'">Создание</span>
      <span v-else>Обновление</span>
      типа растения
    </div>
    <defaults-loader v-if="loadingForm" />
    <div v-else class="wrapper-type-plant-form">
      <UBadge v-if="type === 'update'" color="white" variant="solid">ID: {{ modelValue.id.resourceId }}</UBadge>
      <div class="type-plant-form-wrapper-title">
        <b-input v-model:model-value="modelValue.title" placeholder="Вид" title="Вид" />
        <b-input
          v-model:model-value="modelValue.subtitle"
          placeholder="Название на латыни"
          title="Название на латыни"
        />
      </div>

      <div class="wrapper-type-plant-form-select">
        <div
          v-for="(item, index) of ecomorhStores.getEcomorphs"
          :key="item.id.resourceId"
          class="type-plant-form-select"
        >
          <span class="type-plant-form-select-title">{{ item.title }} </span>
          <USelectMenu
            :key="item.id.resourceId"
            v-model:model-value="typeEcomorh[index]"
            :options="getEcomorphByEcomorphGroup(item)"
            class="w-36"
          >
            <template #label>
              <span v-if="typeEcomorh[index]" class="truncate">{{ typeEcomorh[index].title }}</span>
              <span v-else class="truncate">Не выбрано</span>
            </template>
            <template #option="{ option }">
              <span class="truncate">{{ option.title }}</span>
            </template>
          </USelectMenu>
        </div>
      </div>
      <ClientOnly>
        <file-input v-model:file="file" v-model:is-edit="isEdit" />
      </ClientOnly>
      <UButton v-if="type === 'create'" :loading="loading" @click="onCreate">Сохранить</UButton>
      <div v-else class="wrapper-plant-form-button">
        <UButton :loading="loading" @click="onUpdateType">Обновить</UButton>
        <UButton :loading="loading" color="red" @click="onDelete"> Удалить</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TypePlant } from "~/stores/type-plant/types";
import { useEcomorph } from "~/stores/ecomorph/ecomorph";
import type { Ecomorph } from "~/stores/ecomorph/types";
import { useTypeEcomorph } from "~/stores/type-ecomorphs/ecomorph";
import type { TypeEcomorph } from "~/stores/type-ecomorphs/types";
import axios from "axios";
import { useTypePlant } from "~/stores/type-plant/type-plant";
import type { Img } from "~/stores/types";

const modelValue = defineModel<TypePlant>("modelValue", {
  default: {
    title: "",
    subtitle: "",
    ecomorphsEntity: [],
    img: {
      id: {
        resourceId: "",
      },
    },
  },
});

const ecomorhStores = useEcomorph();
const typeEcomorhStores = useTypeEcomorph();
const typePlantStores = useTypePlant();
const file = ref<File>();
const isEdit = ref<boolean>(false);
const typeEcomorh = ref<Record<string, TypeEcomorph>>({});

const loading = ref(false);

const selectValue = () => {
  ecomorhStores.getEcomorphs.forEach((ecomorph, index) => {
    const ecomorphsEntity = modelValue.value.ecomorphsEntity.find((item) => {
      return item.ecomorphs?.id?.resourceId === ecomorph.id?.resourceId;
    });

    if (ecomorphsEntity) {
      typeEcomorh.value[index] = ecomorphsEntity;
    }
  });
};

const selectFile = async () => {
  if (modelValue.value.img) {
    const blob = await downloadImageAsBlob(useRuntimeConfig().public.apiURL + ":8080" + modelValue.value.img.path);
    if (blob) {
      file.value = new File([blob], modelValue.value.img.name);
    }
  }
};

async function downloadImageAsBlob(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to download image");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error downloading image:", error.message);
    return null;
  }
}

const loadingForm = ref(false);

interface PlantCartProps {
  type: "create" | "update";
}

const props = defineProps<PlantCartProps>();

const initForm = async () => {
  try {
    loadingForm.value = true;
    selectValue();
    if (props.type === "update") {
      await selectFile();
    }
  } catch (e) {
    console.log(e);
  } finally {
    loadingForm.value = false;
  }
};

await initForm();

const getEcomorphByEcomorphGroup = (ecomorph: Ecomorph) => {
  return typeEcomorhStores.getTypeEcomorphs.filter(
    (item: TypeEcomorph) => item.ecomorphs?.id?.resourceId === ecomorph.id?.resourceId,
  );
};

const formingModal = async (value: TypePlant) => {
  value.ecomorphsEntity = [];
  for (const key in typeEcomorh.value) {
    value.ecomorphsEntity.push(typeEcomorh.value[key]);
  }
  if (isEdit.value) {
    const img = await onCreateImg();
    const valueImg: Img = {
      id: { resourceId: img.id.resourceId },
    };
    value.img = valueImg;
  }
};

const onCreate = async () => {
  try {
    loading.value = true;

    await formingModal(modelValue.value);

    await typePlantStores.CrateTypePlant(modelValue.value);

    navigateTo("/type-plant");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    loading.value = false;
  }
};

const onUpdateType = async () => {
  try {
    loading.value = true;

    const modal: TypePlant = modelValue.value;

    await formingModal(modal);

    await typePlantStores.UpdateTypePlant(modal);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    loading.value = false;
  }
};

const onDelete = async () => {
  try {
    loading.value = true;

    await typePlantStores.DeleteTypePlant(modelValue.value.id!);

    navigateTo("/type-plant");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    loading.value = false;
  }
};

const onCreateImg = async () => {
  if (file.value) {
    try {
      const { getToken } = useApollo();
      const token = await getToken();
      const blob = new Blob([file.value!]);
      const formData = new FormData();
      formData.append("image", blob);

      const response = await axios.post(useRuntimeConfig().public.apiURL + ":8080/save", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-type-plant-form {
  display: flex;
  gap: 15px;
  flex-direction: column;
  width: 500px;
  align-items: center;

  .type-plant-form-title {
    font-size: 36px;
    color: var(--ling-root);
    font-weight: 700;
  }

  .type-plant-form-wrapper-title {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .wrapper-plant-form-button {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .wrapper-type-plant-form-select {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    .type-plant-form-select {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      border-radius: 6px;
      border: 1px solid var(--gray);
    }

    .type-plant-form-select-title {
      color: var(--ling-root);
      font-size: 14px;
    }
  }
}

@media (min-width: 260px) and (max-width: 700px) {
  .wrapper-type-plant-form {
    width: 100%;
  }
}
</style>
