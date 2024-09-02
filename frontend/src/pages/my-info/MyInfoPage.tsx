import AddressInfo from "@/components/my-info/address-info"
import { BasicInformation } from "@/components/my-info/basic-information"
import ContactDetails from "@/components/my-info/contact-details"
import { EducationDetails } from "@/components/my-info/educations-detail"
import { LanguagesDetails } from "@/components/my-info/languages-details"
import SocialDetails from "@/components/my-info/social-details"

export const MyInfo = () => {
    return (
        <div className="">
            <BasicInformation />
            <AddressInfo />
            <ContactDetails />
            <SocialDetails />
            <EducationDetails />
            <LanguagesDetails />
        </div>
    )
}
