import { EducationCard } from "../../../components/card/education-card"

const educations = [
    {
        college: " Government Engineering College",
        degree: "Bachelor of Technology",
        graduationYear: 2021,
        major: "Computer Science",
        gpa: 3.8,
        startDate: "2015-02-01",
        endDate: "2021-08-31",
    }, {
        college: "XYZ University",
        degree: "Master of Science",
        graduationYear: 2023,
        major: "Computer Science",
        gpa: 4.0,
        startDate: "2019-09-01",
        endDate: "2023-06-30",
    }
]

export const EducationDetails = () => {
    return (
        <section className="mt-8">
            <div className="flex gap-x-2">
                <img src="/icons/book.svg" alt="Profile" />
                <p className="text-[#333333] font-semibold">Education</p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 mt-4">
                {
                    educations.map((education, index) => (
                        <EducationCard key={index} {...education} />
                    ))
                }
            </div>
        </section>
    )
}
