<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-6">
    <form class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Movie Name Input -->
      <div>
        <label for="movie-name" class="block text-sm font-medium text-gray-700">Movie Name</label>
        <input type="text" id="movie-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter movie name...">
      </div>
      <!-- Location Input -->
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
        <input type="text" id="location" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter location...">
      </div>
      <!-- Date Input -->
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" id="date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
      </div>
      <!-- Search Button -->
      <div class="flex items-end">
        <button type="submit" class="bg-blue-600 text-white w-full py-2 px-4 rounded-lg hover:bg-blue-700">
          Search
        </button>
      </div>
    </form>
  </div>
</template>
