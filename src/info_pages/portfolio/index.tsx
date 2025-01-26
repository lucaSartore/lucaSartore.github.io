import "../../components/pda/themes.css"
import IndexPage from "../../components/index";
import { Useless } from "./useless";
import { Useful } from "./useful";
import { Contributions } from "./contributions";


export function PortfolioPage() {
    return <>
        <IndexPage
            title="Projects"

            subPages={[
                {
                    title: "Projects I've Contributed To:",
                    description: "This is a list of open community open source projects that I have contributed to over the yers.",
                    linkPage: <Contributions/>,
                    linkPageUrl: "contributions",
                    emoji: "🚀"
                },
                {
                    title: "Useful Repositories I've Created:",
                    description: "This is a list of personal projects that have been embraced by the community and have proven useful to others besides myself. Projects in this category are those that have earned at least a few GitHub stars.",
                    linkPage: <Useful/>,
                    linkPageUrl: "useful",
                    emoji: "🛠️"
                },
                {
                    title: "Cool (but Sort of Useless) Stuff I Made",
                    description: "This is a list of projects that I found cool and valuable as a learning experience, though they’re admittedly useless to most people. Nevertheless, they contribute to what I hope will become an impressive portfolio.",
                    linkPage: <Useless/>,
                    linkPageUrl: "useless",
                    emoji: "🎨"
                }
            ]}
        />
    </>
}
