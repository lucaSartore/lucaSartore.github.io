import "../../components/pda/themes.css"
import IndexPage from "../../components/index";
import { useLocation, useNavigate } from "react-router";
import PdaPage from "../../components/pda";
import { Contacts } from "../contacts";
import { HomePage } from "../home";
import { PortfolioPage } from "../portfolio";
import { WorkExperiences } from "../work_experiences";


export default function BluePillPage() {

    const navigate = useNavigate()

    return <>

        <PdaPage
            navigationBarParams={{
                // go back only if we are not already at the root page
                backButtonCallback: useLocation().pathname == "/blue_pill" ? () => { } : () => navigate(-1),
                exitButtonCallback: () => navigate("/")
            }}
        >
            <IndexPage
                title="Index"

                subPages={[
                    {
                        title: "Home",
                        description: "Discover a general overview of who I am, what I do, and what drives me.",
                        linkPage: <HomePage/>,
                        linkPageUrl: "home",
                        emoji: "🏠"
                    },
                    {
                        title: "Contacts",
                        description: "Find my contact information, including links to my LinkedIn and GitHub profiles.",
                        linkPage: <Contacts/>,
                        linkPageUrl: "contacts",
                        emoji: "📞"
                    },
                    {
                        title: "Portfolio",
                        description: "Explore my portfolio showcasing some of my most interesting projects.",
                        linkPage: <PortfolioPage/>,
                        linkPageUrl: "portfolio",
                        emoji: "📁"
                    },
                    {
                        title: "Work Experiences",
                        description: "Take a look at a detailed list of my past work experiences.",
                        linkPage: <WorkExperiences/>,
                        linkPageUrl: "work-experiences",
                        emoji: "💼"
                    }
                ]}
            />
        </PdaPage>
    </>
}
