<script setup lang="ts">
import ReportStatus from "@/components/ReportStatus.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Loading from "@/components/Loading.vue";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  BellIcon,
  BookmarkSquareIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const searchKeyword = ref();
const report = ref();
const loading = ref(false);

const getReport = async () => {
  try {
    loading.value = true;
    report.value = null;
    const response = await axios.get(`/api/report/${route.params.id}`);
    report.value = response.data;
    loading.value = false;
    console.log(response.data);
  } catch (err) {
    loading.value = false;
    //console.log(err);h
  }
};

const search = () => {
  if (!searchKeyword.value || searchKeyword.value === "") return;

  router.push({
    name: "report",
    params: {
      id: searchKeyword.value,
    },
  });
};

onMounted(() => {
  getReport();
});

watch(
  () => route.params.id,
  () => {
    getReport();
  }
);
</script>

<template>
  <div class="h-56 bg-brand-blue pt-5">
    <div class="mx-auto max-w-screen-2xl">
      <div class="flex items-center justify-between px-3 md:px-0">
        <h1 class="flex items-center text-2xl font-bold text-white">
          <RectangleGroupIcon class="mr-3 w-7" />
          Report
        </h1>
        <div class="hidden items-center md:flex">
          <div class="flex items-center">
            <button @click="search" class="z-10 -mr-7 border-0 bg-transparent">
              <MagnifyingGlassIcon class="w-4 text-slate-400" />
            </button>
            <input
              type="text"
              class="rounded-md border-slate-300 py-2 pl-10 pr-3 text-slate-700 placeholder-slate-300 shadow"
              placeholder="Job Number"
              v-model="searchKeyword"
              @keydown.enter="search"
            />
          </div>
          <div class="relative">
            <div
              class="absolute -right-4 -top-3 inline-block hidden w-6 rounded-full bg-red-500 p-1 text-center text-xs font-bold text-white"
            >
              2
            </div>
            <BellIcon class="ml-4 w-7 text-white" />
          </div>
          <div class="relative">
            <CogIcon class="ml-3 w-7 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mx-auto -mt-36 max-w-screen-2xl pb-5 md:-mt-32">
    <Loading v-if="loading" class="mt-48" />
    <div v-else-if="report">
      <div class="my-5 rounded-md bg-white shadow">
        <ReportStatus :status="report.VesselStatus" />

        <div class="mt-8 px-2 pb-5 md:px-10">
          <div class="mt-8">
            <div
              class="mb-8 rounded-tr-3xl rounded-bl-3xl bg-[#2b93a5] px-4 py-6"
            >
              <div class="grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-3">
                <div class="group">
                  <div class="flex items-center">
                    <BookmarkSquareIcon
                      class="mr-4 w-5 text-sky-100 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="font-bold text-white">Job No.</div>
                      <div class="mt-1 text-sm text-slate-100">
                        {{ report.JobNum }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <ClipboardDocumentListIcon
                      class="mr-4 w-5 text-sky-100 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="font-bold text-white">Bill of Lading</div>
                      <div class="mt-1 text-sm text-slate-100">
                        {{ report.HBLNO }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <ArrowLeftOnRectangleIcon
                      class="mr-4 w-5 text-sky-100 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="font-bold text-white">Place of receipt</div>
                      <div class="mt-1 text-sm text-slate-100">
                        {{ report.PlaceOfReceipt }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <BarsArrowUpIcon
                      class="mr-4 w-5 text-sky-100 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="font-bold text-white">Port of Loading</div>
                      <div class="mt-1 text-sm text-slate-100">
                        {{ report.PortOfLoading }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <BarsArrowDownIcon
                      class="mr-4 w-5 text-sky-100 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="font-bold text-white">Port of Discharge</div>
                      <div class="mt-1 text-sm text-slate-100">
                        {{ report.PortOfDischarge }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <ArrowRightOnRectangleIcon
                      class="mr-4 w-5 text-sky-100 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="font-bold text-white">Place of Delivery</div>
                      <div class="mt-1 text-sm text-slate-100">
                        {{ report.PlaceOfDelivery }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-8 rounded-xl bg-[#cbdee6] p-4">
              <table class="table table-auto text-left">
                <tbody>
                  <tr>
                    <th class="p-1 text-[#6d6e71]">Total Containers:</th>
                    <td class="p-1 text-sm text-[#6d6e71]">
                      {{ report.containers.length }} Container
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 class="mb-2 text-lg font-semibold text-slate-600">
              Planned Route
            </h2>
            <div class="mb-8 overflow-x-scroll rounded-xl bg-slate-100 p-4">
              <table class="table w-full table-auto overflow-scroll text-left">
                <thead>
                  <tr>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      Stage Type
                    </th>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      Mode Of Trans.
                    </th>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      Vessel / Voyage
                    </th>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      Origin Location
                    </th>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      (Estimated) Departure Time
                    </th>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      Destination Location
                    </th>
                    <th class="border-b px-1 pb-2 font-semibold text-[#0f446f]">
                      (Estimated) Arrival Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-if="report.VesselVoyage1 && report.VesselVoyage1 !== ' '"
                  >
                    <td class="p-1 text-sm text-slate-600">Main Carriage</td>
                    <td class="p-1 text-sm text-slate-600">Ocean</td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.VesselVoyage1 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.PortOfLoading }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATS_POL_1">{{ report.ATS_POL_1 }}</div>
                      <div v-else>{{ report.ETS_POL_1 }}</div>
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_1 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATA_POD_1">{{ report.ATA_POD_1 }}</div>
                      <div v-else>{{ report.ETA_POD_1 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage2 && report.VesselVoyage2 !== ' '"
                  >
                    <td class="p-1 text-sm text-slate-600">Main Carriage</td>
                    <td class="p-1 text-sm text-slate-600">Ocean</td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.VesselVoyage2 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_1 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATS_POL_1">{{ report.ATS_POL_2 }}</div>
                      <div v-else>{{ report.ETS_POL_2 }}</div>
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_2 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATA_POD_2">{{ report.ATA_POD_2 }}</div>
                      <div v-else>{{ report.ETA_POD_2 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage3 && report.VesselVoyage3 !== ' '"
                  >
                    <td class="p-1 text-sm text-slate-600">Main Carriage</td>
                    <td class="p-1 text-sm text-slate-600">Ocean</td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.VesselVoyage3 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_2 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATS_POL_3">{{ report.ATS_POL_3 }}</div>
                      <div v-else>{{ report.ETS_POL_3 }}</div>
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_3 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATA_POD_3">{{ report.ATA_POD_3 }}</div>
                      <div v-else>{{ report.ETA_POD_3 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage4 && report.VesselVoyage4 !== ' '"
                  >
                    <td class="p-1 text-sm text-slate-600">Main Carriage</td>
                    <td class="p-1 text-sm text-slate-600">Ocean</td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.VesselVoyage4 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_3 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATS_POL_4">{{ report.ATS_POL_4 }}</div>
                      <div v-else>{{ report.ETS_POL_4 }}</div>
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_4 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATA_POD_4">{{ report.ATA_POD_4 }}</div>
                      <div v-else>{{ report.ETA_POD_4 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage5 && report.VesselVoyage5 !== ' '"
                  >
                    <td class="p-1 text-sm text-slate-600">Main Carriage</td>
                    <td class="p-1 text-sm text-slate-600">Ocean</td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.VesselVoyage5 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_4 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATS_POL_5">{{ report.ATS_POL_5 }}</div>
                      <div v-else>{{ report.ETS_POL_5 }}</div>
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      {{ report.Pod_5 }}
                    </td>
                    <td class="p-1 text-sm text-slate-600">
                      <div v-if="report.ATA_POD_5">{{ report.ATA_POD_5 }}</div>
                      <div v-else>{{ report.ETA_POD_5 }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="report.containers.length">
              <h2 class="mb-2 text-lg font-semibold text-slate-600">
                Containers
              </h2>
              <div class="mb-8 overflow-x-scroll rounded-xl bg-slate-100 p-4">
                <table
                  class="table w-full table-auto overflow-scroll text-left"
                >
                  <thead>
                    <tr>
                      <th
                        class="border-b px-1 pb-2 font-semibold text-[#0f446f]"
                      >
                        B/L Number
                      </th>
                      <th
                        class="border-b px-1 pb-2 font-semibold text-[#0f446f]"
                      >
                        Container Number
                      </th>
                      <th
                        class="border-b px-1 pb-2 font-semibold text-[#0f446f]"
                      >
                        Size / Type
                      </th>
                      <th
                        class="border-b px-1 pb-2 font-semibold text-[#0f446f]"
                      >
                        Vessel Voyage
                      </th>
                      <th
                        class="border-b px-1 pb-2 font-semibold text-[#0f446f]"
                      >
                        Final Destination
                      </th>
                      <th
                        class="border-b px-1 pb-2 font-semibold text-[#0f446f]"
                      >
                        ETA Final Destination
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="container in report.containers"
                      :key="container.ContainerNo"
                    >
                      <td class="p-1 text-sm text-slate-600">
                        {{ container.HBLBillNumber }}
                      </td>
                      <td class="p-1 text-sm text-slate-600">
                        {{ container.ContainerNo }}
                      </td>
                      <td class="p-1 text-sm text-slate-600">
                        {{ container.size.ContainerWeight }}' /
                        {{ container.type.EnTypeContainerName }}
                      </td>
                      <td class="p-1 text-sm text-slate-600">
                        {{ container.Vessel }} / {{ container.Voyage }}
                      </td>
                      <td class="p-1 text-sm text-slate-600">
                        {{ container.PlaceOfDelivery }}
                      </td>
                      <td class="p-1 text-sm text-slate-600">
                        {{ container.VesselSailing }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="mx-auto max-w-screen-lg rounded-lg bg-white py-24 text-center shadow"
      >
        <div class="text-xl text-red-500">
          an error occurred, please try again.
        </div>
        <div class="mt-6 flex items-center justify-center">
          <button
            @click="router.back()"
            class="rounded-md bg-slate-300 px-5 py-2 text-slate-600 shadow"
          >
            Go Back
          </button>
          <button
            @click="getReport"
            class="ml-2 rounded-md bg-teal-500 px-5 py-2 text-white shadow"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
