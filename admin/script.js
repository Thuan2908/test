// Hàm tìm kiếm hóa đơn
function searchBill() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toLowerCase();
  let table = document.getElementById("billTable");
  let tr = table.getElementsByTagName("tr");

  // Lặp qua tất cả các dòng và ẩn những dòng không khớp với tìm kiếm
  for (let i = 1; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td");
    let match = false;

    // Kiểm tra trong mỗi cột nếu có từ khóa tìm kiếm
    for (let j = 0; j < td.length; j++) {
      if (td[j] && td[j].textContent.toLowerCase().indexOf(filter) > -1) {
        match = true;
        break;
      }
    }

    if (match) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

// Hàm sắp xếp bảng theo cột
let sortDirection = [true, true, true, true]; // Mảng lưu trạng thái sắp xếp của từng cột

function sortTable(n) {
  let table = document.getElementById("billTable");
  let rows = Array.from(table.rows).slice(1); // Lấy tất cả các hàng trừ hàng tiêu đề
  let sorted = rows.sort((rowA, rowB) => {
    let cellA = rowA.cells[n].textContent.trim();
    let cellB = rowB.cells[n].textContent.trim();

    if (n === 2) {
      // Sắp xếp cột Số Tiền (dạng số)
      cellA = parseInt(cellA.replace(/[^\d]/g, ""));
      cellB = parseInt(cellB.replace(/[^\d]/g, ""));
    }

    if (cellA < cellB) return sortDirection[n] ? -1 : 1;
    if (cellA > cellB) return sortDirection[n] ? 1 : -1;
    return 0;
  });

  // Thay đổi hướng sắp xếp
  sortDirection[n] = !sortDirection[n];

  // Đặt lại các hàng đã sắp xếp
  rows.forEach((row) => table.appendChild(row));
}
