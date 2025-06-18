// Hiệu ứng nhỏ khi hover
document.querySelectorAll('.cv-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});

// Logic cho Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

function toggleDarkMode() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

darkModeToggle.addEventListener('click', toggleDarkMode);


// Logic cho thanh tìm kiếm CV
const cvSearchInput = document.getElementById('cvSearchInput');
const cvCards = document.querySelectorAll('.cv-card');

cvSearchInput.addEventListener('keyup', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    cvCards.forEach(card => {
        const cvName = card.querySelector('h3').textContent.toLowerCase();

        if (cvName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    // Sau khi lọc, cần kiểm tra lại trạng thái nút cuộn
    updateScrollButtonsVisibility();
});


// Logic cho cuộn ngang và nút điều hướng
const cvList = document.getElementById('cvList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Hàm cập nhật trạng thái hiển thị của nút
function updateScrollButtonsVisibility() {
    // Chỉ hiển thị nút nếu có overflow
    if (cvList.scrollWidth > cvList.clientWidth) {
        // Nút Prev
        if (cvList.scrollLeft === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex'; // Hiển thị nútPrev
        }

        // Nút Next
        // Ẩn nút Next nếu đã cuộn đến cuối hoặc gần cuối (có thể có sai số nhỏ)
        if (Math.ceil(cvList.scrollLeft + cvList.clientWidth) >= cvList.scrollWidth) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex'; // Hiển thị nútNext
        }
    } else {
        // Nếu không có overflow, ẩn cả hai nút
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}

// Lắng nghe sự kiện cuộn trên cvList để cập nhật trạng thái nút
cvList.addEventListener('scroll', updateScrollButtonsVisibility);

// Xử lý sự kiện click cho nút Prev
prevBtn.addEventListener('click', () => {
    const scrollAmount = cvList.clientWidth * 0.7; // Cuộn 70% chiều rộng hiển thị
    cvList.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// Xử lý sự kiện click cho nút Next
nextBtn.addEventListener('click', () => {
    const scrollAmount = cvList.clientWidth * 0.7; // Cuộn 70% chiều rộng hiển thị
    cvList.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Gọi hàm cập nhật nút khi trang tải và khi cửa sổ được resize
window.addEventListener('resize', updateScrollButtonsVisibility);
document.addEventListener('DOMContentLoaded', updateScrollButtonsVisibility);

// Fix cho trường hợp search làm thay đổi display và gây lỗi cuộn
// Để đảm bảo tìm kiếm hoạt động tốt với cuộn ngang, chúng ta cần đảm bảo
// các thẻ ẩn đi không ảnh hưởng đến scrollWidth/clientWidth một cách bất ngờ.
// Với `display: none`, chúng sẽ không chiếm không gian và scrollWidth sẽ thay đổi.
// Nếu muốn giữ nguyên không gian khi ẩn, dùng `visibility: hidden; position: absolute;`
// nhưng `display: none` là cách phổ biến nhất cho tìm kiếm.
// `updateScrollButtonsVisibility()` được gọi sau khi tìm kiếm để điều chỉnh nút.