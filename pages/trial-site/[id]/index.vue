<template>
  <div class="wrapper-transecta">
    <div class="title-m">Пробная площадка</div>
    <div class="flex flex-wrap items-center justify-center gap-3 w-[350px]">
      <UBadge v-if="model && model.id" color="white" variant="solid"
        >ID:
        {{ model.id.resourceId }}
      </UBadge>
      <div class="flex gap-3">
        <UBadge v-if="model && model.id && model.dominant" color="white" variant="solid">
          Доминант: {{ model.dominant?.title }}
        </UBadge>
        <UBadge v-if="model && model.id && model.subDominant" color="white" variant="solid">
          Содоминант: {{ model.subDominant?.title }}
        </UBadge>
      </div>
      <UBadge v-if="model && model.rating" color="white" variant="solid"> Баллы: {{ model.rating }}</UBadge>
    </div>
    <UForm :state="model" :validate="validateTransect">
      <div class="wrapper-trial-site-input">
        <UFormGroup label="Название" name="title">
          <UInput v-model:model-value="model.title" class="w-[205px]" />
        </UFormGroup>
        <UFormGroup label="Покрытость" name="covered">
          <UInput v-model:model-value="model.covered" class="w-[205px]">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </UFormGroup>
      </div>
    </UForm>
    <div class="wrapper-trial-site-table">
      <div class="title-xs">Растения</div>
      <UTable :columns="columns" :rows="rows" class="min-width overflow-x-auto">
        <template #id-data="{ index }">
          {{ index + 1 }}
        </template>
        <template #typePlant-data="{ row }">
          <span v-if="row.typePlant && row.typePlant.title">{{ row.typePlant.title }}</span>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost" />
          </UDropdown>
        </template>
        <template #empty-state>
          <div class="wrapper-empty-state">
            <div>Создать новое растение</div>
            <UButton @click="onCreatPlant">Создать</UButton>
          </div>
        </template>
      </UTable>
      <div v-if="model.plant && model.plant.length > 0" class="wrapper-transecta-footer-table">
        <UButton @click="onCreatPlant">Создать</UButton>
        <UPagination
          v-if="model.plant && model.plant.length > pageCount"
          v-model="page"
          :page-count="pageCount"
          :total="model.plant.length"
        />
      </div>
    </div>
    <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
  </div>
  <UModal v-model="isOpen">
    <plant-form
      :model-value="plant"
      :option-type-plant="typePlantStore.getTypePlants"
      :type="typePlantForm"
      @on-create="CratePlant"
      @on-updated="UpdatePlant"
    />
  </UModal>
</template>

<script lang="ts" setup>
import type { Plant } from "~/stores/trial-site/types";
import { useTrialSite } from "~/stores/trial-site/trial-site";
import { useTypePlant } from "~/stores/type-plant/type-plant";
import type { TypeForm } from "~/stores/types";
import { validateTransect } from "~/components/transect-form/helpers";
import { useWindowSize } from "@vueuse/core";

const isOpen = ref<boolean>(false);
const trialSiteStore = useTrialSite();
const typePlantStore = useTypePlant();
const route = useRoute();
const id = atob(route.params.id.toString());
const loading = ref<boolean>(false);

const typePlantForm = ref<TypeForm>("create");
const plant = ref<Plant>();

const page = ref(1);
const pageCount = 8;

await useAsyncData(async () => {
  await trialSiteStore.fetchTrialSiteById(id);
});

typePlantStore.fetchTypePlant();

let model = toRef(trialSiteStore.getTrialSite);

const handlerOnUpdate = async () => {
  try {
    loading.value = true;
    await trialSiteStore.UpdateTrialSite(model.value);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const CratePlant = async (value: Plant) => {
  try {
    loading.value = true;
    await trialSiteStore.CratePlant(value);
    if (!model.value.plant) {
      model.value.plant = [];
      model.value.plant.push(trialSiteStore.getPlant);
    } else {
      const trialSite = model.value.plant;
      const plant = trialSiteStore.getPlant;
      trialSite.push(plant);
      model.value.plant = trialSite;
    }
    await trialSiteStore.UpdateTrialSite(model.value);
    model.value = reactive({ ...trialSiteStore.getTrialSite });
  } catch (e) {
    console.log(e);
  } finally {
    isOpen.value = false;
    loading.value = false;
  }
};

const UpdatePlant = async (value: Plant) => {
  try {
    loading.value = true;
    await trialSiteStore.UpdatePlant(value);
    const index = model.value.plant.findIndex((item) => item.id!.resourceId === value.id!.resourceId);
    model.value.plant[index] = value;
  } catch (e) {
    console.log(e);
  } finally {
    isOpen.value = false;
    loading.value = false;
  }
};

const onCreatPlant = () => {
  isOpen.value = true;
  typePlantForm.value = "create";
  plant.value = undefined;
};

const handlerOnDeletePlant = async (input: Plant) => {
  try {
    loading.value = true;
    await trialSiteStore.DeletePlant(input.id!);
    const index = model.value.plant.findIndex((item) => item.id!.resourceId === input.id!.resourceId);
    model.value.plant.splice(index, 1);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const { width } = useWindowSize();

const columns = computed(() => {
  if (width.value > 700) {
    return [
      {
        key: "id",
        label: "№",
      },
      {
        key: "typePlant",
        label: "Вид растения",
      },
      {
        key: "count",
        label: "Количество особей",
      },
      {
        key: "coverage",
        label: "Покрытие",
      },
      {
        key: "actions",
      },
    ];
  } else {
    return [
      {
        key: "id",
        label: "№",
      },
      {
        key: "typePlant",
        label: "Вид растения",
      },
      {
        key: "coverage",
        label: "Покрытие",
      },
      {
        key: "actions",
      },
    ];
  }
});

const items = (row: Plant) => [
  [
    {
      label: "Изменить",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isOpen.value = true;
        plant.value = row;
        typePlantForm.value = "update";
      },
    },
  ],
  [
    {
      label: "Удалить",
      icon: "i-heroicons-trash-20-solid",
      click: () => handlerOnDeletePlant(row),
    },
  ],
];

const rows = computed(() => {
  if (model.value && !model.value.plant) {
    return [];
  }

  const plant = model.value.plant.slice((page.value - 1) * pageCount, page.value * pageCount);

  if (plant.length > 0) {
    return plant;
  } else {
    page.value--;
    return model.value.plant.slice((page.value - 1) * pageCount, page.value * pageCount);
  }
});
</script>

<style lang="scss" scoped>
.wrapper-transecta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
}

.wrapper-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.wrapper-trial-site-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 600px;
  gap: 15px;
}

@media (min-width: 260px) and (max-width: 700px) {
  .wrapper-trial-site-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 300px;
    gap: 15px;
  }
}

.wrapper-transecta-footer-table {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.wrapper-trial-site-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: center;
  border: 1px solid var(--ling-root);
  border-radius: 16px;
}
</style>
