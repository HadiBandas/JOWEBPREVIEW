import { Container } from "@/components/ui/container"
import Image from "next/image"
import { Droplets, Wind, Sun, Sparkles } from "lucide-react"

const careSteps = [
    {
        icon: Droplets,
        title: "Mencuci",
        tips: [
            "Cuci dengan mesin pada suhu 30°C, pilih mode lembut",
            "Gunakan detergen ringan dan ramah lingkungan",
            "Cuci bersama pakaian dengan warna serupa",
            "Hindari pemutih dan pelembut kain",
            "Balik busana ke dalam sebelum dicuci untuk menjaga permukaannya"
        ]
    },
    {
        icon: Wind,
        title: "Mengeringkan",
        tips: [
            "Jemur dalam posisi rata atau digantung (paling baik untuk keawetan)",
            "Hindari pengering mesin — panas tinggi bisa menyusutkan linen",
            "Jemur di tempat teduh agar warna tidak pudar",
            "Bentuk ulang busana saat masih lembap untuk hasil terbaik",
            "Jika terpaksa pakai pengering, gunakan suhu paling rendah"
        ]
    },
    {
        icon: Sun,
        title: "Menyetrika",
        tips: [
            "Setrika saat masih sedikit lembap dengan suhu sedang-tinggi",
            "Gunakan uap untuk kerutan yang membandel",
            "Setrika dari bagian dalam untuk melindungi permukaan kain",
            "Kerutan alami linen adalah bagian dari keindahannya — jangan berlebihan!",
            "Setrika uap genggam juga bekerja dengan sangat baik"
        ]
    },
    {
        icon: Sparkles,
        title: "Menyimpan",
        tips: [
            "Simpan di tempat yang sejuk dan kering",
            "Gantung gaun dan blus agar tidak kusut",
            "Lipat celana dan rok dengan rapi",
            "Hindari kantong plastik — gunakan sarung busana yang bisa bernapas",
            "Kapur barus dari kayu cedar membantu mengusir ngengat secara alami"
        ]
    }
]

export default function CarePage() {
    return (
        <main className="pt-8 pb-24">
            <section className="bg-linen py-16 md:py-24 mb-12">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                            Cara Merawat Linen
                        </h1>
                        <p className="text-charcoal/60 text-lg">
                            Busana Julia Owers dirancang untuk bertahan lama — dengan sedikit perhatian yang tepat, ia bisa menemani Anda bertahun-tahun.
                        </p>
                    </div>
                </Container>
            </section>

            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Intro */}
                    <div className="text-center mb-16">
                        <p className="text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                            Linen adalah salah satu kain alami yang paling awet — dan ia justru{" "}
                            <strong className="text-charcoal">makin indah seiring waktu</strong>. Setiap kali dicuci, ia semakin lembut dan semakin nyaman. Dengan perawatan yang benar, busana Anda bisa bertahan lebih dari lima tahun pemakaian rutin.
                        </p>
                    </div>

                    {/* Care Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {careSteps.map((step) => (
                            <div
                                key={step.title}
                                className="bg-linen/30 p-8 rounded-sm"
                            >
                                <step.icon className="w-8 h-8 text-earth mb-4" />
                                <h2 className="font-serif text-xl text-charcoal mb-4">{step.title}</h2>
                                <ul className="space-y-2">
                                    {step.tips.map((tip, i) => (
                                        <li key={i} className="text-sm text-charcoal/70 flex items-start gap-2">
                                            <span className="text-earth mt-1">•</span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Pro Tips */}
                    <div className="bg-charcoal text-white p-8 md:p-12 rounded-sm mb-16">
                        <h2 className="font-serif text-2xl mb-6">Catatan dari Tim Kami</h2>
                        <div className="space-y-4 text-white/80">
                            <p>
                                <strong className="text-linen">Soal kerutan — biarkan saja.</strong> Kerutan alami linen adalah tanda keaslian dan kualitasnya. Pandanglah sebagai karakter, bukan kekurangan. Itulah yang membuat linen terasa hidup.
                            </p>
                            <p>
                                <strong className="text-linen">Cucian pertama.</strong> Linen mungkin menyusut sedikit (2–3%) pada cucian pertama. Ini wajar dan sudah kami perhitungkan dalam pola ukuran kami. Setelah itu, busana Anda akan mempertahankan bentuknya.
                            </p>
                            <p>
                                <strong className="text-linen">Noda membandel.</strong> Tangani segera dengan air dingin dan sabun ringan. Hindari air panas karena bisa mengunci noda. Untuk noda keras, pasta soda kue dan air bekerja dengan baik.
                            </p>
                        </div>
                    </div>

                    {/* Quick Reference */}
                    <div>
                        <h2 className="font-serif text-2xl text-charcoal mb-6 text-center">Ringkasan Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-6 bg-green-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✓</span>
                                <p className="text-sm text-charcoal/70">Cuci dingin</p>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✓</span>
                                <p className="text-sm text-charcoal/70">Jemur angin</p>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✓</span>
                                <p className="text-sm text-charcoal/70">Setrika sedang</p>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✓</span>
                                <p className="text-sm text-charcoal/70">Boleh diuap</p>
                            </div>
                            <div className="text-center p-6 bg-red-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✗</span>
                                <p className="text-sm text-charcoal/70">Jangan dikelantang</p>
                            </div>
                            <div className="text-center p-6 bg-red-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✗</span>
                                <p className="text-sm text-charcoal/70">Jangan pengering panas</p>
                            </div>
                            <div className="text-center p-6 bg-red-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✗</span>
                                <p className="text-sm text-charcoal/70">Jangan pelembut</p>
                            </div>
                            <div className="text-center p-6 bg-red-50 rounded-sm">
                                <span className="text-2xl mb-2 block">✗</span>
                                <p className="text-sm text-charcoal/70">Jangan dry clean</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}
