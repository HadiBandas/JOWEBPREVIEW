import { Container } from "@/components/ui/container"

export default function PrivacyPage() {
    return (
        <main className="pt-8 pb-24">
            <section className="bg-linen py-16 md:py-20 mb-12">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                            Kebijakan Privasi
                        </h1>
                        <p className="text-charcoal/60">
                            Terakhir diperbarui: Januari 2026
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="max-w-3xl mx-auto prose prose-charcoal">
                    <div className="space-y-8">
                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Pendahuluan</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                Julia Owers berkomitmen untuk menjaga privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda mengunjungi situs kami atau melakukan pembelian.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Informasi yang Kami Kumpulkan</h2>
                            <p className="text-charcoal/70 leading-relaxed mb-4">
                                Kami mengumpulkan informasi yang Anda berikan secara langsung, antara lain:
                            </p>
                            <ul className="list-disc pl-6 text-charcoal/70 space-y-2">
                                <li>Nama dan informasi kontak (email, nomor telepon, alamat)</li>
                                <li>Informasi pembayaran (diproses dengan aman oleh mitra pembayaran kami)</li>
                                <li>Riwayat pesanan dan preferensi produk</li>
                                <li>Komunikasi dengan tim layanan pelanggan kami</li>
                                <li>Preferensi langganan buletin</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Bagaimana Kami Menggunakan Informasi Anda</h2>
                            <ul className="list-disc pl-6 text-charcoal/70 space-y-2">
                                <li>Memproses dan menyelesaikan pesanan Anda</li>
                                <li>Mengirimkan konfirmasi pesanan dan informasi pengiriman</li>
                                <li>Menjawab pertanyaan dan memberikan layanan pelanggan</li>
                                <li>Mengirimkan komunikasi pemasaran (dengan persetujuan Anda)</li>
                                <li>Meningkatkan kualitas situs dan produk kami</li>
                                <li>Mencegah penipuan dan menjaga keamanan</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Berbagi Informasi</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                Kami tidak menjual informasi pribadi Anda. Kami hanya berbagi informasi dengan pihak ketiga dalam keadaan berikut:
                            </p>
                            <ul className="list-disc pl-6 text-charcoal/70 space-y-2 mt-4">
                                <li>Mitra pengiriman untuk mengantarkan pesanan Anda</li>
                                <li>Pemroses pembayaran untuk menyelesaikan transaksi</li>
                                <li>Penyedia layanan yang membantu operasional kami</li>
                                <li>Ketika diwajibkan oleh hukum atau untuk melindungi hak kami</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Keamanan Data</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                Kami menerapkan langkah-langkah keamanan yang memadai untuk melindungi informasi pribadi Anda dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Namun, tidak ada metode transmisi melalui internet yang sepenuhnya aman.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Hak Anda</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                Anda berhak untuk:
                            </p>
                            <ul className="list-disc pl-6 text-charcoal/70 space-y-2 mt-4">
                                <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                                <li>Meminta koreksi atas informasi yang tidak akurat</li>
                                <li>Meminta penghapusan data Anda</li>
                                <li>Berhenti menerima komunikasi pemasaran</li>
                                <li>Mencabut persetujuan kapan saja</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Hubungi Kami</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
                            </p>
                            <div className="mt-4 p-4 bg-linen/50 rounded-sm">
                                <p className="text-charcoal">
                                    Email: privacy@juliaowers.com<br />
                                    WhatsApp: +62 812-3456-7890
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </Container>
        </main>
    )
}
