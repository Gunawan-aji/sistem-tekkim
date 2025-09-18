document.addEventListener('DOMContentLoaded', function () {

    // 1. Inisialisasi elemen-elemen penting
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    const sidebar = document.querySelector('.sidebar-wrapper');
    const navLinks = document.querySelectorAll('.list-group-item[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const mainTitle = document.querySelector('#page-content-wrapper h5');

    // 2. Sidebar Toggle untuk tampilan responsif
    if (menuToggle && wrapper) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }

    // 3. Navigasi Sidebar dan Menutup Saat Memilih Link
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Atur kelas 'active' pada tautan sidebar
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // Sembunyikan semua konten dan tampilkan yang sesuai
            const targetId = this.getAttribute('data-target');
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Perbarui judul di navbar
            if (mainTitle) {
                const linkText = this.textContent.trim();
                mainTitle.textContent = linkText;
            }

            // --- Bagian Kunci ---
            // Tutup sidebar setelah navigasi
            if (wrapper.classList.contains('toggled')) {
                wrapper.classList.remove('toggled');
            }
        });
    });

    // 4. Tangani collapse pada menu "Tambah Labolatorium" (sama seperti sebelumnya)
    const labCollapse = document.getElementById('lab-collapse');
    if (labCollapse) {
        const parentLink = labCollapse.previousElementSibling;

        labCollapse.addEventListener('show.bs.collapse', function () {
            parentLink.classList.add('active-collapse');
        });

        labCollapse.addEventListener('hide.bs.collapse', function () {
            parentLink.classList.remove('active-collapse');
        });

        const initialActiveLink = document.querySelector('.list-group-item.active');
        if (initialActiveLink && initialActiveLink.closest('#lab-collapse')) {
            const parentCollapse = initialActiveLink.closest('.collapse');
            if (parentCollapse) {
                const bsCollapse = new bootstrap.Collapse(parentCollapse, { toggle: false });
                bsCollapse.show();
            }
        }
    }

    // 5. Menutup sidebar saat klik di luar area sidebar atau tombol toggler
    document.addEventListener('click', function(event) {
        // Cek apakah sidebar sedang terbuka
        const isSidebarToggled = wrapper.classList.contains('toggled');

        if (isSidebarToggled) {
            // Cek apakah klik berasal dari dalam sidebar atau tombol toggler
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggler = menuToggle.contains(event.target);

            // Jika klik di luar kedua area tersebut, tutup sidebar
            if (!isClickInsideSidebar && !isClickOnToggler) {
                wrapper.classList.remove('toggled');
            }
        }
    });

    // --- Fungsionalitas Edit Profil ---
        const editBtn = document.getElementById('edit-btn');
        const saveBtn = document.getElementById('save-btn');
        const cancelBtn = document.getElementById('cancel-btn');
        const profileDataElements = document.querySelectorAll('.profile-data span');
        const profileDataInputs = document.querySelectorAll('.profile-data input');
        const editButtonsDiv = document.querySelector('.edit-buttons');
        const profileNameText = document.getElementById('profile-name-text');
        const profileNameInput = document.getElementById('profile-name-input');
        const profileNameText2 = document.getElementById('profile-name-text2');
        
        // Data profil awal
        const initialData = {
            name: profileNameText.textContent,
            nim: document.getElementById('nim-text').textContent,
            email: document.getElementById('email-text').textContent,
            prodi: document.getElementById('prodi-text').textContent
        };

        function toggleEditMode(isEditing) {
            profileDataElements.forEach(el => el.classList.toggle('d-none', isEditing));
            profileDataInputs.forEach(el => el.classList.toggle('d-none', !isEditing));
            
            profileNameText.classList.toggle('d-none', isEditing);
            profileNameInput.classList.toggle('d-none', !isEditing);

            editBtn.classList.toggle('d-none', isEditing);
            editButtonsDiv.classList.toggle('d-none', !isEditing);
        }

        editBtn.addEventListener('click', function() {
            profileNameInput.value = initialData.name;
            document.getElementById('nim-input').value = initialData.nim;
            document.getElementById('email-input').value = initialData.email;
            document.getElementById('prodi-input').value = initialData.prodi;
            toggleEditMode(true);
        });

        saveBtn.addEventListener('click', function() {
            // Simpan data dari input ke span
            profileNameText.textContent = profileNameInput.value;
            profileNameText2.textContent = profileNameInput.value;
            document.getElementById('nim-text').textContent = document.getElementById('nim-input').value;
            document.getElementById('email-text').textContent = document.getElementById('email-input').value;
            document.getElementById('prodi-text').textContent = document.getElementById('prodi-input').value;
            
            // Perbarui data awal
            initialData.name = profileNameText.textContent;
            initialData.nim = document.getElementById('nim-text').textContent;
            initialData.email = document.getElementById('email-text').textContent;
            initialData.prodi = document.getElementById('prodi-text').textContent;

            toggleEditMode(false);
        });

        cancelBtn.addEventListener('click', function() {
            // Kembalikan ke data awal
            profileNameText.textContent = initialData.name;
            document.getElementById('nim-text').textContent = initialData.nim;
            document.getElementById('email-text').textContent = initialData.email;
            document.getElementById('prodi-text').textContent = initialData.prodi;
            toggleEditMode(false);
        });
});