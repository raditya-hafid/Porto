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

    // --- Dark Mode Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah kotak bento merespon
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }

    // --- Language Translation Logic ---
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'en';

    const i18n = {
        'en': {
            'nav-contact': '✉️ Contact',
            'nav-cv': '📄 Download CV',
            'loc': '<strong>📍 Location:</strong> Surakarta, Indonesia',
            'edu': '<strong>🎓 Education:</strong> Informatics Engineering',
            'focus': '<strong>💻 Focus:</strong> Backend & API Design',
            'stack': '<strong>🛠️ Stack:</strong> Laravel, React, MySQL',
            'hi': 'Hi, I\'m Raditya! 👋',
            'about-1': 'I am a <strong>Backend & Software Engineer</strong> passionate about designing system architectures, relational databases (SQL), and RESTful APIs.',
            'about-2': 'Currently studying at <em>Universitas Sebelas Maret (UNS)</em>. I have practical experience in building modular applications using OOP & MVC patterns (Laravel), and I am familiar with server administration (cPanel) and containerization (Docker).',
            'about-3': 'Beyond backend development, I am actively expanding my knowledge in <strong>Quality Assurance (QA)</strong> and automated testing to ensure robust software delivery.',
            'avail': 'Available for Internship Role',
            'feat': 'Featured Projects 🚀',
            'abs-desc': 'An integrated waste management information system (Web & Mobile). Engineered with Laravel, applying strict OOP principles, MySQL database normalization, and API testing via Postman.',
            'abs-note': 'Live Note: Successfully deployed to a production server using cPanel, including live database migration.',
            'geprek-desc': 'An e-commerce platform and digital catalog built using MVC architecture to ensure scalable order processing and smooth user experience.',
            'geprek-note': 'Live Note: Deployed on a free-tier hosting service. The initial server response may experience slight delays.',
            'lead': 'Leadership Experience 🎯',
            'head-title': 'Head of Social Community Div.',
            'head-desc': 'Drive initiatives with big impact by leading social community outreach programs and coordinating cross-organizational collaborations. Responsible for planning and executing social campaigns that connect the academic community with the public.',
            'com-title': 'Committee Member & Participant',
            'com-desc': 'Actively participated in organizing the regional IT festival, ensuring smooth operations and facilitating tech-talk sessions for hundreds of attendees.',
            'skills-title': 'Skills 💻',
            'edu-title': 'Education 🎓',
            'cert-title': 'Certifications 📜'
        },
        'id': {
            'nav-contact': '✉️ Kontak',
            'nav-cv': '📄 Unduh CV',
            'loc': '<strong>📍 Lokasi:</strong> Surakarta, Indonesia',
            'edu': '<strong>🎓 Pendidikan:</strong> Teknik Informatika',
            'focus': '<strong>💻 Fokus:</strong> Backend & Desain API',
            'stack': '<strong>🛠️ Stack:</strong> Laravel, React, MySQL',
            'hi': 'Hai, saya Raditya! 👋',
            'about-1': 'Saya seorang <strong>Backend & Software Engineer</strong> yang bersemangat dalam merancang arsitektur sistem, database relasional (SQL), dan RESTful API.',
            'about-2': 'Saat ini berkuliah di <em>Universitas Sebelas Maret (UNS)</em>. Saya memiliki pengalaman praktis dalam membangun aplikasi modular dengan pola OOP & MVC (Laravel), serta familier dengan administrasi server (cPanel) dan kontainerisasi (Docker).',
            'about-3': 'Di luar backend, saya aktif memperluas pengetahuan di bidang <strong>Quality Assurance (QA)</strong> dan pengujian otomatis untuk memastikan pengiriman perangkat lunak yang tangguh.',
            'avail': 'Tersedia untuk Magang / Internship',
            'feat': 'Proyek Unggulan 🚀',
            'abs-desc': 'Sistem informasi manajemen bank sampah terintegrasi (Web & Mobile). Dibangun dengan Laravel, menerapkan prinsip OOP yang ketat, normalisasi database MySQL, dan pengujian API via Postman.',
            'abs-note': 'Catatan Langsung: Berhasil di-deploy ke server produksi menggunakan cPanel, termasuk migrasi database langsung.',
            'geprek-desc': 'Platform e-commerce dan katalog digital yang dibangun menggunakan arsitektur MVC untuk memastikan pemrosesan pesanan yang skalabel dan pengalaman pengguna yang lancar.',
            'geprek-note': 'Catatan Langsung: Di-deploy di layanan hosting tier gratis. Respons server awal mungkin mengalami sedikit penundaan.',
            'lead': 'Pengalaman Kepemimpinan 🎯',
            'head-title': 'Ketua Divisi Sosial Masyarakat',
            'head-desc': 'Mendorong inisiatif berdampak besar dengan memimpin program penjangkauan masyarakat dan mengoordinasikan kolaborasi lintas organisasi. Bertanggung jawab merencanakan dan mengeksekusi kampanye sosial.',
            'com-title': 'Anggota Panitia & Peserta',
            'com-desc': 'Berpartisipasi aktif dalam penyelenggaraan festival TI regional, memastikan kelancaran operasional, dan memfasilitasi sesi tech-talk untuk ratusan peserta.',
            'skills-title': 'Keahlian 💻',
            'edu-title': 'Pendidikan 🎓',
            'cert-title': 'Sertifikasi 📜'
        }
    };

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            currentLang = currentLang === 'en' ? 'id' : 'en';
            langToggle.innerHTML = currentLang === 'en' ? '🌐 ID/EN' : '🌐 EN/ID';
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (i18n[currentLang][key]) {
                    el.innerHTML = i18n[currentLang][key];
                }
            });
        });
    }
});
