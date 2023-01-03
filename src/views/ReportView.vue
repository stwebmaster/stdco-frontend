<script setup>
import ReportStatus from "@/components/ReportStatus.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Loading from "@/components/Loading.vue";
import { ListBulletIcon } from "@heroicons/vue/24/solid";
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
  <div class="pt-5 bg-brand-blue h-56">
    <div class="max-w-screen-2xl mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-white flex items-center">
          <ListBulletIcon class="w-7 mr-3" />
          Report
        </h1>
        <div class="flex items-center">
          <div class="flex items-center">
            <button @click="search" class="bg-transparent border-0 -mr-7 z-10">
              <MagnifyingGlassIcon class="w-4 text-slate-400" />
            </button>
            <input
              type="text"
              class="pl-10 pr-3 py-2 rounded-md border-slate-300 text-slate-700 shadow placeholder-slate-300"
              placeholder="Job Number"
              v-model="searchKeyword"
              @keydown.enter="search"
            />
          </div>
          <div class="relative">
            <div
              class="text-white hidden bg-red-500 rounded-full inline-block p-1 w-6 text-xs font-bold text-center absolute -right-4 -top-3"
            >
              2
            </div>
            <BellIcon class="w-7 text-white ml-4" />
          </div>
          <div class="relative">
            <CogIcon class="w-7 text-white ml-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="max-w-screen-2xl mx-auto pb-5 -mt-32">
    <Loading v-if="loading" />
    <div v-else-if="report">
      <div class="bg-white rounded-md my-5 shadow">
        <ReportStatus :status="report.VesselStatus" />

        <div class="px-10 mt-8 pb-5">
          <div class="mt-8">
            <div
              class="px-4 py-6 bg-[#2b93a5] rounded-tr-3xl rounded-bl-3xl mb-8"
            >
              <div class="grid grid-cols-6">
                <div class="group">
                  <div class="flex items-center">
                    <BookmarkSquareIcon
                      class="w-5 text-sky-100 mr-4 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="text-white font-bold">Job No.</div>
                      <div class="text-sm text-slate-100 mt-1">
                        {{ report.JobNum }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <ClipboardDocumentListIcon
                      class="w-5 text-sky-100 mr-4 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="text-white font-bold">Bill of Lading</div>
                      <div class="text-sm text-slate-100 mt-1">
                        {{ report.HBLNO }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <ArrowLeftOnRectangleIcon
                      class="w-5 text-sky-100 mr-4 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="text-white font-bold">Place of receipt</div>
                      <div class="text-sm text-slate-100 mt-1">
                        {{ report.PlaceOfReceipt }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <BarsArrowUpIcon
                      class="w-5 text-sky-100 mr-4 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="text-white font-bold">Port of Loading</div>
                      <div class="text-sm text-slate-100 mt-1">
                        {{ report.PortOfLoading }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <BarsArrowDownIcon
                      class="w-5 text-sky-100 mr-4 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="text-white font-bold">Port of Discharge</div>
                      <div class="text-sm text-slate-100 mt-1">
                        {{ report.PortOfDischarge }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group">
                  <div class="flex items-center">
                    <ArrowRightOnRectangleIcon
                      class="w-5 text-sky-100 mr-4 group-hover:animate-bounce"
                    />
                    <div>
                      <div class="text-white font-bold">Place of Delivery</div>
                      <div class="text-sm text-slate-100 mt-1">
                        {{ report.PlaceOfDelivery }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 bg-[#cbdee6] rounded-xl mb-8">
              <table class="table table-auto text-left">
                <tbody>
                  <tr>
                    <th class="text-[#6d6e71] p-1">Total Containers:</th>
                    <td class="text-sm text-[#6d6e71] p-1">
                      10 x 40' Hi-Cube Container
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 class="font-semibold text-lg mb-2 text-slate-600">
              Planned Route
            </h2>
            <div class="p-4 bg-slate-100 rounded-xl mb-8">
              <table class="table w-full table-auto text-left">
                <thead>
                  <tr>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      Stage Type
                    </th>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      Mode Of Trans.
                    </th>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      Vessel / Voyage
                    </th>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      Origin Location
                    </th>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      (Estimated) Departure Time
                    </th>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      Destination Location
                    </th>
                    <th class="text-[#0f446f] font-semibold px-1 border-b pb-2">
                      (Estimated) Arrival Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-if="report.VesselVoyage1 && report.VesselVoyage1 !== ' '"
                  >
                    <td class="text-sm text-slate-600 p-1">Main Carriage</td>
                    <td class="text-sm text-slate-600 p-1">Ocean</td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.VesselVoyage1 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.PortOfLoading }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATS_POL_1">{{ report.ATS_POL_1 }}</div>
                      <div v-else>{{ report.ETS_POL_1 }}</div>
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_1 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATA_POD_1">{{ report.ATA_POD_1 }}</div>
                      <div v-else>{{ report.ETA_POD_1 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage2 && report.VesselVoyage2 !== ' '"
                  >
                    <td class="text-sm text-slate-600 p-1">Main Carriage</td>
                    <td class="text-sm text-slate-600 p-1">Ocean</td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.VesselVoyage2 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_1 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATS_POL_1">{{ report.ATS_POL_2 }}</div>
                      <div v-else>{{ report.ETS_POL_2 }}</div>
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_2 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATA_POD_2">{{ report.ATA_POD_2 }}</div>
                      <div v-else>{{ report.ETA_POD_2 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage3 && report.VesselVoyage3 !== ' '"
                  >
                    <td class="text-sm text-slate-600 p-1">Main Carriage</td>
                    <td class="text-sm text-slate-600 p-1">Ocean</td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.VesselVoyage3 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_2 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATS_POL_3">{{ report.ATS_POL_3 }}</div>
                      <div v-else>{{ report.ETS_POL_3 }}</div>
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_3 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATA_POD_3">{{ report.ATA_POD_3 }}</div>
                      <div v-else>{{ report.ETA_POD_3 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage4 && report.VesselVoyage4 !== ' '"
                  >
                    <td class="text-sm text-slate-600 p-1">Main Carriage</td>
                    <td class="text-sm text-slate-600 p-1">Ocean</td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.VesselVoyage4 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_3 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATS_POL_4">{{ report.ATS_POL_4 }}</div>
                      <div v-else>{{ report.ETS_POL_4 }}</div>
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_4 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATA_POD_4">{{ report.ATA_POD_4 }}</div>
                      <div v-else>{{ report.ETA_POD_4 }}</div>
                    </td>
                  </tr>
                  <tr
                    v-if="report.VesselVoyage5 && report.VesselVoyage5 !== ' '"
                  >
                    <td class="text-sm text-slate-600 p-1">Main Carriage</td>
                    <td class="text-sm text-slate-600 p-1">Ocean</td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.VesselVoyage5 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_4 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATS_POL_5">{{ report.ATS_POL_5 }}</div>
                      <div v-else>{{ report.ETS_POL_5 }}</div>
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      {{ report.Pod_5 }}
                    </td>
                    <td class="text-sm text-slate-600 p-1">
                      <div v-if="report.ATA_POD_5">{{ report.ATA_POD_5 }}</div>
                      <div v-else>{{ report.ETA_POD_5 }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="report.containers.length">
              <h2 class="font-semibold text-lg mb-2 text-slate-600">
                Containers
              </h2>
              <div class="p-4 bg-slate-100 rounded-xl mb-8">
                <table class="table w-full table-auto text-left">
                  <thead>
                    <tr>
                      <th
                        class="text-[#0f446f] font-semibold px-1 border-b pb-2"
                      >
                        B/L Number
                      </th>
                      <th
                        class="text-[#0f446f] font-semibold px-1 border-b pb-2"
                      >
                        Container Number
                      </th>
                      <th
                        class="text-[#0f446f] font-semibold px-1 border-b pb-2"
                      >
                        Size / Type
                      </th>
                      <th
                        class="text-[#0f446f] font-semibold px-1 border-b pb-2"
                      >
                        Vessel Voyage
                      </th>
                      <th
                        class="text-[#0f446f] font-semibold px-1 border-b pb-2"
                      >
                        Final Destination
                      </th>
                      <th
                        class="text-[#0f446f] font-semibold px-1 border-b pb-2"
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
                      <td class="text-sm text-slate-600 p-1">
                        {{ container.HBLBillNumber }}
                      </td>
                      <td class="text-sm text-slate-600 p-1">
                        {{ container.ContainerNo }}
                      </td>
                      <td class="text-sm text-slate-600 p-1">
                        {{ container.size.ContainerWeight }}' /
                        {{ container.type.EnTypeContainerName }}
                      </td>
                      <td class="text-sm text-slate-600 p-1">
                        {{ container.Vessel }} / {{ container.Voyage }}
                      </td>
                      <td class="text-sm text-slate-600 p-1">
                        {{ container.PlaceOfDelivery }}
                      </td>
                      <td class="text-sm text-slate-600 p-1">
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
        class="py-24 text-center bg-white rounded-lg shadow max-w-screen-lg mx-auto"
      >
        <div class="text-red-500 text-xl">
          an error occurred, please try again.
        </div>
        <div class="mt-6 flex items-center justify-center">
          <button
            @click="router.back()"
            class="px-5 shadow py-2 rounded-md bg-slate-300 text-slate-600"
          >
            Go Back
          </button>
          <button
            @click="getReport"
            class="px-5 shadow py-2 rounded-md bg-teal-500 text-white ml-2"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
