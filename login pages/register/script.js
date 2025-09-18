// Pastikan DOM sudah dimuat sepenuhnya sebelum menjalankan skrip
    document.addEventListener('DOMContentLoaded', function() {
        var detailModal = document.getElementById('detailModal');
        detailModal.addEventListener('show.bs.modal', function(event) {
            // Ambil elemen yang memicu modal (yaitu tautan "Detail >")
            var button = event.relatedTarget;
            
            // Ambil data dari atribut kustom
            var title = button.getAttribute('data-title');
            var date = button.getAttribute('data-date');
            var content = button.getAttribute('data-content');

            // Perbarui konten modal
            var modalTitle = detailModal.querySelector('.modal-title');
            var modalDate = detailModal.querySelector('#modal-date');
            var modalContent = detailModal.querySelector('#modal-content');

            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalContent.textContent = content;
        });
    });