document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const bentoContainer = document.querySelector('.bento');

    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Mencegah klik menyebar ke dokumen utama
            e.stopPropagation();
            
            const isCurrentlyActive = box.classList.contains('is-active');
            
            // Hapus kelas aktif dari semua elemen terlebih dahulu (reset)
            document.querySelectorAll('.is-active, .has-active').forEach(el => {
                el.classList.remove('is-active', 'has-active');
            });
            
            // Jika kotak yang diklik belum aktif, maka aktifkan
            if (!isCurrentlyActive) {
                box.classList.add('is-active');
                
                // Cari elemen parent (baris atau kolom) dan beri kelas has-active
                // untuk memicu transisi flexbox membesar pada jalur elemen tersebut
                let currentParent = box.parentElement;
                while (currentParent && !currentParent.classList.contains('layout-wrapper')) {
                    if (currentParent.classList.contains('col') || currentParent.classList.contains('row')) {
                        currentParent.classList.add('has-active');
                    }
                    currentParent = currentParent.parentElement;
                }
                
                // Beri tahu container utama bahwa ada kotak yang sedang aktif
                bentoContainer.classList.add('has-active');
            }
        });
    });

    // Jika mengklik di luar area kotak (background / ruang kosong), kembalikan semua ke ukuran normal
    document.addEventListener('click', () => {
        document.querySelectorAll('.is-active, .has-active').forEach(el => {
            el.classList.remove('is-active', 'has-active');
        });
    });
});
