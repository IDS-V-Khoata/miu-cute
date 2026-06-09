 const data = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `Item ${i + 1}`,
            category: i % 2 === 0 ? "Category A" : "Category B"
        }));

        let currentPage = 1;
        const itemsPerPage = 3;
        let filteredData = [...data];

        function displayResults(page = 1) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedData = filteredData.slice(start, end);

            paginatedData.forEach(item => {
                resultsContainer.innerHTML += `
                <div class="p-4 rounded-lg shadow">
                    <div class="p-2 flex justify-between items-center">
                    <p>Head</p>
                        <div class="flex gap-2">
                                    <button class="px-4 py-2 bg-gray-500 text-white rounded">Detail</button>
                                    <button class="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
                        </div>
                    </div>
                    <div class="p-2 bg-gray-200 flex justify-between items-center">
                        <div>
                            <h3 class="font-bold text-lg">${item.name}</h3>
                            <p class="text-gray-600">${item.category}</p>
                        </div>
                    </div>
                </div>
                `;
            });

            renderPagination(filteredData.length, page);
        }

        function renderPagination(totalItems, page) {
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';

            let startPage = Math.max(1, page - 2);
            let endPage = Math.min(totalPages, page + 2);

            if (startPage > 1) {
                paginationContainer.innerHTML += `<button class="px-3 py-1 bg-gray-200 rounded" onclick="changePage(1)"><<</button>`;
            }

            for (let i = startPage; i <= endPage; i++) {
                paginationContainer.innerHTML += `<button class="px-3 py-1 ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded" onclick="changePage(${i})">${i}</button>`;
            }

            if (endPage < totalPages) {
                paginationContainer.innerHTML += `<button class="px-3 py-1 bg-gray-200 rounded" onclick="changePage(${totalPages})">>></button>`;
            }
        }

        function searchData() {
            const query1 = document.getElementById('search1').value.toLowerCase();
            const query2 = document.getElementById('search2').value.toLowerCase();

            filteredData = data.filter(item =>
                item.name.toLowerCase().includes(query1) &&
                item.category.toLowerCase().includes(query2)
            );
            currentPage = 1;
            displayResults(currentPage);
        }

        function resetSearch() {
            document.getElementById('search1').value = '';
            document.getElementById('search2').value = '';
            filteredData = [...data];
            currentPage = 1;
            displayResults(currentPage);
        }

        function changePage(page) {
            currentPage = page;
            displayResults(currentPage);
        }
        // Initial load
        displayResults(currentPage);