<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div
      class="flex-column flex flex-wrap items-center justify-between space-y-4 bg-white px-3 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <div>
        <button
          id="dropdownActionButton"
          class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          type="button"
          data-dropdown-toggle="dropdownAction"
        >
          <span class="sr-only">Action button</span>
          Action
          <svg
            class="ms-2.5 h-2.5 w-2.5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 4 4 4-4"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownAction"
          class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            class="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownActionButton"
          >
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                >Reward</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                >Promote</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                >Activate account</a
              >
            </li>
          </ul>
          <div class="py-1">
            <a
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
              >Delete User</a
            >
          </div>
        </div>
      </div>
      <label class="sr-only" for="table-search">Search</label>
      <div class="relative">
        <div
          class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
        >
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
        <input
          id="table-search-users"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Search for users"
        />
      </div>
    </div>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="p-4" scope="col">
            <div class="flex items-center">
              <input
                id="checkbox-all-search"
                class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-all-search">checkbox</label>
            </div>
          </th>
          <th class="px-6 py-3" scope="col">Name</th>
          <th class="px-6 py-3" scope="col">Position</th>
          <th class="px-6 py-3" scope="col">Status</th>
          <th class="px-6 py-3" scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-table-search-1">checkbox</label>
            </div>
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
            scope="row"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://picsum.photos/400/300?random=1"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Neil Sims</div>
              <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">React Developer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <!-- Modal toggle -->
            <a
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              type="button"
              href="#"
              data-modal-show="editUserModal"
              data-modal-target="editUserModal"
              >Edit user</a
            >
          </td>
        </tr>
        <tr
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-2"
                class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-table-search-2">checkbox</label>
            </div>
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://picsum.photos/400/300?random=1"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Bonnie Green</div>
              <div class="font-normal text-gray-500">bonnie@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">Designer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <!-- Modal toggle -->
            <a
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              type="button"
              href="#"
              data-modal-show="editUserModal"
              >Edit user</a
            >
          </td>
        </tr>
        <tr
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-2"
                class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-table-search-2">checkbox</label>
            </div>
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://picsum.photos/400/300?random=1"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Jese Leos</div>
              <div class="font-normal text-gray-500">jese@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">Vue JS Developer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <!-- Modal toggle -->
            <a
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              type="button"
              href="#"
              data-modal-show="editUserModal"
              >Edit user</a
            >
          </td>
        </tr>
        <tr
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-2"
                class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-table-search-2">checkbox</label>
            </div>
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://picsum.photos/400/300?random=1"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Thomas Lean</div>
              <div class="font-normal text-gray-500">thomes@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">UI/UX Engineer</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
              Online
            </div>
          </td>
          <td class="px-6 py-4">
            <!-- Modal toggle -->
            <a
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              type="button"
              href="#"
              data-modal-show="editUserModal"
              >Edit user</a
            >
          </td>
        </tr>
        <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-3"
                class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="sr-only" for="checkbox-table-search-3">checkbox</label>
            </div>
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <img
              class="h-10 w-10 rounded-full"
              src="https://picsum.photos/400/300?random=1"
              alt="Jese image"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">Leslie Livingston</div>
              <div class="font-normal text-gray-500">leslie@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">SEO Specialist</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
              Offline
            </div>
          </td>
          <td class="px-6 py-4">
            <!-- Modal toggle -->
            <a
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              type="button"
              href="#"
              data-modal-show="editUserModal"
              >Edit user</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Edit user modal -->
    <div
      id="editUserModal"
      class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      aria-hidden="true"
      tabindex="-1"
    ></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'adminlayout'
})
</script>

<style scoped></style>
