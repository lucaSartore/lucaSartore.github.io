import "../../components/pda/themes.css"
import IndexPage from "../../components/index";

export default function BluePillPage() {
    return <>
        <IndexPage
            title="Index"

            subPages={[
                {
                    title: "Home",
                    description: "Discover a general overview of who I am, what I do, and what drives me.",
                    linkPage: <h1>Welcome to the Home Page</h1>,
                    linkPageUrl: "home",
                    emoji: "🏠"
                },
                {
                    title: "Contacts",
                    description: "Find my contact information, including links to my LinkedIn and GitHub profiles.",
                    linkPage: <h1>Welcome to the contacts Page</h1>,
                    linkPageUrl: "contacts",
                    emoji: "📞"
                },
                {
                    title: "Portfolio",
                    description: "Explore my portfolio showcasing some of my most interesting projects.",
                    linkPage: <h1>Welcome to the portfolio Page</h1>,
                    linkPageUrl: "portfolio",
                    emoji: "📁"
                },
                {
                    title: "Work Experiences",
                    description: "Take a look at a detailed list of my past work experiences.",
                    linkPage: <h1>Welcome to the work Page</h1>,
                    linkPageUrl: "work-experiences",
                    emoji: "💼"
                }
            ]}
        />
    </>
}
