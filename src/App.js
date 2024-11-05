import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import data from './data/mock-data.json';

let pageSize = 10;

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return data.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>FIRST NAME</th>
						<th>SURNAME</th>
						<th>EMAIL</th>
						<th>PHONE</th>
					</tr>
				</thead>
				<tbody>
					{currentTableData.map(item => {
						return (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.first_name}</td>
								<td>{item.surname}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={data.length}
				pageSize={pageSize}
				onPageChange={page => setCurrentPage(page)}
			/>
		</>
	);
}

export default App;