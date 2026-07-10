export interface Article {
    id: number
    slug: string
    title: string
    titleEn: string
    category: string
    categoryEn: string
    date: string
    dateEn: string
    image: string
    excerpt: string
    excerptEn: string
    readTime: string
    seo: {
        title: string
        description: string
        keywords: string[]
    }
    seoEn: {
        title: string
        description: string
        keywords: string[]
    }
    content: string       // Indonesian
    contentEn: string     // English
}

export const articles: Article[] = [
    {
        id: 1,
        slug: "seni-hidup-perlahan",
        title: "Seni Hidup Perlahan",
        titleEn: "The Art of Slow Living",
        category: "Gaya Hidup",
        categoryEn: "Lifestyle",
        date: "12 Oktober 2025",
        dateEn: "October 12, 2025",
        image: "/images/hero.png",
        excerpt: "Mengapa melakukan lebih sedikit justru bisa berarti hidup lebih penuh. Sebuah renungan tentang filosofi di balik gerakan slow living.",
        excerptEn: "Why doing less might actually mean living more. A reflection on the philosophy behind the slow living movement.",
        readTime: "5 menit",
        seo: {
            title: "Seni Hidup Perlahan: Filosofi Slow Living | Jurnal Julia Owers",
            description: "Mengapa melakukan lebih sedikit justru bisa berarti hidup lebih penuh? Temukan filosofi slow living dan bagaimana busana linen bisa menjadi bagian dari pilihan hidup yang lebih sadar.",
            keywords: ["slow living", "hidup perlahan", "filosofi hidup", "slow fashion", "busana linen", "julia owers", "gaya hidup minimalis", "conscious living"]
        },
        seoEn: {
            title: "The Art of Slow Living | Julia Owers Journal",
            description: "Why doing less might actually mean living more. Discover the philosophy of slow living and how linen clothing can be part of a more intentional life.",
            keywords: ["slow living", "slow fashion", "linen clothing", "julia owers", "minimalist lifestyle", "conscious living", "sustainable fashion"]
        },
        content: `
Beberapa tahun lalu, seorang pelanggan setia kami di Bandung menceritakan sesuatu yang tidak kami lupakan. Ia berkata: "Saya berhenti membeli baju setiap bulan. Sekarang saya beli satu, tapi benar-benar saya cintai."

Itulah inti dari hidup perlahan.

## Apa Itu Slow Living?

Slow living bukan tentang malas. Bukan tentang tidak produktif. Ini tentang memilih dengan lebih sadar — apa yang kita konsumsi, bagaimana kita menghabiskan waktu, dan benda apa yang kita biarkan masuk ke dalam hidup kita.

Gerakan ini lahir sebagai respons terhadap dunia yang bergerak terlalu cepat. Fast food, fast fashion, fast everything. Semua bergerak cepat, semua bisa diganti, dan hampir tidak ada yang benar-benar kita hargai.

Slow living mengajak kita untuk berhenti sejenak dan bertanya: *Apakah ini yang benar-benar saya inginkan? Apakah ini akan bertahan?*

## Linen sebagai Pilihan Hidup

Kami percaya bahwa pakaian adalah perpanjangan dari nilai-nilai kita.

Ketika seseorang memilih linen, ia memilih bahan yang tumbuh tanpa banyak air, yang bisa bertahan puluhan tahun, yang makin indah seiring pemakaian. Itu bukan sekadar pilihan estetika — itu pernyataan tentang cara seseorang ingin hidup.

Busana linen tidak berteriak. Ia berbisik. Dan dalam dunia yang penuh kebisingan, bisikan itu terasa seperti hadiah.

## Tiga Prinsip yang Kami Pegang

**Beli lebih sedikit, pilih lebih baik.** Satu busana yang dicintai dan dipakai bertahun-tahun nilainya jauh melebihi sepuluh busana yang hanya dipakai sekali.

**Hargai apa yang sudah ada.** Sebelum membeli yang baru, tanyakan pada diri sendiri: apakah ada yang sudah saya miliki yang bisa melayani tujuan yang sama?

**Rawat apa yang kita miliki.** Memperbaiki, merawat, dan menjaga busana adalah bentuk penghargaan terhadap kerja tangan yang membuatnya.

## Mulai dari Hal Kecil

Hidup perlahan tidak dimulai dengan keputusan besar. Ia dimulai dari satu pilihan yang lebih sadar — mungkin hari ini, mungkin sore ini.

Mungkin itu berarti menyetrika busana linen Anda dengan sabar sambil mendengarkan musik yang Anda sukai. Atau memilih untuk tidak membuka aplikasi belanja hanya karena bosan.

Langkah kecil itu, diulang terus-menerus, adalah yang membentuk cara kita hidup.

---

*Julia Owers percaya bahwa pakaian yang baik adalah yang menemani Anda, bukan yang mendikte Anda. Jelajahi koleksi linen kami — dibuat untuk dikenakan, bukan sekadar dimiliki.*
        `,
        contentEn: `
A few years ago, one of our loyal customers in Bandung told us something we haven't forgotten. She said: "I stopped buying clothes every month. Now I buy one piece — but one I truly love."

That is the heart of slow living.

## What Is Slow Living?

Slow living is not about laziness. It's not about being unproductive. It's about choosing more deliberately — what we consume, how we spend our time, and what we allow into our lives.

This movement emerged as a response to a world moving too fast. Fast food, fast fashion, fast everything. Everything moves quickly, everything is replaceable, and almost nothing is truly appreciated.

Slow living invites us to pause and ask: *Is this what I truly want? Will this last?*

## Linen as a Life Choice

We believe clothing is an extension of our values.

When someone chooses linen, they choose a fabric that grows without much water, that can last for decades, that grows more beautiful with wear. That isn't just an aesthetic choice — it's a statement about how one wants to live.

Linen clothing doesn't shout. It whispers. And in a world full of noise, that whisper feels like a gift.

## Three Principles We Hold

**Buy less, choose better.** One piece you love and wear for years is worth far more than ten pieces worn once.

**Value what you already have.** Before buying something new, ask yourself: is there something I already own that can serve the same purpose?

**Care for what we own.** Repairing, maintaining, and tending to our clothes is a form of respect for the hands that made them.

## Start Small

Slow living doesn't begin with a grand decision. It begins with one more conscious choice — maybe today, maybe this evening.

Maybe that means ironing your linen piece slowly while listening to music you love. Or choosing not to open a shopping app just because you're bored.

Small steps, repeated consistently, are what shape the way we live.

---

*Julia Owers believes that good clothing accompanies you, rather than dictates to you. Explore our linen collection — made to be worn, not merely owned.*
        `
    },
    {
        id: 2,
        slug: "cara-merawat-linen",
        title: "Cara Merawat Linen Anda",
        titleEn: "How to Care for Your Linen",
        category: "Panduan",
        categoryEn: "Guide",
        date: "5 Oktober 2025",
        dateEn: "October 5, 2025",
        image: "/images/products/2.jpg",
        excerpt: "Panduan lengkap mencuci, mengeringkan, dan menyimpan busana linen agar tetap indah bertahun-tahun.",
        excerptEn: "A complete guide to washing, drying, and storing your linen pieces so they remain beautiful for years.",
        readTime: "6 menit",
        seo: {
            title: "Cara Merawat Busana Linen agar Tahan Lama | Julia Owers Journal",
            description: "Panduan lengkap merawat busana linen Julia Owers: cara mencuci, mengeringkan, menyetrika, dan menyimpan yang benar agar kain linen awet hingga puluhan tahun.",
            keywords: ["cara merawat linen", "mencuci kain linen", "perawatan busana linen", "linen awet", "julia owers", "panduan linen", "baju linen"]
        },
        seoEn: {
            title: "How to Care for Linen Clothing: Complete Guide | Julia Owers Journal",
            description: "Complete guide to caring for your Julia Owers linen pieces: how to wash, dry, iron, and store linen properly so it lasts for decades.",
            keywords: ["how to care for linen", "washing linen clothes", "linen care guide", "julia owers", "linen clothing care", "sustainable wardrobe"]
        },
        content: `
Kain linen adalah salah satu keajaiban alam yang paling tahan uji. Berbeda dengan banyak kain modern, linen tidak melemah — ia justru menguat. Tidak pudar, tapi semakin kaya. Tidak kaku, tapi semakin lembut.

Tapi seperti semua hal yang berharga, linen butuh sedikit perhatian yang tepat.

## Mencuci: Pelan, Tapi Bersih

Aturan utama mencuci linen adalah **suhu dingin, mode lembut**. Mesin cuci suhu 30°C sudah lebih dari cukup untuk membersihkan linen dari debu dan keringat sehari-hari.

**Yang perlu diingat:**
- Gunakan detergen ringan, idealnya yang ramah lingkungan
- Jangan mencampur dengan pakaian berwarna gelap jika linen Anda berwarna terang
- Balik busana ke dalam sebelum dimasukkan mesin — ini melindungi permukaan luar dari gesekan
- Hindari pemutih dalam bentuk apa pun. Ia merusak serat linen dari dalam

Untuk noda membandel, tangani segera dengan air dingin dan sedikit sabun cair. Jangan digosok keras — tepuk-tepuk dengan lembut dari luar ke dalam noda.

## Mengeringkan: Biarkan Angin Bekerja

Linen paling baik dikeringkan secara alami. Gantung atau bentangkan di tempat teduh — bukan di bawah terik matahari langsung, karena itu bisa memudarkan warna seiring waktu.

Jika terpaksa menggunakan pengering mesin, gunakan suhu paling rendah dan angkat sebelum benar-benar kering. Biarkan sisa kelembapan menguap sendiri di udara terbuka.

Satu hal yang perlu Anda tahu: **linen mungkin sedikit menyusut pada cucian pertama**. Ini normal, dan kami sudah memperhitungkan hal ini dalam pola ukuran kami.

## Menyetrika: Seni yang Tidak Wajib

Percaya atau tidak, banyak pecinta linen yang tidak menyetrika busana mereka sama sekali. Kerutan alami linen adalah bagian dari karakternya — tanda bahwa ini kain yang hidup dan nyata.

Tapi jika Anda ingin tampilan yang lebih rapi, setrika linen saat masih sedikit lembap. Gunakan uap dan setrika dari bagian dalam kain. Hasilnya akan jauh lebih mulus tanpa risiko kilap yang kadang muncul jika disetrika dari luar.

## Menyimpan: Beri Ruang untuk Bernapas

Linen butuh sirkulasi udara. Hindari menyimpannya dalam kantong plastik tertutup rapat — gunakan sarung busana dari kain yang bisa bernapas, atau gantung di lemari yang tidak terlalu penuh.

Untuk gaun dan blus, gantung selalu lebih baik dari dilipat. Untuk celana dan rok, lipat dengan rapi di rak.

Kapur barus alami dari kayu cedar adalah sahabat lemari yang terbaik — mengusir ngengat tanpa bahan kimia yang bisa merusak kain.

## Satu Hal yang Sering Dilupakan

Linen yang dirawat dengan baik tidak hanya bertahan lama — ia bertambah indah. Serat-seratnya melembut, warnanya mendalam, dan ada semacam kejernihan pada kain yang sudah melewati banyak musim bersama pemiliknya.

Itulah mengapa kami selalu bilang: busana linen yang terbaik adalah yang paling sering Anda pakai.

---

*Punya pertanyaan lebih lanjut tentang perawatan busana Julia Owers? Hubungi tim kami langsung melalui WhatsApp atau kunjungi halaman [Panduan Perawatan](/care) kami yang lengkap.*
        `,
        contentEn: `
Linen fabric is one of nature's most resilient wonders. Unlike many modern fabrics, linen doesn't weaken with time — it strengthens. It doesn't fade, it deepens. It doesn't stiffen, it softens.

But like all things worth having, linen needs a little proper attention.

## Washing: Gentle, But Thorough

The golden rule for washing linen is **cold water, gentle cycle**. A 30°C machine wash is more than enough to clean linen from everyday dust and sweat.

**Things to remember:**
- Use a mild detergent, ideally eco-friendly
- Don't mix with dark garments if your linen is light-coloured
- Turn the garment inside out before washing — this protects the outer surface from friction
- Avoid bleach in any form. It damages linen fibres from within

For stubborn stains, treat immediately with cold water and a little liquid soap. Don't scrub hard — dab gently from the outside of the stain inward.

## Drying: Let the Air Do the Work

Linen dries best naturally. Hang or lay flat in the shade — not in direct sunlight, which can fade colour over time.

If you must use a tumble dryer, use the lowest heat setting and remove before fully dry. Let the remaining moisture evaporate naturally in open air.

One thing to know: **linen may shrink slightly on the first wash**. This is normal, and we account for it in our sizing patterns.

## Ironing: An Art, Not an Obligation

Believe it or not, many linen lovers never iron their pieces at all. Linen's natural creases are part of its character — a sign that this is a fabric that's alive and real.

But if you prefer a crisper look, iron linen while still slightly damp. Use steam and iron from the inside of the fabric. The result will be much smoother without the risk of shine that can appear when ironing from the outside.

## Storing: Give It Room to Breathe

Linen needs air circulation. Avoid storing it in tightly sealed plastic bags — use a breathable fabric garment bag, or hang in a wardrobe that isn't too packed.

For dresses and blouses, hanging is always better than folding. For trousers and skirts, fold neatly on a shelf.

Natural cedar wood moth repellent is the wardrobe's best friend — keeping moths away without chemicals that can damage fabric.

## The Thing Often Forgotten

Well-cared-for linen doesn't just last longer — it grows more beautiful. Its fibres soften, its colour deepens, and there's a kind of clarity in fabric that has shared many seasons with its owner.

That's why we always say: the best linen piece is the one you wear most often.

---

*Have more questions about caring for Julia Owers pieces? Contact our team directly via WhatsApp or visit our complete [Care Guide](/care) page.*
        `
    },
    {
        id: 3,
        slug: "sudut-tersembunyi-bandung",
        title: "Sudut-Sudut Tersembunyi Bandung",
        titleEn: "Bandung's Hidden Corners",
        category: "Perjalanan",
        categoryEn: "Travel",
        date: "28 September 2025",
        dateEn: "September 28, 2025",
        image: "/images/products/3.jpg",
        excerpt: "Kedai kopi favorit kami, ruang seni, dan sudut alam di kota kelahiran yang selalu kami rindukan.",
        excerptEn: "Our favourite coffee spots, art spaces, and nature corners in our beloved home city.",
        readTime: "7 menit",
        seo: {
            title: "Sudut Tersembunyi Bandung: Kafe, Seni & Alam | Julia Owers Journal",
            description: "Panduan lokal Bandung dari tim Julia Owers: kedai kopi favorit, galeri seni, taman tersembunyi, dan sudut-sudut kota yang jarang diketahui wisatawan.",
            keywords: ["wisata Bandung", "kafe Bandung tersembunyi", "tempat seni Bandung", "Julia Owers Bandung", "eksplorasi Bandung", "slow travel Bandung", "toko linen Bandung"]
        },
        seoEn: {
            title: "Bandung's Hidden Corners: Coffee, Art & Nature | Julia Owers Journal",
            description: "A local guide to Bandung from the Julia Owers team: favourite coffee spots, art galleries, hidden parks, and city corners rarely known by tourists.",
            keywords: ["Bandung hidden gems", "Bandung coffee shops", "Bandung art scene", "Julia Owers Bandung", "slow travel Bandung", "linen store Bandung"]
        },
        content: `
Setiap hari, kami melewati jalan-jalan Bandung menuju atelier kami. Dan setiap hari, kota ini menawarkan sesuatu yang baru untuk diperhatikan — jika kita mau berjalan lebih pelan.

Inilah beberapa sudut Bandung yang paling kami cintai. Bukan tempat wisata yang ramai. Tapi tempat-tempat yang terasa seperti milik kota, bukan untuk kota.

## Kedai Kopi yang Tidak Terburu-buru

**Kopi Purnama** di Jalan Alkateri adalah salah satu yang paling tua di Bandung — sudah berdiri sejak tahun 1930. Tidak ada WiFi, tidak ada playlist yang dipilih kurator. Yang ada hanya kopi tubruk, meja kayu lama, dan waktu yang terasa berbeda.

Di sisi lain kota, **Revolver Espresso** di Dago menawarkan biji kopi single origin dari berbagai penjuru Nusantara. Kecil, tenang, dan dindingnya penuh dengan karya seniman lokal.

## Ruang Seni yang Jarang Dibicarakan

**Lawangwangi Creative Space** di Dago atas bukan hanya galeri — ia adalah taman, restoran, dan panggung pertunjukan sekaligus. Dari sini, pemandangan Bandung terhampar luas, dan sering ada pameran seniman lokal yang layak dinikmati dengan waktu yang tidak tergesa.

**Selasar Sunaryo Art Space** adalah favorit lama kami. Arsitekturnya sendiri sudah merupakan karya seni. Koleksinya berputar, tapi energinya selalu konsisten — tenang, serius, dan menghargai pengunjungnya.

## Alam di Dalam Kota

Bandung punya taman-taman yang sering terlewat karena terlalu ramai mencari tempat foto. **Kebun Binatang Bandung** bukan hanya untuk anak-anak — area pohon-pohon tua di sisi baratnya adalah tempat duduk terbaik di kota, terutama pagi hari.

Dan kalau Anda punya waktu lebih, jalan setapak di sekitar **Curug Dago** — air terjun kecil di tepi kota — menawarkan ketenangan yang sulit ditemukan di tempat lain di pusat kota Bandung.

## Kenapa Kami Berbagi Ini

Bandung adalah rumah kami. Setiap busana yang kami buat lahir dari energi kota ini — dari kreatifitasnya, dari ketenangannya, dari cara orang-orangnya menjalani hidup dengan ritme yang sedikit lebih lambat dari Jakarta.

Ketika Anda memakai Julia Owers, sedikit dari Bandung ikut bersama Anda.

---

*Sedang berkunjung ke Bandung? Mampir juga ke toko kami di Heritage Factory Outlet, Jl. L.L.RE Martadinata No.63-65. Tim kami senang bertemu langsung.*
        `,
        contentEn: `
Every day, we walk the streets of Bandung to reach our atelier. And every day, the city offers something new to notice — if we're willing to walk a little slower.

Here are some of the Bandung corners we love most. Not the crowded tourist spots. But places that feel like they belong to the city, not just for the city.

## Coffee Shops That Don't Rush You

**Kopi Purnama** on Jalan Alkateri is one of Bandung's oldest — open since 1930. No WiFi, no curated playlist. Just tubruk coffee, old wooden tables, and time that feels different.

On the other side of the city, **Revolver Espresso** in Dago offers single origin beans from across the Indonesian archipelago. Small, quiet, and walls full of local artist work.

## Art Spaces Rarely Talked About

**Lawangwangi Creative Space** in upper Dago is not just a gallery — it's a garden, a restaurant, and a performance stage all at once. From here, Bandung spreads wide in view, and there are often local artist exhibitions worth enjoying without hurry.

**Selasar Sunaryo Art Space** is an old favourite of ours. Its architecture alone is already a work of art. The collection rotates, but the energy is always consistent — quiet, serious, and respectful of its visitors.

## Nature Within the City

Bandung has parks that are often missed because everyone is busy looking for photo spots. **Bandung Zoo** isn't just for children — the area of old trees on its western side is the best sitting spot in the city, especially in the morning.

And if you have more time, the trail around **Curug Dago** — a small waterfall at the city's edge — offers a quietude difficult to find elsewhere in central Bandung.

## Why We Share This

Bandung is our home. Every piece we make is born from this city's energy — from its creativity, its calm, and the way its people live at a rhythm slightly slower than Jakarta's.

When you wear Julia Owers, a little of Bandung comes with you.

---

*Visiting Bandung? Come by our store at Heritage Factory Outlet, Jl. L.L.RE Martadinata No.63-65. Our team is always glad to meet in person.*
        `
    },
    {
        id: 4,
        slug: "di-balik-desain-koleksi-resort",
        title: "Di Balik Desain: Koleksi Resort",
        titleEn: "Behind the Design: The Resort Collection",
        category: "Desain",
        categoryEn: "Design",
        date: "15 September 2025",
        dateEn: "September 15, 2025",
        image: "/images/products/4.jpg",
        excerpt: "Sekilas tentang inspirasi dan proses di balik koleksi musiman terbaru kami — dari sketsa pertama hingga busana jadi.",
        excerptEn: "An inside look at the inspiration and process behind our latest seasonal drop — from first sketch to finished garment.",
        readTime: "8 menit",
        seo: {
            title: "Di Balik Desain Koleksi Resort Julia Owers | Jurnal Julia Owers",
            description: "Proses kreatif di balik Koleksi Resort Julia Owers — dari inspirasi awal, pemilihan warna, hingga teknik jahit yang membuat setiap busana terasa hidup di tangan pemakainya.",
            keywords: ["koleksi resort Julia Owers", "desain busana linen", "proses desain fashion", "Julia Owers Bandung", "busana resort linen", "fashion lokal Indonesia", "koleksi terbaru Julia Owers"]
        },
        seoEn: {
            title: "Behind the Design: Julia Owers Resort Collection | Journal",
            description: "The creative process behind Julia Owers' Resort Collection — from initial inspiration and colour selection, to the tailoring techniques that make each piece feel alive on the wearer.",
            keywords: ["Julia Owers resort collection", "linen fashion design", "fashion design process", "Julia Owers Bandung", "resort linen clothing", "Indonesian local fashion"]
        },
        content: `
Koleksi Resort lahir dari satu pertanyaan sederhana: *Apa yang dikenakan seorang perempuan ketika ia benar-benar ingin bersantai?*

Bukan bersantai dalam artian rebahan. Tapi bersantai dalam artian hadir sepenuhnya — di pantai, di taman, di teras rumah sore hari dengan secangkir teh.

## Inspirasi: Antara Laut dan Teduh

Tim desain kami menghabiskan beberapa hari di Pangandaran sebelum mulai menggambar. Kami memperhatikan bagaimana warna berubah tergantung sudut cahaya — putih karang yang bersih di pagi hari, krem hangat saat sore, abu-abu kebiruan saat awan menutupi langit.

Dari sana lahir palet warna Koleksi Resort: **putih bersih, krem muda, biru kabut, dan hijau sage pucat**. Semua warna yang bisa berdiri sendiri, tapi juga indah jika dipadukan satu sama lain.

## Pemilihan Kain: Tidak Semua Linen Sama

Untuk koleksi ini, kami memilih linen dengan berat kain 145 gsm — lebih ringan dari koleksi sebelumnya yang 180 gsm. Perbedaan 35 gram itu terasa nyata di tangan. Lebih ringan, lebih mengalir, lebih cocok untuk udara panas di pantai atau di teras.

Kain yang sama juga memiliki serat yang sedikit lebih longgar, yang berarti ia bernapas lebih baik. Dalam cuaca Indonesia yang lembap, ini bukan sekadar kenyamanan — ini keharusan.

## Potongan: Sederhana adalah Pilihan

Salah satu keputusan terbesar dalam merancang Koleksi Resort adalah mengurangi detail yang tidak perlu.

Tidak ada kancing berlebih. Tidak ada jahitan dekoratif yang rumit. Yang ada adalah potongan-potongan yang mengikuti tubuh tanpa memaksanya — siluet A-line yang jatuh dengan berat yang tepat, lengan yang cukup lebar untuk angin masuk, kerah yang cukup terbuka untuk merasa bebas.

*Sesederhana itu. Dan justru itulah yang sulit.*

## Proses Jahit yang Tidak Terburu-buru

Setiap busana dalam Koleksi Resort melewati minimal empat tahap penjahitan dan dua tahap pemeriksaan kualitas sebelum dikirim ke Heritage. Penjahit kami — sebagian besar perempuan yang sudah bekerja bersama kami lebih dari lima tahun — tahu bahwa kecepatan bukan prioritas pertama.

Yang pertama adalah: apakah jahitan ini akan bertahan?

Sambungan yang kuat, tepian yang rapi, dan ritsleting yang mulus adalah hal-hal kecil yang tidak terlihat dari foto — tapi terasa setiap kali Anda memakainya.

## Apa yang Kami Pelajari

Setiap koleksi mengajarkan kami sesuatu. Dari Koleksi Resort, kami belajar bahwa pengurangan bisa lebih sulit dari penambahan. Lebih mudah untuk menambahkan detail. Yang sulit adalah menolak godaan itu dan membiarkan kain berbicara sendiri.

Linen yang baik tidak butuh banyak bantuan. Ia sudah indah dari dirinya sendiri.

---

*Koleksi Resort kini tersedia di Heritage Bandung, Heritage Bintaro, dan di Shopee Official Store @juliaowersofficial.*
        `,
        contentEn: `
The Resort Collection was born from one simple question: *What does a woman wear when she truly wants to rest?*

Not rest as in lying down. But rest as in being fully present — at the beach, in the garden, on the afternoon porch with a cup of tea.

## Inspiration: Between Sea and Shade

Our design team spent a few days in Pangandaran before starting to sketch. We noticed how colour changes depending on the angle of light — the clean white of coral in the morning, warm cream in the late afternoon, bluish grey when clouds cover the sky.

From there came the Resort Collection's colour palette: **clean white, pale cream, misty blue, and soft sage green**. All colours that can stand alone, but are also beautiful when combined with each other.

## Fabric Selection: Not All Linens Are Equal

For this collection, we chose linen with a fabric weight of 145 gsm — lighter than our previous collection's 180 gsm. That 35-gram difference is felt in the hand. Lighter, more fluid, better suited for heat at the beach or on the terrace.

The same fabric also has slightly looser fibres, meaning it breathes better. In Indonesia's humid weather, this isn't just comfort — it's a necessity.

## Cut: Simplicity Is a Choice

One of the biggest decisions in designing the Resort Collection was reducing unnecessary details.

No excessive buttons. No intricate decorative stitching. What remains are cuts that follow the body without forcing it — A-line silhouettes that fall with the right weight, sleeves wide enough for the breeze to enter, necklines open enough to feel free.

*As simple as that. And that is precisely what is difficult.*

## Unhurried Tailoring

Every piece in the Resort Collection goes through at least four stages of tailoring and two quality checks before being sent to Heritage. Our tailors — most of them women who have worked with us for over five years — know that speed is not the first priority.

What comes first is: will this seam hold?

Strong joins, clean edges, and smooth zippers are small things invisible in photos — but felt every time you wear it.

## What We Learned

Every collection teaches us something. From the Resort Collection, we learned that reduction can be harder than addition. It's easier to add details. What's difficult is resisting that temptation and letting the fabric speak for itself.

Good linen doesn't need much help. It's already beautiful on its own.

---

*The Resort Collection is now available at Heritage Bandung, Heritage Bintaro, and at our Shopee Official Store @juliaowersofficial.*
        `
    },
    {
        id: 5,
        slug: "mengapa-linen-cocok-untuk-iklim-tropis",
        title: "Mengapa Linen Cocok untuk Iklim Tropis",
        titleEn: "Why Linen Is Perfect for the Tropics",
        category: "Panduan",
        categoryEn: "Guide",
        date: "1 September 2025",
        dateEn: "September 1, 2025",
        image: "/images/products/1.jpg",
        excerpt: "Di negara yang hampir sepanjang tahun bersuhu 30 derajat ke atas, pilihan kain bukan sekadar selera — ini soal kenyamanan sehari-hari.",
        excerptEn: "In a country where temperatures stay above 30 degrees almost year-round, fabric choice isn't just about taste — it's about daily comfort.",
        readTime: "5 menit",
        seo: {
            title: "Mengapa Linen Cocok untuk Iklim Tropis Indonesia | Julia Owers Journal",
            description: "Penjelasan ilmiah dan praktis mengapa kain linen adalah pilihan terbaik untuk cuaca panas dan lembap Indonesia. Lebih sejuk dari katun, lebih bernapas dari poliester.",
            keywords: ["linen iklim tropis", "baju linen Indonesia", "kain paling sejuk", "linen vs katun", "busana cuaca panas", "Julia Owers", "kain alami Indonesia", "fashion tropis"]
        },
        seoEn: {
            title: "Why Linen Is Perfect for Tropical Weather | Julia Owers Journal",
            description: "Scientific and practical reasons why linen fabric is the best choice for Indonesia's hot and humid climate. Cooler than cotton, more breathable than polyester.",
            keywords: ["linen tropical climate", "linen clothing Indonesia", "coolest fabric", "linen vs cotton", "hot weather clothing", "Julia Owers", "natural fabric", "tropical fashion"]
        },
        content: `
Indonesia panas. Hampir sepanjang tahun, suhu berada di angka 28 hingga 35 derajat Celsius, dengan kelembapan udara yang tidak pernah benar-benar rendah.

Dalam kondisi seperti ini, pilihan kain bukan sekadar soal selera — ini soal apakah Anda akan merasa nyaman atau kepanasan sepanjang hari.

## Bagaimana Linen Bekerja di Cuaca Panas

Linen dibuat dari serat rami (*Linum usitatissimum*) yang secara alami memiliki struktur berlubang mikro. Lubang-lubang kecil ini memungkinkan udara mengalir menembus kain — jauh lebih baik dari katun, apalagi dari poliester.

Hasilnya: **kulit Anda bernapas, bukan terkurung**.

Keringat pun dikelola berbeda. Linen menyerap kelembapan dari kulit dan melepaskannya ke udara dengan cepat — proses yang disebut wicking. Anda tetap kering, atau setidaknya tidak terasa basah sekujur tubuh.

## Perbandingan dengan Kain Lain

| Kain | Daya Serap | Kecepatan Mengering | Ketahanan |
|---|---|---|---|
| Linen | Sangat tinggi | Sangat cepat | Sangat tinggi |
| Katun | Tinggi | Sedang | Sedang |
| Poliester | Rendah | Cepat | Tinggi |
| Rayon | Tinggi | Lambat | Rendah |

Linen menyerap kelembapan **20–30% lebih baik dari katun**, dan mengering jauh lebih cepat. Dalam cuaca tropis, ini selisih yang terasa nyata di badan.

## Antibakteri Alami

Satu keunggulan linen yang jarang dibahas: ia secara alami antibakteri. Ini artinya bakteri penyebab bau sulit berkembang biak di permukaan kain linen — berbeda dengan poliester yang menjadi tempat tumbuh ideal bagi bakteri.

Untuk negara tropis yang panas dan lembap, ini bukan detail kecil.

## Linen dan Panas Matahari

Ada mitos bahwa kain berwarna putih atau terang lebih sejuk dari kain gelap. Itu benar untuk pantulan panas — tapi kain yang lebih penting adalah jenis seratnya, bukan warnanya.

Linen berwarna gelap pun tetap jauh lebih sejuk dari poliester berwarna putih, karena perbedaannya ada di struktur serat, bukan di warna.

## Kenapa Kami Hanya Pakai Linen

Sejak Julia Owers berdiri, kami tidak pernah mencampurkan linen dengan polyester — bahkan ketika secara bisnis itu mungkin lebih murah.

Alasannya sederhana: linen yang murni bernapas jauh lebih baik. Campuran polyester, seberapa sedikit pun, mengurangi kemampuan kain untuk mengalirkan udara. Dan di Indonesia, itu bukan kompromi yang bisa kami buat atas nama pelanggan kami.

---

*Temukan koleksi linen murni kami yang dirancang khusus untuk cuaca Indonesia. [Jelajahi Koleksi](/shop)*
        `,
        contentEn: `
Indonesia is hot. For most of the year, temperatures sit between 28 and 35 degrees Celsius, with humidity that never truly drops.

In conditions like this, fabric choice isn't just about taste — it's about whether you'll feel comfortable or overheated throughout the day.

## How Linen Works in Hot Weather

Linen is made from flax fibres (*Linum usitatissimum*) that naturally have a micro-hollow structure. These tiny hollow spaces allow air to flow through the fabric — far better than cotton, and especially better than polyester.

The result: **your skin breathes, rather than suffocates**.

Sweat is also managed differently. Linen absorbs moisture from the skin and releases it into the air quickly — a process called wicking. You stay dry, or at least don't feel soaked all over.

## Comparison with Other Fabrics

| Fabric | Absorbency | Drying Speed | Durability |
|---|---|---|---|
| Linen | Very high | Very fast | Very high |
| Cotton | High | Medium | Medium |
| Polyester | Low | Fast | High |
| Rayon | High | Slow | Low |

Linen absorbs moisture **20–30% better than cotton**, and dries much faster. In tropical weather, this is a difference you actually feel.

## Naturally Antibacterial

One linen advantage rarely discussed: it's naturally antibacterial. This means odour-causing bacteria struggle to multiply on linen's surface — unlike polyester, which provides an ideal growth environment for bacteria.

For a hot and humid tropical country, this is not a small detail.

## Linen and Sun Heat

There's a myth that white or light-coloured fabric is cooler than dark fabric. That's true for heat reflection — but what matters more is the type of fibre, not the colour.

Even dark-coloured linen remains far cooler than white polyester, because the difference lies in fibre structure, not colour.

## Why We Only Use Linen

Since Julia Owers was founded, we have never blended linen with polyester — even when doing so might have been cheaper from a business standpoint.

The reason is simple: pure linen breathes far better. Any polyester blend, however small, reduces the fabric's ability to circulate air. And in Indonesia, that's not a compromise we can make on behalf of our customers.

---

*Discover our pure linen collection designed specifically for Indonesia's climate. [Explore the Collection](/shop)*
        `
    }
]

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(a => a.slug === slug)
}

export function getArticleById(id: number): Article | undefined {
    return articles.find(a => a.id === id)
}
