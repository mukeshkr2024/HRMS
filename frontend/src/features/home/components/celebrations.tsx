import { Card } from "@/components/ui/card"

const celebrations = [
    {
        name: "Daisy",
        profile_url: "https://media.istockphoto.com/id/1365997131/photo/portrait-of-mid-20s-african-american-man-outdoors-at-dusk.webp?b=1&s=170667a&w=0&k=20&c=_XMq-GZm_VV-N_kS8KCHp1nNjhdKkaLz0JgRdl3OlAk=",
        type: "birthday",
        date: "August 23",
        anniversary: 0,
    },
    {
        name: "Daisy",
        profile_url: "https://media.istockphoto.com/id/1365997131/photo/portrait-of-mid-20s-african-american-man-outdoors-at-dusk.webp?b=1&s=170667a&w=0&k=20&c=_XMq-GZm_VV-N_kS8KCHp1nNjhdKkaLz0JgRdl3OlAk=",
        type: "anniversary",
        date: "August 23",
        anniversary: 1,
    },
    {
        name: "Daisy",
        profile_url: "https://media.istockphoto.com/id/1365997131/photo/portrait-of-mid-20s-african-american-man-outdoors-at-dusk.webp?b=1&s=170667a&w=0&k=20&c=_XMq-GZm_VV-N_kS8KCHp1nNjhdKkaLz0JgRdl3OlAk=",
        type: "anniversary",
        date: "August 23",
        anniversary: 2,
    }
]

export const Celebrations = () => {
    return (
        <section className="mt-3.5 flex flex-col gap-y-3">
            <h2 className="text-black font-semibold text-xl">Celebrations</h2>
            <Card>
                <div>
                    {celebrations.map((celebrate, index) => (
                        <div key={index} className="w-full flex justify-between border-b px-6 py-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={celebrate.profile_url}
                                    alt={`${celebrate.name}'s profile`}
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-base">{celebrate.name}</p>
                                    <div className="flex text-sm text-muted-foreground">
                                        <span>{celebrate.date} . </span>
                                        {celebrate.type === "birthday" && (
                                            <p>Birthday</p>
                                        )}
                                        {celebrate.type === "anniversary" && (
                                            <p>
                                                <span>{celebrate.anniversary === 1 ? '1st' : `${celebrate.anniversary}th`} </span>
                                                work anniversary
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/icons/celebrate.svg" alt="Celebrate icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    )
}
